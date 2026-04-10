"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AppShellProps {
  children: React.ReactNode
}

interface NavItem {
  label: string
  href: string
  icon: string
  roles?: string[]
}

const navigationItems: NavItem[] = [
  // Patient specific
  { label: "Dashboard", href: "/dashboard", icon: "", roles: ["patient"] },
  { label: "My Medical Book", href: "/medical-book", icon: "", roles: ["patient"] },
  { label: "Appointments", href: "/appointments", icon: "", roles: ["patient"] },
  { label: "Prescriptions", href: "/medical-book/prescriptions", icon: "", roles: ["patient"] },
  { label: "Lab Results", href: "/lab-results", icon: "", roles: ["patient"] },
  { label: "QR Code Access", href: "/qr-access", icon: "", roles: ["patient"] },
  { label: "Notification", href: "/notifications", icon: "", roles: ["patient"] },
  { label: "Settings", href: "/settings", icon: "", roles: ["patient"] },
  // Doctor specific - MAIN section
  { label: "Dashboard", href: "/dashboard", icon: "", roles: ["doctor"] },
  { label: "My Appointments", href: "/appointments", icon: "", roles: ["doctor"] },
  { label: "Scan Patient QR", href: "/qr-access", icon: "", roles: ["doctor"] },
  { label: "Patient Records", href: "/patients", icon: "", roles: ["doctor"] },
  { label: "Prescriptions Issued", href: "/medical-book/prescriptions", icon: "", roles: ["doctor"] },
  { label: "Lab Test Requests", href: "/lab-results", icon: "", roles: ["doctor"] },
  // Doctor specific - RECORD section
  { label: "Notification", href: "/notifications", icon: "", roles: ["doctor"] },
  { label: "Settings", href: "/settings", icon: "", roles: ["doctor"] },
  // Pharmacist specific - MAIN section
  { label: "Dashboard", href: "/dashboard", icon: "", roles: ["pharmacist"] },
  { label: "Pending Prescriptions", href: "/pending-prescriptions", icon: "", roles: ["pharmacist"] },
  { label: "Dispensed Prescriptions", href: "/dispensed-prescriptions", icon: "", roles: ["pharmacist"] },
  { label: "Scan Patient QR", href: "/qr-access", icon: "", roles: ["pharmacist"] },
  { label: "Pharmacy Hours", href: "/pharmacy-hours", icon: "", roles: ["pharmacist"] },
  { label: "Upload Results", href: "/upload-results", icon: "", roles: ["pharmacist"] },
  // Pharmacist specific - RECORD section
  { label: "Notification", href: "/notifications", icon: "", roles: ["pharmacist"] },
  { label: "Settings", href: "/settings", icon: "", roles: ["pharmacist"] },
  // Nurse specific - MAIN section
  { label: "Dashboard", href: "/dashboard", icon: "", roles: ["nurse"] },
  { label: "Assigned Patients", href: "/assigned-patients", icon: "", roles: ["nurse"] },
  { label: "Upcoming Appointments", href: "/appointments", icon: "", roles: ["nurse"] },
  { label: "Record Vitals", href: "/record-vitals", icon: "", roles: ["nurse"] },
  { label: "Scan Patient QR", href: "/qr-access", icon: "", roles: ["nurse"] },
  { label: "Daily Notes", href: "/daily-notes", icon: "", roles: ["nurse"] },
  { label: "Medication Rounds", href: "/medication-rounds", icon: "", roles: ["nurse"] },
  // Nurse specific - RECORD section
  { label: "Notification", href: "/notifications", icon: "", roles: ["nurse"] },
  { label: "Settings", href: "/settings", icon: "", roles: ["nurse"] },
  { label: "Help", href: "/help", icon: "", roles: ["nurse"] },
  // Lab technician specific
  { label: "Dashboard", href: "/dashboard", icon: "", roles: ["lab-technician"] },
  { label: "Patients", href: "/patients", icon: "", roles: ["lab-technician"] },
  { label: "Notification", href: "/notifications", icon: "", roles: ["lab-technician"] },
  { label: "Settings", href: "/settings", icon: "", roles: ["lab-technician"] },
  // Hospital Admin specific - MAIN section
  { label: "Dashboard", href: "/dashboard", icon: "", roles: ["hospital-admin"] },
  { label: "Staff Management", href: "/admin/staff", icon: "", roles: ["hospital-admin"] },
  { label: "Patient Records", href: "/admin/patients", icon: "", roles: ["hospital-admin"] },
  { label: "Appointments", href: "/admin/appointments", icon: "", roles: ["hospital-admin"] },
  { label: "Departments", href: "/admin/departments", icon: "", roles: ["hospital-admin"] },
  { label: "Laboratory", href: "/admin/laboratory", icon: "", roles: ["hospital-admin"] },
  { label: "Reports", href: "/admin/reports", icon: "", roles: ["hospital-admin"] },
  // Hospital Admin specific - RECORD section
  { label: "Notification", href: "/notifications", icon: "", roles: ["hospital-admin"] },
  { label: "Settings", href: "/settings", icon: "", roles: ["hospital-admin"] },
]

