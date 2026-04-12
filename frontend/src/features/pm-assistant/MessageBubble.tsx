"use client"

import { useRouter } from "next/navigation"
import { ChatMessage } from "./types"
import { ASSISTANT_NAME } from "./config"

interface MessageBubbleProps {
  message: ChatMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user"
  const router = useRouter()

  let content = message.content
  let navSuggestion = message.navSuggestion

  if (!isUser && !navSuggestion && typeof content === "string") {
    const startToken = "[NAV_SUGGESTION]"
    const endToken = "[/NAV_SUGGESTION]"

    const start = content.indexOf(startToken)
    const end = content.indexOf(endToken)

    if (start !== -1 && end !== -1 && end > start) {
      const jsonPart = content.slice(start + startToken.length, end).trim()

      try {
        const braceStart = jsonPart.indexOf("{")
        const braceEnd = jsonPart.lastIndexOf("}")

        if (braceStart !== -1 && braceEnd !== -1 && braceEnd > braceStart) {
          const jsonCandidate = jsonPart.slice(braceStart, braceEnd + 1)
          const parsed = JSON.parse(jsonCandidate) as {
            label?: string
            route?: string
            role?: string
          }

          if (parsed && typeof parsed.label === "string" && typeof parsed.route === "string") {
            navSuggestion = {
              label: parsed.label,
              route: parsed.route,
              role: typeof parsed.role === "string" ? parsed.role : undefined,
            }
          }
        }
      } catch {
      }

      const cleanTextRaw = (content.slice(0, start) + content.slice(end + endToken.length)).trim()
      if (cleanTextRaw) {
        content = cleanTextRaw
      }
    }
  }

  const handleNavigate = () => {
    if (!navSuggestion) return

    const { route, role } = navSuggestion

    try {
      if (role && typeof window !== "undefined") {
        window.localStorage.setItem("selectedRole", role)
      }
    } catch {
    }

    router.push(route)
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed shadow-sm ${
          isUser
            ? "bg-[#007bff] text-white rounded-br-none"
            : "bg-white text-[#111827] border border-[#e5e7eb] rounded-bl-none"
        }`}
      >
        {!isUser && (
          <div className="mb-1 text-[11px] font-semibold text-[#6b7280]">
            {ASSISTANT_NAME}
          </div>
        )}
        <div className="whitespace-pre-wrap break-words">{content}</div>
        {!isUser && navSuggestion && (
          <button
            type="button"
            onClick={handleNavigate}
            className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#007bff] px-3 py-1 text-[11px] font-medium text-white hover:bg-[#0056b3]"
          >
            {navSuggestion.label}
          </button>
        )}
      </div>
    </div>
  )
}
