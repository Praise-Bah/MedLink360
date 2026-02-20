"use client"

import { useState } from "react"

interface Notification {
  id: number
  type: "alert" | "reminder" | "urgent" | "notification"
  title: string
  subtitle: string
  description: string
  time: string
  read: boolean
  icon?: "disease" | "calendar" | "lab" | "medication" | "billing"
}

export function NotificationsSection() {
  const [activeTab, setActiveTab] = useState<"read" | "unread">("unread")

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "alert",
      title: "Global Disease Outbreaks 2025",
      subtitle: "",
      description: "Mpox (Monkeypox) cases have been reported in our area. Please take necessary precautions to protect yourself and others. If you have any symptoms or have been exposed to someone with Mpox, report to your hospital immediately to receive proper care and guidance. Additionally, stay tuned for official announcements from the Ministry of Health regarding vaccine availability and distribution.",
      time: "2 days ago",
      read: false,
      icon: "disease"
    },
    {
      id: 2,
      type: "reminder",
      title: "Appointment Reminder",
      subtitle: "Emergency alert:",
      description: "Emergency in Ward 3. Immediate medical attention is required",
      time: "30 weeks ago",
      read: false,
      icon: "calendar"
    },
    {
      id: 3,
      type: "alert",
      title: "Alert",
      subtitle: "",
      description: "New vaccine announcement from the Ministry of Health regarding Mpox (Monkeypox). Please review and inform patients as necessary.",
      time: "10 weeks ago",
      read: false
    },
    {
      id: 4,
      type: "notification",
      title: "Notification",
      subtitle: "New patient assigned:",
      description: "A new patient has been assigned to you. Please review their medical history before the consultation.",
      time: "30 weeks ago",
      read: false
    },
    {
      id: 5,
      type: "notification",
      title: "Notification",
      subtitle: "Surgery reminder:",
      description: "Your scheduled surgery for Patient #1290 begins in 30 minutes.",
      time: "30 weeks ago",
      read: false
    },
    {
      id: 6,
      type: "reminder",
      title: "Reminder",
      subtitle: "",
      description: "You have a patient, Mrs. Jane Smith, scheduled for a follow-up appointment today at 2 PM.",
      time: "10 weeks ago",
      read: false,
      icon: "calendar"
    },
    {
      id: 7,
      type: "urgent",
      title: "Urgent",
      subtitle: "Follow-up due:",
      description: "Patient #301 has a follow-up appointment pending. Please update their treatment plan.",
      time: "30 weeks ago",
      read: false
    }
  ])

  const readNotifications = notifications.filter(n => n.read)
  const unreadNotifications = notifications.filter(n => !n.read)
  const displayedNotifications = activeTab === "read" ? readNotifications : unreadNotifications

  const getNotificationIcon = (notification: Notification) => {
    if (notification.icon === "disease") {
      return (
        <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center">
          <svg className="w-5 h-5 text-[#4caf50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      )
    }
    if (notification.icon === "calendar") {
      return (
        <div className="w-10 h-10 rounded-full bg-[#fff3e0] flex items-center justify-center">
          <svg className="w-5 h-5 text-[#ff9800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2}/>
            <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2}/>
            <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2}/>
            <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2}/>
          </svg>
        </div>
      )
    }
    if (notification.icon === "medication") {
      return (
        <div className="w-10 h-10 rounded-full bg-[#e3f2fd] flex items-center justify-center">
          <svg className="w-5 h-5 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
      )
    }
    return null
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-l-4 border-l-[#dc3545]"
      case "alert":
        return "border-l-4 border-l-[#ffc107]"
      case "reminder":
        return "border-l-4 border-l-[#007bff]"
      default:
        return "border-l-4 border-l-[#6c757d]"
    }
  }

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="max-w-[900px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[24px] font-semibold text-[#212529]">Notifications</h1>
          <span className="bg-[#007bff] text-white text-[12px] font-medium px-2 py-0.5 rounded-full">
            {unreadNotifications.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleMarkAllRead}
            className="text-[14px] text-[#007bff] hover:text-[#0056b3] font-medium"
          >
            Mark all as read
          </button>
          <button className="p-1 hover:bg-[#f8f9fa] rounded">
            <svg className="w-5 h-5 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="6" r="2"/>
              <circle cx="12" cy="12" r="2"/>
              <circle cx="12" cy="18" r="2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab("read")}
          className={`flex-1 py-3 text-[14px] font-medium border-2 rounded-l-full transition-colors ${
            activeTab === "read"
              ? "bg-white text-[#212529] border-[#007bff]"
              : "bg-[#f8f9fa] text-[#6c757d] border-[#e9ecef] hover:bg-[#e9ecef]"
          }`}
        >
          Read
        </button>
        <button
          onClick={() => setActiveTab("unread")}
          className={`flex-1 py-3 text-[14px] font-medium border-2 rounded-r-full transition-colors ${
            activeTab === "unread"
              ? "bg-[#212529] text-white border-[#212529]"
              : "bg-[#f8f9fa] text-[#6c757d] border-[#e9ecef] hover:bg-[#e9ecef]"
          }`}
        >
          Unread
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {displayedNotifications.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-[#6c757d]">No {activeTab} notifications</p>
          </div>
        ) : (
          displayedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.04),0px_3px_3px_rgba(0,0,0,0.03)] ${getTypeStyles(notification.type)}`}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                {getNotificationIcon(notification)}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-[14px] font-semibold text-[#212529] mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-[13px] text-[#495057]">
                        {notification.subtitle && (
                          <span className="font-medium">{notification.subtitle}</span>
                        )}{" "}
                        {notification.description}
                      </p>
                    </div>
                    <span className="text-[12px] text-[#6c757d] whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
