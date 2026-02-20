"use client"

import { useState, useRef } from "react"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (files: UploadedFile[]) => void
}

export interface UploadedFile {
  id: string
  name: string
  type: "file" | "video" | "document"
  size: number
  uploadDate: string
  url?: string
  consultationData?: any
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [showOptions, setShowOptions] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "file" | "video") => {
    const files = event.target.files
    if (!files) return

    const uploadedFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      type: type,
      size: file.size,
      uploadDate: new Date().toISOString(),
      url: URL.createObjectURL(file)
    }))

    onUpload(uploadedFiles)
    handleClose()
  }

  const handleClose = () => {
    setShowOptions(true)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl w-full max-w-[280px] mx-4 shadow-xl overflow-hidden">
        {showOptions && (
          <div className="py-2">
            {/* Create Folder */}
            <button
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#f8f9fa] transition-colors text-left"
              onClick={() => {
                // TODO: Implement folder creation
                console.log("Create folder")
              }}
            >
              <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span className="text-[15px] text-[#212529]">Create Folder</span>
            </button>

            {/* Upload or Drop File */}
            <button
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#f8f9fa] transition-colors text-left"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-[15px] text-[#212529]">Upload or Drop File</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, "file")}
              className="hidden"
            />

            {/* Upload or Drop Video */}
            <button
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#f8f9fa] transition-colors text-left"
              onClick={() => videoInputRef.current?.click()}
            >
              <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-[15px] text-[#212529]">Upload or Drop Video</span>
            </button>
            <input
              ref={videoInputRef}
              type="file"
              multiple
              accept="video/*"
              onChange={(e) => handleFileUpload(e, "video")}
              className="hidden"
            />

            {/* Create File */}
            <button
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#f8f9fa] transition-colors text-left"
              onClick={() => {
                // TODO: Implement file creation
                console.log("Create file")
              }}
            >
              <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="text-[15px] text-[#212529]">Create File</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
