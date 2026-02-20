"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

export function VerificationNurseForm() {
  const router = useRouter()
  const [files, setFiles] = useState({
    id: null as File | null,
    license: null as File | null,
    certifications: null as File | null,
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Nurse verification submitted", files)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#f2f8ff] px-6 py-10">
      <div className="mx-auto flex w-full max-w-[456px] flex-col gap-20 pt-2">
        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#007bff]" />
          <div className="h-0.5 w-10 bg-[#007bff]" />
          <div className="h-3 w-3 rounded-full bg-[#007bff]" />
          <div className="h-0.5 w-10 bg-[#e2e4e5]" />
          <div className="h-3 w-3 rounded-full bg-[#007bff]" />
          <div className="h-0.5 w-10 bg-[#e2e4e5]" />
          <div className="h-3 w-3 rounded-full bg-[#e2e4e5]" />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-[32px] font-bold leading-[36px] text-[#242731]">
              Profile info
            </h1>
            <p className="text-[16px] font-light leading-[22px] text-[#575f6e]">
              Fill in the data for profile. It will take a couple of minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="rounded-lg border border-[#e2e4e5] p-8">
              <div className="rounded-lg border border-[#e2e4e5] p-8 space-y-8">
                {/* ID Section */}
                <div className="space-y-2">
                  <h2 className="text-[20px] font-semibold leading-[28px] text-[#242731]">
                    Take Photo of Your ID
                  </h2>
                  <p className="text-[12px] font-light leading-4 text-[#575f6e]">
                    Take Photo of Your ID
                  </p>
                </div>

                <p className="text-[12px] font-light leading-4 text-[#575f6e]">
                  Please make sure there&apos;s enough lighting and that the ID lettering is clear before continuing.
                </p>

                {/* ID Upload Area */}
                <div className="relative flex h-[183px] w-full items-center justify-center rounded border-2 border-dashed border-[#212529]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-[77px] w-[77px] items-center justify-center rounded-full bg-gray-200">
                      <svg className="h-10 w-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="h-[14px] w-[212px] border-t-[1.6px] border-[#212529]" />
                      <div className="h-[14px] w-[136px] border-t-[1.6px] border-[#212529]" />
                      <div className="h-[14px] w-[105px] border-t-[1.6px] border-[#212529]" />
                      <div className="h-[6px] w-[105px] border-t-[1.6px] border-[#212529]" />
                      <div className="h-[6px] w-[105px] border-t-[1.6px] border-[#212529]" />
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFiles({...files, id: e.target.files?.[0] ?? null})}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>

                {/* Nursing License Upload */}
                <FileUploadSection
                  title="Upload Nursing License/Permit"
                  onChange={(file) => setFiles({...files, license: file})}
                />

                {/* Professional Certifications Upload */}
                <FileUploadSection
                  title="Upload Professional certifications"
                  onChange={(file) => setFiles({...files, certifications: file})}
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded border border-[#bbbfc1] bg-white px-8 text-[16px] font-medium capitalize text-[#242731]"
            >
              Go next
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function FileUploadSection({ title, onChange }: { title: string; onChange: (file: File | null) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-[14px] font-normal leading-5 text-[#242426]">
        {title}
      </label>
      <div className="relative flex h-[115px] items-center justify-center rounded border border-dashed border-[rgba(0,123,255,0.87)] bg-[#e1e7ef] px-28 py-3">
        <div className="flex flex-col items-center gap-1 text-center">
          <svg className="h-9 w-9 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-[6px] font-medium leading-[6px] text-[#212529]">
            Upload Medical Records Image
          </p>
          <p className="text-[5px] font-normal leading-[6px] text-[#212529]">
            Drag and drop an image file, or click to browse
          </p>
          <p className="text-[4px] font-normal leading-[6px] text-[#212529]">
            Supports JPG, PNG, GIF, and other image formats
          </p>
          <div className="mt-1 flex items-center gap-1 rounded bg-[#f4f4f4] px-2 py-1">
            <svg className="h-[6px] w-[6px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <span className="text-[5px] font-normal leading-[6px] text-[#212529]">Choose Files</span>
          </div>
        </div>
        <input
          type="file"
          accept="image/*,.pdf"
          multiple
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </div>
    </div>
  )
}
