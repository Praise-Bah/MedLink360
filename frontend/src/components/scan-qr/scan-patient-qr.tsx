"use client"

import { useState, useRef, useEffect } from "react"

export function ScanPatientQR() {
  const [isScanning, setIsScanning] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Check camera permission on mount
    checkCameraPermission()

    return () => {
      // Cleanup camera stream and timer on unmount
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      stopCamera()
    }
  }, [])

  const checkCameraPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'camera' as PermissionName })
      setHasPermission(result.state === 'granted')
      
      result.addEventListener('change', () => {
        setHasPermission(result.state === 'granted')
      })
    } catch (error) {
      console.error('Permission check failed:', error)
      setHasPermission(false)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsScanning(true)
        setHasPermission(true)
        setErrorMessage("")

        // Auto-stop camera after 10 seconds
        timerRef.current = setTimeout(() => {
          stopCamera()
        }, 10000)
      }
    } catch (error) {
      console.error('Camera access failed:', error)
      setHasPermission(false)
      setErrorMessage("Could not access cameras. Please ensure camera permissions are granted.")
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsScanning(false)
  }

  const handleStartScanning = () => {
    if (isScanning) {
      stopCamera()
    } else {
      startCamera()
    }
  }

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[16px] text-[#212529] mb-1">Manage and view all patient records</p>
          <h1 className="text-[30px] font-bold text-[#212529] tracking-[-0.75px]">Scan Patient QR</h1>
        </div>
        <button 
          onClick={handleStartScanning}
          className="flex items-center gap-2 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Scan QR
        </button>
      </div>

      <p className="text-[20px] text-[#212529] mb-6">Click the button below to start scanning</p>

      {/* Scanner Area */}
      <div className="bg-[#e8f0f8] border-2 border-dashed border-[#007bff] rounded-2xl mb-6 min-h-[400px] flex items-center justify-center relative overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay
          playsInline
          className={`w-full h-full object-cover ${isScanning ? 'block' : 'hidden'}`}
        />
        {!isScanning && (
          <div className="text-center absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-24 h-24 mx-auto mb-4 text-[#007bff]">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-[18px] font-medium text-[#212529]">Ready to scan</p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-white border border-[#6c7688] rounded-2xl p-4 mb-6 flex items-center gap-3">
          <svg className="w-6 h-6 text-[#dc3545] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[14px] text-[#dc3545] flex-1">{errorMessage}</p>
        </div>
      )}

      {/* Start Scanning Button */}
      <button 
        onClick={handleStartScanning}
        className="w-full bg-[#007bff] text-white rounded-2xl py-4 text-[16px] font-medium hover:bg-[#0056b3] transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {isScanning ? "Stop Scanning" : "Start Scanning"}
      </button>
    </div>
  )
}
