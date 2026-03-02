"use client"

import { useState, type FormEvent, useRef } from "react"
import { useRouter } from "next/navigation"

export function EmailOtpVerificationForm() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", ""])
  const [timer, setTimer] = useState(45)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("OTP submitted:", otp.join(""))
    router.push("/dashboard")
  }

  const handleResend = () => {
    console.log("Resend OTP")
    setTimer(45)
  }

  return (
    <div className="min-h-screen bg-[#f2f8ff] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[872px] rounded-[23px] border border-[#e7e8eb] bg-white px-12 py-28 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="mx-auto w-full max-w-[523px]">
          <div className="flex flex-col items-center gap-8 rounded-[20px] bg-white p-10 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <div className="flex h-[85px] w-[186px] items-center justify-center">
              <img src="/auth/medlink360-logo.png" alt="MedLink360" className="h-full w-auto" />
            </div>

            <div className="w-full rounded-[20px] p-10 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col items-center gap-5 text-center">
                <div>
                  <h1 className="text-[20px] font-bold text-[#212529]">
                    Email OTP Verification
                  </h1>
                  <p className="mt-1 text-[14px] text-[#6c7688] opacity-70">
                    We sent a code to sarahjohnson@gmail.com
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full space-y-5">
                  <div className="flex justify-center gap-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={`h-[60px] w-[60px] rounded-[5px] border ${
                          index === 0 ? "border-[#007bff]" : "border-[#e7e8eb]"
                        } text-center text-[20px] font-semibold focus:border-[#007bff] focus:outline-none`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[14px]">
                    <div className="flex items-center gap-1">
                      <span className="text-[#6c7688]">Didn&apos;t receive code.</span>
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-[#007bff] underline"
                      >
                        Resend Code
                      </button>
                    </div>
                    <span className="text-[#ef1e1e]">
                      00:{timer.toString().padStart(2, "0")}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="h-[38px] w-full rounded-md bg-[#007bff] px-3 py-2 text-[14px] font-medium text-white"
                  >
                    Verify & Proceed
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
