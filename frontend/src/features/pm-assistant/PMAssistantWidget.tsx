"use client"

import { useEffect, useState, useRef } from "react"
import { ChatPanel } from "./ChatPanel"
import { sendAssistantMessage } from "./assistant-api-client"
import { ChatMessage, ChatType } from "./types"
import { LOCAL_STORAGE_POSITION_KEY, MAX_MESSAGES } from "./config"

interface Position {
  x: number
  y: number
}

function extractNavigationSuggestion(
  text: string
): { cleanText: string; navSuggestion?: ChatMessage["navSuggestion"] } {
  const startToken = "[NAV_SUGGESTION]"
  const endToken = "[/NAV_SUGGESTION]"

  const start = text.indexOf(startToken)
  const end = text.indexOf(endToken)

  if (start === -1 || end === -1 || end <= start) {
    return { cleanText: text }
  }

  const jsonPart = text.slice(start + startToken.length, end).trim()
  let navSuggestion: ChatMessage["navSuggestion"]

  try {
    const parsed = JSON.parse(jsonPart) as {
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
  } catch {
  }

  const cleanTextRaw = (text.slice(0, start) + text.slice(end + endToken.length)).trim()
  const cleanText = cleanTextRaw || text

  return { cleanText, navSuggestion }
}

export function PMAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatType, setChatType] = useState<ChatType>("question")
  const [position, setPosition] = useState<Position | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragOffsetRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_POSITION_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Position
        // Clamp stored position to current viewport so the bubble is always visible,
        // even if the screen size changed (e.g. switching to a smaller device).
        const clamped: Position = {
          x: Math.min(Math.max(8, parsed.x), window.innerWidth - 72),
          y: Math.min(Math.max(8, parsed.y), window.innerHeight - 72),
        }
        setPosition(clamped)
        try {
          window.localStorage.setItem(LOCAL_STORAGE_POSITION_KEY, JSON.stringify(clamped))
        } catch {
        }
        return
      }
    } catch {
    }

    const defaultPosition: Position = {
      x: window.innerWidth - 80,
      y: window.innerHeight - 96,
    }
    setPosition(defaultPosition)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!isDragging) return

    const handleMouseMove = (event: MouseEvent) => {
      if (!dragOffsetRef.current) return
      const { x: offsetX, y: offsetY } = dragOffsetRef.current
      const newX = event.clientX - offsetX
      const newY = event.clientY - offsetY
      const clampedX = Math.min(Math.max(8, newX), window.innerWidth - 72)
      const clampedY = Math.min(Math.max(8, newY), window.innerHeight - 72)
      const next: Position = { x: clampedX, y: clampedY }
      setPosition(next)
      try {
        window.localStorage.setItem(LOCAL_STORAGE_POSITION_KEY, JSON.stringify(next))
      } catch {
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      dragOffsetRef.current = null
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  if (typeof window === "undefined") {
    return null
  }

  if (!position) {
    return null
  }

  const handleBubbleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof window === "undefined") return
    setIsDragging(true)
    const rect = (event.currentTarget.parentElement as HTMLDivElement | null)?.getBoundingClientRect()
    if (!rect) return
    dragOffsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: content.trim(),
      createdAt: Date.now(),
    }

    const baseMessages = [...messages, userMessage].slice(-MAX_MESSAGES)
    setMessages(baseMessages)
    setIsLoading(true)

    try {
      const simpleMessages = baseMessages.map((msg) => ({ role: msg.role, content: msg.content }))
      const pageUrl = typeof window !== "undefined" ? window.location.href : undefined

      const response = await sendAssistantMessage({
        messages: simpleMessages,
        pageUrl,
        type: chatType,
      })

      const replyText = response.reply ?? response.error ?? "Sorry, I could not respond right now."

      const { cleanText, navSuggestion } = extractNavigationSuggestion(replyText)

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: cleanText,
        navSuggestion,
        createdAt: Date.now(),
      }

      setMessages((prev) => [...prev, assistantMessage].slice(-MAX_MESSAGES))
    } catch {
      const assistantMessage: ChatMessage = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        content: "There was a problem contacting the assistant. Please try again shortly.",
        createdAt: Date.now(),
      }
      setMessages((prev) => [...prev, assistantMessage].slice(-MAX_MESSAGES))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ChatPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isLoading={isLoading}
        chatType={chatType}
        onChatTypeChange={setChatType}
        onSendMessage={handleSendMessage}
      />

      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          zIndex: 50,
        }}
      >
        <button
          type="button"
          onMouseDown={handleBubbleMouseDown}
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full bg-[#007bff] text-white shadow-[0_10px_30px_rgba(37,99,235,0.6)] flex items-center justify-center hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007bff]"
          aria-label="Open MedLink assistant"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M5 5H19C20.1046 5 21 5.89543 21 7V13C21 14.1046 20.1046 15 19 15H9L5 19V7C5 5.89543 5.89543 5 7 5Z"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="10" r="0.75" fill="currentColor" />
            <circle cx="12" cy="10" r="0.75" fill="currentColor" />
            <circle cx="15" cy="10" r="0.75" fill="currentColor" />
          </svg>
        </button>
      </div>
    </>
  )
}
