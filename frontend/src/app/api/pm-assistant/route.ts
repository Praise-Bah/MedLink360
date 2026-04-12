import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import fs from "fs/promises"
import path from "path"

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

const systemPrompt = `You are the MedLink360 in-app assistant, talking to the PRODUCT OWNER of the MedLink360 platform.

- Be friendly and conversational, but concise.
- Explain clearly which parts of the app are implemented vs still in progress when asked.
- If the product owner reports an issue or needed adjustment, acknowledge it and reassure them it will be passed to the developer.
- Do not make promises about exact delivery dates.
- If you are unsure about something, say so honestly rather than guessing.
- You can give high-level explanations of features based on common healthcare admin workflows.

You will receive a separate system message containing the MedLink360 PROJECT_STATUS.md documentation. Treat that document as the canonical source of truth about which routes, dashboards, and features exist, and whether they are UI-only or fully wired. Never claim that something is "not implemented" or "does not exist" if the project status document says it is present (even if it is UI-only with mock data). If the documentation is unclear, say you are not certain rather than guessing.

Specific guidance for pharmacist / pharmacy:
- The pharmacist dashboard UI is implemented behind the shared "/dashboard" route when the current role is "pharmacist". It is UI-only with mock data, not wired to a backend yet.
- When the product owner asks about the "pharmacy page", "pharmacist dashboard", or similar pharmacy-related views, you should explain that this corresponds to the pharmacist dashboard under "/dashboard" for the pharmacist role, instead of saying it is not implemented.
- When it is helpful, suggest a navigation button to "/dashboard" with role "pharmacist" so they can open the pharmacist dashboard directly.

When it would help the product owner, you may suggest a direct navigation button that the UI can render. To do this, append a single navigation block at the END of your reply using this exact format:

[NAV_SUGGESTION]
{"label":"Open Pharmacist Dashboard","route":"/dashboard","role":"pharmacist"}
[/NAV_SUGGESTION]

Rules for navigation suggestions:
- Keep your normal explanation text above this block.
- Only include one NAV_SUGGESTION block per reply.
- Use a route that actually exists in the app (for example: "/dashboard", "/admin/staff", "/admin/patients", "/appointments", "/patients").
- Use the appropriate role string when a specific role is required for the page (for example: "hospital-admin" for admin pages, "pharmacist" for the pharmacist dashboard). If no specific role change is needed, you may omit the role field or set it to null.
- If you are not confident about the route or no direct navigation is needed, omit the NAV_SUGGESTION block entirely.
`

async function loadProjectStatus(): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), "PROJECT_STATUS.md")
    const content = await fs.readFile(filePath, "utf8")
    return content
  } catch {
    return null
  }
}

async function callOpenRouter(messages: { role: "system" | "user" | "assistant"; content: string }[]) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return {
      reply: "The assistant is not configured yet (missing API key). Please contact the developer.",
    }
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages,
      }),
    })

    if (!response.ok) {
      return {
        reply:
          "I had trouble reaching the AI service just now. Please try again in a moment or contact the developer.",
      }
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content ?? ""
    return { reply }
  } catch (error) {
    return {
      reply: "The AI service is currently unavailable. Please try again later.",
    }
  }
}

async function sendFeedbackEmail(params: {
  pageUrl?: string
  userMessage: string
  assistantReply?: string
}) {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.PM_FEEDBACK_EMAIL

  if (!host || !user || !pass || !to) {
    // Silent fail: do not break the user experience if email is not configured
    return
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  })

  const subject = "MedLink360 PM Feedback from in-app assistant"
  const lines: string[] = []
  lines.push(`Time: ${new Date().toISOString()}`)
  if (params.pageUrl) {
    lines.push(`Page: ${params.pageUrl}`)
  }
  lines.push("")
  lines.push("Product owner message:")
  lines.push(params.userMessage)
  if (params.assistantReply) {
    lines.push("")
    lines.push("Assistant reply:")
    lines.push(params.assistantReply)
  }

  const text = lines.join("\n")

  try {
    await transporter.sendMail({
      from: user,
      to,
      subject,
      text,
    })
  } catch (error) {
    // Swallow email errors – we don't want the UI to break because of SMTP issues
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const messages =
      (body?.messages as { role: "user" | "assistant"; content: string }[] | undefined) ?? []
    const pageUrl = body?.pageUrl as string | undefined
    const type = (body?.type as "question" | "feedback" | undefined) ?? "question"

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No conversation provided" },
        {
          status: 400,
        }
      )
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user")?.content

    const projectStatus = await loadProjectStatus()

    const openRouterMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt },
    ]

    if (projectStatus) {
      openRouterMessages.push({
        role: "system",
        content:
          "Here is the latest high-level project status documentation for MedLink360. Use it to answer questions about what is implemented and what is pending, and be honest when features are UI-only or not yet wired to a backend.\n\n" +
          projectStatus,
      })
    }

    for (const message of messages) {
      if (message.role === "user" || message.role === "assistant") {
        openRouterMessages.push({ role: message.role, content: message.content })
      }
    }

    const { reply } = await callOpenRouter(openRouterMessages)

    if (type === "feedback" && lastUserMessage) {
      await sendFeedbackEmail({
        pageUrl,
        userMessage: lastUserMessage,
        assistantReply: reply,
      })
    }

    return NextResponse.json({ reply })
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while handling the request." },
      {
        status: 500,
      }
    )
  }
}
