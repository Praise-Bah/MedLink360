export interface User {
  id: string
  email: string
  name: string
  role?: 'admin' | 'doctor' | 'nurse' | 'patient'
  createdAt?: string
  updatedAt?: string
}

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  medicalHistory: string[]
  createdAt?: string
  updatedAt?: string
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
