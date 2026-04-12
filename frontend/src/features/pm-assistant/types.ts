export type ChatRole = "user" | "assistant"

export interface NavigationSuggestion {
  label: string
  route: string
  role?: string
}

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  createdAt: number
  navSuggestion?: NavigationSuggestion
}

export type ChatType = "question" | "feedback"

export interface AssistantRequestBody {
  messages: { role: "user" | "assistant"; content: string }[]
  pageUrl?: string
  type?: ChatType
}

export interface AssistantResponseBody {
  reply?: string
  error?: string
}
