export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface ThemeState {
  theme: 'light' | 'dark'
  primaryColor: string
}

export interface FormState {
  isSubmitting: boolean
  errors: Record<string, string>
  touched: Record<string, boolean>
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'doctor' | 'nurse' | 'patient'
  avatar?: string
  preferences?: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark'
  notifications: boolean
  language: string
}
