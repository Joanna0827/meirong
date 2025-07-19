import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qsvzvxvejupjvlkxcsxa.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzdnp2eHZlanVwanZsa3hjc3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4OTIzNjgsImV4cCI6MjA2ODQ2ODM2OH0.8j5D0mz7CXENY1HiiCGJ2ZoCQypeuEgTWUzuysz34y0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 预约表类型定义
export interface Appointment {
  id: string
  customer_name: string
  customer_phone: string
  service_name: string
  appointment_date: string
  appointment_time: string
  duration_minutes: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
}

export interface CreateAppointmentData {
  customer_name: string
  customer_phone: string
  service_name: string
  appointment_date: string
  appointment_time: string
  duration_minutes?: number
  notes?: string
} 