import { supabase, Appointment, CreateAppointmentData } from './supabase'

// 创建新预约
export async function createAppointment(data: CreateAppointmentData): Promise<{ success: boolean; data?: Appointment; error?: string }> {
  try {
    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert([data])
      .select()
      .single()

    if (error) {
      console.error('创建预约失败:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: appointment }
  } catch (error) {
    console.error('创建预约异常:', error)
    return { success: false, error: '创建预约失败，请稍后重试' }
  }
}

// 根据手机号查询预约
export async function getAppointmentsByPhone(phone: string): Promise<{ success: boolean; data?: Appointment[]; error?: string }> {
  try {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('customer_phone', phone)
      .order('appointment_date', { ascending: false })

    if (error) {
      console.error('查询预约失败:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: appointments }
  } catch (error) {
    console.error('查询预约异常:', error)
    return { success: false, error: '查询预约失败，请稍后重试' }
  }
}

// 获取所有预约（后台管理用）
export async function getAllAppointments(): Promise<{ success: boolean; data?: Appointment[]; error?: string }> {
  try {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: false })

    if (error) {
      console.error('获取所有预约失败:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: appointments }
  } catch (error) {
    console.error('获取所有预约异常:', error)
    return { success: false, error: '获取预约列表失败，请稍后重试' }
  }
}

// 更新预约状态
export async function updateAppointmentStatus(id: string, status: Appointment['status']): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('更新预约状态失败:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('更新预约状态异常:', error)
    return { success: false, error: '更新预约状态失败，请稍后重试' }
  }
} 