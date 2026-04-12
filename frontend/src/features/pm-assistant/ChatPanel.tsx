"use client"

import { useEffect, useRef, useState } from "react"
import { ChatMessage, ChatType } from "./types"
import { MessageBubble } from "./MessageBubble"
import { ASSISTANT_NAME } from "./config"

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
  messages: ChatMessage[]
  isLoading: boolean
  chatType: ChatType
  onChatTypeChange: (type: ChatType) => void
  onSendMessage: (content: string) => void
}

export function ChatPanel({
  isOpen,
  onClose,
  messages,
  isLoading,
  chatType,
  onChatTypeChange,
  onSendMessage,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 50)
    return () => clearTimeout(timeout)
  }, [isOpen, messages])

  if (!isOpen) return null

  const handleSubmit = () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isLoading) return
    onSendMessage(trimmed)
    setInputValue("")
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  const isFeedback = chatType === "feedback"

  return (
    <div className="fixed bottom-20 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-[380px] -translate-x-1/2 sm:bottom-24 sm:right-4 sm:left-auto sm:translate-x-0 bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_10px_40px_rgba(15,23,42,0.18)] flex flex-col max-h-[75vh] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e7eb] bg-[#f9fafb]">
        <div>
          <div className="text-[13px] font-semibold text-[#111827]">{ASSISTANT_NAME}</div>
          <div className="text-[11px] text-[#6b7280]">
            Ask questions or share feedback about this page.
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-full hover:bg-[#e5e7eb] text-[#4b5563]"
          aria-label="Close assistant"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path
              d="M5 5L15 15M15 5L5 15"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 px-3 pt-3 pb-2 overflow-y-auto space-y-2 bg-[#f9fafb]">
        {messages.length === 0 && (
          <div className="text-[12px] text-[#6b7280] bg-white border border-dashed border-[#e5e7eb] rounded-xl px-3 py-2">
            Hi, I’m your MedLink assistant. You can ask about what this page does, what’s already
            implemented, or leave feedback for the developer.
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-3 pt-2 pb-3 border-t border-[#e5e7eb] bg-white space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isFeedback ? "Describe what you’d like changed..." : "Ask a question about this page..."}
            className="flex-1 h-9 rounded-full border border-[#e5e7eb] px-3 text-[13px] text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#007bff]"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-9 px-3 rounded-full bg-[#007bff] text-white text-[13px] font-medium disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#0056b3] flex items-center gap-1"
          >
            <span>{isLoading ? "Sending" : "Send"}</span>
            {!isLoading && (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path
                  d="M4 10L4 4L16 10L4 16L4 10Z"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
        <label className="flex items-center gap-2 text-[11px] text-[#4b5563]">
          <input
            type="checkbox"
            className="h-3 w-3 rounded border border-[#9ca3af] text-[#007bff]"
            checked={isFeedback}
            onChange={(event) => onChatTypeChange(event.target.checked ? "feedback" : "question")}
          />
          <span>Mark as feedback for developer</span>
        </label>
      </div>
    </div>
  )
}
