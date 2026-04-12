import { AssistantResponseBody, ChatType } from "./types"

interface SendAssistantMessageParams {
  messages: { role: "user" | "assistant"; content: string }[]
  pageUrl?: string
  type: ChatType
}

export async function sendAssistantMessage(
  params: SendAssistantMessageParams
): Promise<AssistantResponseBody> {
  try {
    const response = await fetch("/api/pm-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      return { error: "Assistant service is unavailable right now." }
    }

    const data = (await response.json()) as AssistantResponseBody
    return data
  } catch (error) {
    return { error: "Unable to reach the assistant. Please try again." }
  }
}