function getNavIcon(label: string, isActive: boolean) {
  const iconColor = isActive ? "#ffffff" : "#212529"
  
  switch (label) {
    case "Dashboard":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M2.5 7.5L10 2.5L17.5 7.5V16.25C17.5 16.5815 17.3683 16.8995 17.1339 17.1339C16.8995 17.3683 16.5815 17.5 16.25 17.5H3.75C3.41848 17.5 3.10054 17.3683 2.86612 17.1339C2.6317 16.8995 2.5 16.5815 2.5 16.25V7.5Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.5 17.5V10H12.5V17.5" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "My Medical Book":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M2 3.5C2 2.67157 2.67157 2 3.5 2H6C7.10457 2 8 2.89543 8 4V18C8 17.2044 7.31594 16.5 6.5 16.5H2V3.5Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 3.5C18 2.67157 17.3284 2 16.5 2H14C12.8954 2 12 2.89543 12 4V18C12 17.2044 12.6841 16.5 13.5 16.5H18V3.5Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Appointments":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="4" width="14" height="14" rx="2" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 2V6M7 2V6M3 8H17" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Prescriptions":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M11 2H5C4.46957 2 3.96086 2.21071 3.58579 2.58579C3.21071 2.96086 3 3.46957 3 4V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H15C15.5304 18 16.0391 17.7893 16.4142 17.4142C16.7893 17.0391 17 16.5304 17 16V8L11 2Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 2V8H17M13 11H7M13 14H7" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Lab Results":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M11 2H5C4.46957 2 3.96086 2.21071 3.58579 2.58579C3.21071 2.96086 3 3.46957 3 4V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H15C15.5304 18 16.0391 17.7893 16.4142 17.4142C16.7893 17.0391 17 16.5304 17 16V8L11 2Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 2V8H17M7 11H13M7 14H10" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "QR Code Access":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="6" height="6" rx="1" stroke={iconColor} strokeWidth="1.5"/>
          <rect x="11" y="3" width="6" height="6" rx="1" stroke={iconColor} strokeWidth="1.5"/>
          <rect x="3" y="11" width="6" height="6" rx="1" stroke={iconColor} strokeWidth="1.5"/>
          <path d="M13 11H15M13 13H15M13 15H17M15 15V17" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case "Patients":
    case "Patient Records":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "My Appointments":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="4" width="14" height="14" rx="2" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 2V6M7 2V6M3 8H17" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Scan Patient QR":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="5" height="5" rx="1" stroke={iconColor} strokeWidth="1.5"/>
          <rect x="12" y="3" width="5" height="5" rx="1" stroke={iconColor} strokeWidth="1.5"/>
          <rect x="3" y="12" width="5" height="5" rx="1" stroke={iconColor} strokeWidth="1.5"/>
          <path d="M12 12H14M12 14H14M12 16H17M15 16V18" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case "Prescriptions Issued":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M11 2H5C4.46957 2 3.96086 2.21071 3.58579 2.58579C3.21071 2.96086 3 3.46957 3 4V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H15C15.5304 18 16.0391 17.7893 16.4142 17.4142C16.7893 17.0391 17 16.5304 17 16V8L11 2Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 2V8H17M13 11H7M13 14H7" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Lab Test Requests":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M11 2H5C4.46957 2 3.96086 2.21071 3.58579 2.58579C3.21071 2.96086 3 3.46957 3 4V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H15C15.5304 18 16.0391 17.7893 16.4142 17.4142C16.7893 17.0391 17 16.5304 17 16V8L11 2Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 2V8H17M7 11H13M7 14H10" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Pending Prescriptions":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M16.5 9.5L13.5 12.5C12.9 13.1 11.9 13.1 11.3 12.5L7.5 8.7C6.9 8.1 6.9 7.1 7.5 6.5L10.5 3.5C11.1 2.9 12.1 2.9 12.7 3.5L16.5 7.3C17.1 7.9 17.1 8.9 16.5 9.5Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8L14 6" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3 17L7 13" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="3" cy="17" r="1.5" stroke={iconColor} strokeWidth="1.5"/>
        </svg>
      )
    case "Dispensed Prescriptions":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M16.5 9.5L13.5 12.5C12.9 13.1 11.9 13.1 11.3 12.5L7.5 8.7C6.9 8.1 6.9 7.1 7.5 6.5L10.5 3.5C11.1 2.9 12.1 2.9 12.7 3.5L16.5 7.3C17.1 7.9 17.1 8.9 16.5 9.5Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8L14 6" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3 17L7 13" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="3" cy="17" r="1.5" fill={iconColor}/>
          <path d="M9 15L10.5 16.5L13 14" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Pharmacy Hours":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7" stroke={iconColor} strokeWidth="1.5"/>
          <path d="M10 6V10L13 13" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Upload Results":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H14C14.5304 18 15.0391 17.7893 15.4142 17.4142C15.7893 17.0391 16 16.5304 16 16V7L13 2Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 2V7H16M10 11V15M8 13L10 11L12 13" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Assigned Patients":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="4" width="14" height="14" rx="2" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 2V6M7 2V6M3 8H17" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 12H10M7 15H13" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Upcoming Appointments":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="4" width="14" height="14" rx="2" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 2V6M7 2V6M3 8H17" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Record Vitals":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M3 10H6L8 4L12 16L14 10H17" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Daily Notes":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M4 4C4 2.89543 4.89543 2 6 2H10L16 8V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V4Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 2V8H16" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 12H13M7 15H11" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Medication Rounds":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M11 2H5C4.46957 2 3.96086 2.21071 3.58579 2.58579C3.21071 2.96086 3 3.46957 3 4V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H15C15.5304 18 16.0391 17.7893 16.4142 17.4142C16.7893 17.0391 17 16.5304 17 16V8L11 2Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 2V8H17M7 12H13M7 15H10" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Help":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke={iconColor} strokeWidth="1.5"/>
          <path d="M7.5 7.5C7.5 6.11929 8.61929 5 10 5C11.3807 5 12.5 6.11929 12.5 7.5C12.5 8.88071 11.3807 10 10 10V11.5" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="10" cy="14" r="0.5" fill={iconColor} stroke={iconColor}/>
        </svg>
      )
    case "Staff Management":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M14 15.5C14 13.567 11.985 12 9.5 12C7.015 12 5 13.567 5 15.5" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="9.5" cy="7" r="3" stroke={iconColor} strokeWidth="1.5"/>
          <path d="M16.5 14C16.5 12.619 15.381 11.5 14 11.5" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="14" cy="7.5" r="2" stroke={iconColor} strokeWidth="1.5"/>
        </svg>
      )
    case "Patient Records":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M11 2H5C4.46957 2 3.96086 2.21071 3.58579 2.58579C3.21071 2.96086 3 3.46957 3 4V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H15C15.5304 18 16.0391 17.7893 16.4142 17.4142C16.7893 17.0391 17 16.5304 17 16V8L11 2Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 2V8H17" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 11C10.8284 11 11.5 10.3284 11.5 9.5C11.5 8.67157 10.8284 8 10 8C9.17157 8 8.5 8.67157 8.5 9.5C8.5 10.3284 9.17157 11 10 11Z" stroke={iconColor} strokeWidth="1.5"/>
          <path d="M13 15C13 13.3431 11.6569 12 10 12C8.34315 12 7 13.3431 7 15" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case "Departments":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="9" width="6" height="9" rx="1" stroke={iconColor} strokeWidth="1.5"/>
          <rect x="12" y="9" width="6" height="9" rx="1" stroke={iconColor} strokeWidth="1.5"/>
          <rect x="7" y="2" width="6" height="16" rx="1" stroke={iconColor} strokeWidth="1.5"/>
        </svg>
      )
    case "Laboratory":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M7 2V7L3 14C2.5 15 3 16 4 16H16C17 16 17.5 15 17 14L13 7V2" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 2H13" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M5 11H15" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case "Reports":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M17 11V16C17 16.5304 16.7893 17.0391 16.4142 17.4142C16.0391 17.7893 15.5304 18 15 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V4C3 3.46957 3.21071 2.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2H9" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 10H13M7 14H10" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 2V6H18" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 6L14 2" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Notification":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M15 6.66669C15 5.34061 14.4732 4.06883 13.5355 3.13115C12.5979 2.19347 11.3261 1.66669 10 1.66669C8.67392 1.66669 7.40215 2.19347 6.46447 3.13115C5.52678 4.06883 5 5.34061 5 6.66669C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66669Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70802 18.3304 9.42115 18.2537 9.16814 18.1079C8.91513 17.9622 8.70484 17.7526 8.55835 17.5" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Settings":
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.1667 12.5C16.0557 12.7513 16.0226 13.0301 16.0717 13.3006C16.1209 13.5711 16.2501 13.8203 16.4417 14.0167L16.4917 14.0667C16.6461 14.221 16.7687 14.4048 16.8527 14.6071C16.9368 14.8094 16.9806 15.0263 16.9806 15.2454C16.9806 15.4644 16.9368 15.6813 16.8527 15.8836C16.7687 16.0859 16.6461 16.2697 16.4917 16.4241C16.3373 16.5785 16.1535 16.7011 15.9512 16.7851C15.7489 16.8692 15.532 16.913 15.3129 16.913C15.0939 16.913 14.877 16.8692 14.6747 16.7851C14.4724 16.7011 14.2886 16.5785 14.1342 16.4241L14.0842 16.3741C13.8878 16.1825 13.6386 16.0533 13.3681 16.0042C13.0976 15.955 12.8188 15.9881 12.5675 16.0991C12.3213 16.2054 12.1135 16.3823 11.9707 16.6076C11.8279 16.8329 11.7565 17.0967 11.7658 17.3641V17.5C11.7658 17.942 11.5903 18.366 11.2777 18.6785C10.9652 18.9911 10.5413 19.1666 10.0992 19.1666C9.65718 19.1666 9.23322 18.9911 8.92066 18.6785C8.6081 18.366 8.43262 17.942 8.43262 17.5V17.425C8.41775 17.1482 8.33351 16.8801 8.18804 16.6463C8.04257 16.4125 7.84068 16.2208 7.60091 16.0891C7.34959 15.9781 7.07083 15.945 6.80031 15.9942C6.5298 16.0433 6.28059 16.1725 6.08424 16.3641L6.03424 16.4141C5.87984 16.5685 5.69603 16.6911 5.49373 16.7751C5.29143 16.8592 5.07454 16.903 4.85549 16.903C4.63644 16.903 4.41955 16.8592 4.21725 16.7751C4.01495 16.6911 3.83114 16.5685 3.67674 16.4141C3.52234 16.2597 3.39975 16.0759 3.31569 15.8736C3.23163 15.6713 3.18783 15.4544 3.18783 15.2354C3.18783 15.0163 3.23163 14.7994 3.31569 14.5971C3.39975 14.3948 3.52234 14.211 3.67674 14.0566L3.72674 14.0066C3.91832 13.8103 4.04754 13.5611 4.09667 13.2906C4.1458 13.0201 4.11272 12.7413 4.00174 12.49C3.89541 12.2438 3.71854 12.036 3.49323 11.8932C3.26792 11.7504 3.00414 11.679 2.73674 11.6883H2.60091C2.15888 11.6883 1.73492 11.5128 1.42236 11.2003C1.1098 10.8877 0.934326 10.4638 0.934326 10.0216C0.934326 9.57962 1.1098 9.15566 1.42236 8.8431C1.73492 8.53054 2.15888 8.35506 2.60091 8.35506H2.67591C2.95271 8.34019 3.22076 8.25595 3.45458 8.11048C3.6884 7.96501 3.88008 7.76312 4.01174 7.52335C4.12272 7.27203 4.1558 6.99327 4.10667 6.72276C4.05754 6.45224 3.92832 6.20303 3.73674 6.00668V5.95668C3.58234 5.80228 3.45975 5.61847 3.37569 5.41617C3.29163 5.21387 3.24783 4.99698 3.24783 4.77793C3.24783 4.55888 3.29163 4.34199 3.37569 4.13969C3.45975 3.93739 3.58234 3.75358 3.73674 3.59918C3.89114 3.44478 4.07495 3.32219 4.27725 3.23813C4.47955 3.15407 4.69644 3.11027 4.91549 3.11027C5.13454 3.11027 5.35143 3.15407 5.55373 3.23813C5.75603 3.32219 5.93984 3.44478 6.09424 3.59918L6.14424 3.64918C6.34059 3.84076 6.5898 3.96998 6.86031 4.01911C7.13083 4.06824 7.40959 4.03516 7.66091 3.92418H7.76007C8.00629 3.81785 8.21408 3.64098 8.35687 3.41567C8.49966 3.19036 8.57106 2.92658 8.56174 2.65918V2.52335C8.56174 2.08132 8.73722 1.65736 9.04978 1.3448C9.36234 1.03224 9.7863 0.856762 10.2283 0.856762C10.6704 0.856762 11.0943 1.03224 11.4069 1.3448C11.7194 1.65736 11.8949 2.08132 11.8949 2.52335V2.59835C11.8856 2.86575 11.957 3.12953 12.0998 3.35484C12.2426 3.58015 12.4504 3.75702 12.6966 3.86335C12.9479 3.97433 13.2267 4.00741 13.4972 3.95828C13.7677 3.90915 14.0169 3.77993 14.2133 3.58835L14.2633 3.53835C14.4177 3.38395 14.6015 3.26136 14.8038 3.1773C15.0061 3.09324 15.223 3.04944 15.442 3.04944C15.6611 3.04944 15.878 3.09324 16.0803 3.1773C16.2826 3.26136 16.4664 3.38395 16.6208 3.53835C16.7752 3.69275 16.8978 3.87656 16.9818 4.07886C17.0659 4.28116 17.1097 4.49805 17.1097 4.7171C17.1097 4.93615 17.0659 5.15304 16.9818 5.35534C16.8978 5.55764 16.7752 5.74145 16.6208 5.89585L16.5708 5.94585C16.3792 6.1422 16.25 6.39141 16.2009 6.66193C16.1518 6.93244 16.1849 7.2112 16.2958 7.46252V7.56168C16.4022 7.8079 16.579 8.01569 16.8043 8.15848C17.0296 8.30127 17.2934 8.37267 17.5608 8.36335H17.6967C18.1387 8.36335 18.5627 8.53883 18.8752 8.85139C19.1878 9.16395 19.3633 9.58791 19.3633 10.0299C19.3633 10.472 19.1878 10.8959 18.8752 11.2085C18.5627 11.5211 18.1387 11.6966 17.6967 11.6966H17.6217C17.3543 11.6859 17.0905 11.7573 16.8652 11.9001C16.6399 12.0429 16.463 12.2507 16.3567 12.4969V12.4969Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    default:
      return (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M3 10H17M3 5H17M3 15H17" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
  }
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>("User")
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadCount, setUnreadCount] = useState(3)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== "undefined") {
      const role = window.localStorage.getItem("selectedRole")
      setUserRole(role)
      // TODO: Get actual user name from auth context
      setUserName("John Doe")
      // Restore sidebar state from localStorage
      const savedCollapsed = window.localStorage.getItem("sidebarCollapsed")
      if (savedCollapsed !== null) {
        setIsSidebarCollapsed(savedCollapsed === "true")
      }
    }
  }, [])

  const filteredNavItems = navigationItems.filter(item => {
    if (!item.roles) return true
    if (!userRole) return true
    return item.roles.includes(userRole)
  })

  return (
    <div className="flex min-h-screen bg-[#f2f8ff]">
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white flex flex-col transform transition-transform duration-200 w-[240px]
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 ${
          isMounted && isSidebarCollapsed ? "md:w-[84px]" : "md:w-[240px]"
        }`}
      >
        {/* Logo */}
        <div className={`h-[72px] flex items-center ${isMounted && isSidebarCollapsed ? "px-3 justify-center" : "px-6"}`}>
          <Link href="/dashboard" className="flex items-center gap-3">
            <img 
              src="/medlink360_logo_cropped.png" 
              alt="MedLink360" 
              className={isMounted && isSidebarCollapsed ? "h-12 w-auto" : "h-20 w-auto"}
            />
          </Link>
        </div>

        {/* Main Label */}
        {(!isMounted || !isSidebarCollapsed) && (
          <div className="px-6 mb-2">
            <span className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">Main</span>
          </div>
        )}

        {/* Navigation */}
        <nav className={`flex-1 ${isMounted && isSidebarCollapsed ? "px-2" : "px-3"} space-y-1 overflow-y-auto`}>
          {filteredNavItems.map((item, index) => {
            const isActive = pathname === item.href || (item.href === "/patients" && pathname.startsWith("/patients/"))
            const showRecordLabel = item.label === "Notification"
            
            return (
              <div key={`${item.label}-${index}`}>
                {showRecordLabel && (!isMounted || !isSidebarCollapsed) && (
                  <div className="px-3 mt-4 mb-2">
                    <span className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">Record</span>
                  </div>
                )}
                <Link
                  href={item.href}
                  className={`flex items-center ${isMounted && isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? "bg-[#007bff] text-white"
                      : "text-[#575f6e] hover:bg-[#f8fafc]"
                  }`}
                >
                  {getNavIcon(item.label, isActive)}
                  {(!isMounted || !isSidebarCollapsed) && <span className="font-medium">{item.label}</span>}
                </Link>
              </div>
            )
          })}
        </nav>

        {/* Help Section */}
        <div className={`p-3 mb-4 ${isMounted && isSidebarCollapsed ? "flex justify-center" : ""}`}>
          <Link
            href="/help"
            className={`flex items-center ${isMounted && isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-lg text-[14px] text-[#575f6e] hover:bg-[#f8fafc] transition-colors`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {(!isMounted || !isSidebarCollapsed) && <span className="font-medium">Help</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <header className="h-16 bg-white shadow-[0px_8px_28px_0px_rgba(72,89,102,0.1)] flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 text-[#1f263e]">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center justify-center md:hidden"
              aria-label="Open navigation"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop collapse button */}
            <button
              onClick={() => {
                setIsSidebarCollapsed((prev) => {
                  const newValue = !prev
                  if (typeof window !== "undefined") {
                    window.localStorage.setItem("sidebarCollapsed", String(newValue))
                  }
                  return newValue
                })
              }}
              className="hidden md:flex items-center justify-center"
              aria-label="Toggle sidebar"
            >
              <svg
                className={`h-4 w-4 transition-transform ${isMounted && isSidebarCollapsed ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className="relative flex-1 max-w-[520px] mx-4 hidden sm:block">
            <input
              type="text"
              placeholder="Type any cryptocurrency..."
              className="w-full h-10 pl-11 pr-4 rounded-full bg-[#f7f9fc] border border-transparent text-[12px] text-[#1f263e] placeholder:text-[#1f263e]/40 focus:outline-none focus:border-[#e2e4e5]"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1f263e]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center ml-2">
            <div className="h-7 w-7 rounded-full overflow-hidden border border-[#e2e4e5]">
              <svg viewBox="0 0 3 2" className="h-full w-full">
                <rect width="1" height="2" x="0" y="0" fill="#007a5e" />
                <rect width="1" height="2" x="1" y="0" fill="#ce1126" />
                <rect width="1" height="2" x="2" y="0" fill="#fcd116" />
                <polygon points="1.5,0.6 1.58,0.9 1.86,0.9 1.64,1.08 1.72,1.4 1.5,1.22 1.28,1.4 1.36,1.08 1.14,0.9 1.42,0.9" fill="#fcd116" />
              </svg>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
