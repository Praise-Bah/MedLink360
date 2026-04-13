"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

interface ScanPatientQRProps {
  userRole?: "nurse" | "pharmacist" | "doctor"
}

export function ScanPatientQR({ userRole = "pharmacist" }: ScanPatientQRProps) {
  const router = useRouter()
  const [isScanning, setIsScanning] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [scanSuccess, setScanSuccess] = useState(false)
  const [scannedPatientId, setScannedPatientId] = useState<string | null>(null)
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
      setErrorMessage("")
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        
        // Wait for video to be ready and play it
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                setIsScanning(true)
                setHasPermission(true)
              })
              .catch((err) => {
                console.error('Video play failed:', err)
                setErrorMessage("Could not start video playback.")
              })
          }
        }
      }
    } catch (error: unknown) {
      console.error('Camera access failed:', error)
      setHasPermission(false)
      
      if (error && typeof error === 'object' && 'name' in error) {
        const err = error as { name?: string }
        if (err.name === 'NotAllowedError') {
          setErrorMessage("Camera permission denied. Please allow camera access in your browser settings.")
        } else if (err.name === 'NotFoundError') {
          setErrorMessage("No camera found. Please connect a camera and try again.")
        } else if (err.name === 'NotReadableError') {
          setErrorMessage("Camera is in use by another application. Please close other apps using the camera.")
        } else {
          setErrorMessage("Could not access camera. Please ensure camera permissions are granted.")
        }
      } else {
        setErrorMessage("Could not access camera. Please ensure camera permissions are granted.")
      }
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
      // Simulate QR code detection after 3 seconds for demo
      timerRef.current = setTimeout(() => {
        simulateQRScan()
      }, 3000)
    }
  }

  const simulateQRScan = () => {
    // Simulate scanning a patient QR code
    const mockPatientId = "PT001"
    setScannedPatientId(mockPatientId)
    setScanSuccess(true)
    stopCamera()
  }

  const handleViewPatient = () => {
    if (scannedPatientId) {
      if (userRole === "nurse") {
        router.push(`/nurse/patient/${scannedPatientId}`)
      } else if (userRole === "pharmacist") {
        router.push(`/pharmacist/patient/${scannedPatientId}`)
      } else {
        router.push(`/patients/${scannedPatientId}`)
      }
    }
  }

  const handleScanAgain = () => {
    setScanSuccess(false)
    setScannedPatientId(null)
    startCamera()
    timerRef.current = setTimeout(() => {
      simulateQRScan()
    }, 3000)
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

      {!scanSuccess && (
        <p className="text-[20px] text-[#212529] mb-6">Click the button below to start scanning</p>
      )}

      {/* Success State */}
      {scanSuccess && scannedPatientId && (
        <div className="bg-white rounded-2xl border border-[#e9ecef] p-8 mb-6">
          {/* Success Icon */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#d1fae5] flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-[24px] font-bold text-[#212529] mb-2">Scan Successful!</h2>
            <p className="text-[14px] text-[#6c757d]">Patient QR code has been scanned successfully</p>
          </div>

          {/* Patient Info Card */}
          <div className="bg-[#f8f9fa] rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#007bff] flex items-center justify-center text-white text-[20px] font-semibold">
                AR
              </div>
              <div className="flex-1">
                <p className="text-[18px] font-semibold text-[#212529]">Ateeq Rafiq</p>
                <p className="text-[14px] text-[#6c757d]">Patient ID: {scannedPatientId}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[12px] text-[#6c757d]">28 years • Male</span>
                  <span className="px-2 py-1 bg-[#d1fae5] text-[#059669] rounded-full text-[11px] font-medium">Stable</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#e9ecef] grid grid-cols-2 gap-4">
              <div>
                <p className="text-[12px] text-[#6c757d]">Location</p>
                <p className="text-[14px] font-medium text-[#212529]">Ward 12A • Bed 3</p>
              </div>
              <div>
                <p className="text-[12px] text-[#6c757d]">Diagnosis</p>
                <p className="text-[14px] font-medium text-[#212529]">Stage 2 Hypertension</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleScanAgain}
              className="flex-1 px-4 py-3 border border-[#e9ecef] text-[#6c757d] rounded-xl text-[14px] font-medium hover:bg-[#f8f9fa] transition-colors"
            >
              Scan Another
            </button>
            <button
              onClick={handleViewPatient}
              className="flex-1 px-4 py-3 bg-[#007bff] text-white rounded-xl text-[14px] font-medium hover:bg-[#0056b3] transition-colors flex items-center justify-center gap-2"
            >
              {userRole === "nurse" ? "View Patient Medical Book" : "View Medical Book"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Scanner Area - only show when not successful */}
      {!scanSuccess && (
        <div className="bg-[#e8f0f8] border-2 border-dashed border-[#007bff] rounded-2xl mb-6 h-[400px] flex items-center justify-center relative overflow-hidden">
          {/* Video element - always present but hidden when not scanning */}
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover rounded-xl ${isScanning ? 'block' : 'hidden'}`}
          />
          
          {/* Placeholder when not scanning */}
          {!isScanning && (
            <div className="text-center flex flex-col items-center justify-center z-10">
              <div className="w-24 h-24 mx-auto mb-4 text-[#007bff]">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-[18px] font-medium text-[#212529]">Ready to scan</p>
            </div>
          )}
          
          {/* Scanning overlay with corners */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* QR Frame corners */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                {/* Top-left corner */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
                {/* Top-right corner */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
                {/* Bottom-left corner */}
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
                {/* Bottom-right corner */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />
              </div>
              {/* Scanning status text */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg text-sm">
                Scanning... Position QR code in frame
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && !scanSuccess && (
        <div className="bg-white border border-[#6c7688] rounded-2xl p-4 mb-6 flex items-center gap-3">
          <svg className="w-6 h-6 text-[#dc3545] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[14px] text-[#dc3545] flex-1">{errorMessage}</p>
        </div>
      )}

      {/* Start Scanning Button - only show when not successful */}
      {!scanSuccess && (
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
      )}
    </div>
  )
}
