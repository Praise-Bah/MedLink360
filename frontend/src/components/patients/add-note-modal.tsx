"use client"

import { useState } from "react"

interface AddNoteModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (noteContent: string) => void
  patientId?: string
}

export function AddNoteModal({ isOpen, onClose, onSave, patientId }: AddNoteModalProps) {
  const [showEditor, setShowEditor] = useState(false)
  const [noteContent, setNoteContent] = useState("")

  const handleStartTyping = () => {
    setShowEditor(true)
  }

  const handleSave = () => {
    if (noteContent.trim()) {
      onSave(noteContent)
    }
    onClose()
    setShowEditor(false)
    setNoteContent("")
  }

  const handleClose = () => {
    onClose()
    setShowEditor(false)
    setNoteContent("")
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
      <div className="relative bg-white rounded-2xl w-full max-w-[700px] mx-4 shadow-xl">
        {!showEditor ? (
          // Initial Note Type Selection
          <div className="p-8">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#6c757d] hover:bg-[#f8f9fa] rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-[18px] font-medium text-[#212529] mb-2">
                How would you like to take notes for this session?
              </h2>
              <p className="text-[14px] text-[#6c757d] mb-8">
                You may record audio or type your notes manually.
              </p>

              <button
                onClick={handleStartTyping}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#007bff] text-white rounded-lg text-[16px] font-medium hover:bg-[#0056b3] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Start Typing Notes
              </button>
            </div>
          </div>
        ) : (
          // Rich Text Editor
          <div className="flex flex-col h-[600px]">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e7e8eb]">
              <h2 className="text-[18px] font-semibold text-[#212529]">Add Note</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] hover:bg-[#0056b3] transition-colors"
                >
                  Save Note
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1 px-4 py-2 border-b border-[#e7e8eb] bg-[#f8f9fa]">
              {/* Text Formatting */}
              <div className="flex items-center gap-1 pr-2 border-r border-[#e7e8eb]">
                <button
                  onClick={() => document.execCommand('bold')}
                  className="p-2 hover:bg-white rounded transition-colors"
                  title="Bold"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
                  </svg>
                </button>
                <button
                  onClick={() => document.execCommand('italic')}
                  className="p-2 hover:bg-white rounded transition-colors"
                  title="Italic"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/>
                  </svg>
                </button>
                <button
                  onClick={() => document.execCommand('underline')}
                  className="p-2 hover:bg-white rounded transition-colors"
                  title="Underline"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/>
                  </svg>
                </button>
              </div>

              {/* Lists */}
              <div className="flex items-center gap-1 px-2 border-r border-[#e7e8eb]">
                <button
                  onClick={() => document.execCommand('insertUnorderedList')}
                  className="p-2 hover:bg-white rounded transition-colors"
                  title="Bullet List"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
                  </svg>
                </button>
                <button
                  onClick={() => document.execCommand('insertOrderedList')}
                  className="p-2 hover:bg-white rounded transition-colors"
                  title="Numbered List"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/>
                  </svg>
                </button>
              </div>

              {/* Alignment */}
              <div className="flex items-center gap-1 px-2 border-r border-[#e7e8eb]">
                <button
                  onClick={() => document.execCommand('justifyLeft')}
                  className="p-2 hover:bg-white rounded transition-colors"
                  title="Align Left"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/>
                  </svg>
                </button>
                <button
                  onClick={() => document.execCommand('justifyCenter')}
                  className="p-2 hover:bg-white rounded transition-colors"
                  title="Align Center"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/>
                  </svg>
                </button>
                <button
                  onClick={() => document.execCommand('justifyRight')}
                  className="p-2 hover:bg-white rounded transition-colors"
                  title="Align Right"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/>
                  </svg>
                </button>
              </div>

              {/* Additional Tools */}
              <div className="flex items-center gap-1 px-2">
                <button
                  onClick={() => document.execCommand('removeFormat')}
                  className="p-2 hover:bg-white rounded transition-colors"
                  title="Clear Formatting"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6zm14 14l-1.41-1.41-9.2-9.2-1.41-1.41-1.41-1.41L5.16 4.16 4 5.37l4.6 4.6-.6 1.43-1.31 3.1h3.13l-.5 1.18-1.18 2.82H13l-1.78 4.1h2.05L16 18.7 18.84 21.6 20 20.39 19.59 20l.01-.01L20 19.59z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Editor Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              <div
                contentEditable
                onInput={(e) => setNoteContent(e.currentTarget.innerHTML)}
                className="min-h-full outline-none text-[14px] text-[#212529] leading-relaxed"
                style={{ 
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}
                suppressContentEditableWarning
              >
                {/* Editable content area */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
