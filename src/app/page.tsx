'use client'

import { useState } from 'react'
import { createAppointment, getAppointmentsByPhone } from '@/lib/appointments'
import { Appointment } from '@/lib/supabase'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'booking' | 'query'>('booking')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  // 预约表单状态
  const [bookingForm, setBookingForm] = useState({
    customer_name: '',
    customer_phone: '',
    service_name: '',
    appointment_date: '',
    appointment_time: '',
    duration_minutes: 60,
    notes: ''
  })

  // 查询表单状态
  const [queryPhone, setQueryPhone] = useState('')

  // 处理预约表单提交
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const result = await createAppointment(bookingForm)
    
    if (result.success) {
      setMessage({ type: 'success', text: '预约成功！我们会尽快与您联系确认。' })
      setBookingForm({
        customer_name: '',
        customer_phone: '',
        service_name: '',
        appointment_date: '',
        appointment_time: '',
        duration_minutes: 60,
        notes: ''
      })
    } else {
      setMessage({ type: 'error', text: result.error || '预约失败，请稍后重试' })
    }

    setLoading(false)
  }

  // 处理查询预约
  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const result = await getAppointmentsByPhone(queryPhone)
    
    if (result.success) {
      setAppointments(result.data || [])
      if (result.data?.length === 0) {
        setMessage({ type: 'error', text: '未找到相关预约记录' })
      }
    } else {
      setMessage({ type: 'error', text: result.error || '查询失败，请稍后重试' })
    }

    setLoading(false)
  }

  // 获取状态中文名称
  const getStatusText = (status: string) => {
    const statusMap = {
      pending: '待确认',
      confirmed: '已确认',
      completed: '已完成',
      cancelled: '已取消'
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    const colorMap = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colorMap[status as keyof typeof colorMap] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                🌸 美丽时光美容店 🌸
              </h1>
              <p className="text-gray-600 mt-2">专业美容服务，让您美丽绽放</p>
            </div>
            <div className="flex-1 flex justify-end">
              <a
                href="/admin"
                className="text-sm text-pink-600 hover:text-pink-800 font-medium"
              >
                管理后台 →
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 标签页 */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm mb-8">
          <button
            onClick={() => setActiveTab('booking')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'booking'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            在线预约
          </button>
          <button
            onClick={() => setActiveTab('query')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'query'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            查询预约
          </button>
        </div>

        {/* 消息提示 */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* 预约表单 */}
        {activeTab === 'booking' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">在线预约</h2>
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓名 *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.customer_name}
                    onChange={(e) => setBookingForm({...bookingForm, customer_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    手机号 *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.customer_phone}
                    onChange={(e) => setBookingForm({...bookingForm, customer_phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="请输入您的手机号"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  服务项目 *
                </label>
                <select
                  required
                  value={bookingForm.service_name}
                  onChange={(e) => setBookingForm({...bookingForm, service_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">请选择服务项目</option>
                  <option value="面部护理">面部护理</option>
                  <option value="身体护理">身体护理</option>
                  <option value="美甲服务">美甲服务</option>
                  <option value="美发造型">美发造型</option>
                  <option value="美容美体">美容美体</option>
                  <option value="其他服务">其他服务</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    预约日期 *
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingForm.appointment_date}
                    onChange={(e) => setBookingForm({...bookingForm, appointment_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    预约时间 *
                  </label>
                  <input
                    type="time"
                    required
                    value={bookingForm.appointment_time}
                    onChange={(e) => setBookingForm({...bookingForm, appointment_time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    服务时长 (分钟)
                  </label>
                  <input
                    type="number"
                    value={bookingForm.duration_minutes}
                    onChange={(e) => setBookingForm({...bookingForm, duration_minutes: parseInt(e.target.value) || 60})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    min="30"
                    max="300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  备注信息
                </label>
                <textarea
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="请输入特殊要求或备注信息"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-500 text-white py-3 px-4 rounded-md font-medium hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? '提交中...' : '提交预约'}
              </button>
            </form>
          </div>
        )}

        {/* 查询预约 */}
        {activeTab === 'query' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">查询预约</h2>
            
            {/* 查询表单 */}
            <form onSubmit={handleQuerySubmit} className="mb-6">
              <div className="flex gap-4">
                <input
                  type="tel"
                  required
                  value={queryPhone}
                  onChange={(e) => setQueryPhone(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="请输入您的手机号"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-pink-500 text-white px-6 py-2 rounded-md font-medium hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? '查询中...' : '查询'}
                </button>
              </div>
            </form>

            {/* 预约列表 */}
            {appointments.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">您的预约记录</h3>
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{appointment.service_name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>预约时间：{appointment.appointment_date} {appointment.appointment_time}</p>
                      <p>服务时长：{appointment.duration_minutes} 分钟</p>
                      {appointment.notes && <p>备注：{appointment.notes}</p>}
                      <p>创建时间：{new Date(appointment.created_at).toLocaleString('zh-CN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            © 2024 美丽时光美容店. 专业美容服务，让您美丽绽放.
          </p>
        </div>
      </footer>
    </div>
  )
}
