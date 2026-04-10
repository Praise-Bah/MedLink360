"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const QUOTE_TEXT = "Verification keeps your care team trusted and protected."
const QUOTE_AUTHOR = "MedLink360 Team"
const DEFAULT_HELPER = "PDF, JPG, or PNG up to 10MB."

type DocumentRequirement = {
  id: string
  title: string
  description: string
  optional?: boolean
  helper?: string
  accept?: string
  multiple?: boolean
}

type VerificationUploadFormProps = {
  title: string
  subtitle: string
  roleLabel: string
  backHref: string
  primaryActionLabel?: string
  skipHref?: string
  documents: DocumentRequirement[]
}

export function VerificationUploadForm({
  title,
  subtitle,
  roleLabel,
  backHref,
  primaryActionLabel = "Submit for verification",
  skipHref = "/dashboard",
  documents,
}: VerificationUploadFormProps) {
  const router = useRouter()
  const [uploads, setUploads] = useState<Record<string, string>>({})

  const handleFileChange = (id: string, files: FileList | null) => {
    if (!files?.length) {
      setUploads((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      return
    }

    const fileNames = Array.from(files)
      .map((file) => file.name)
      .join(", ")

    setUploads((prev) => ({
      ...prev,
      [id]: fileNames,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // TODO: Wire to verification upload API
    console.log("Verification upload submitted", { roleLabel, uploads })
    router.push("/account-created")
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)] px-6 py-10">
      <div className="mx-auto grid w-full max-w-[1280px] items-stretch gap-6 lg:grid-cols-[minmax(0,754px)_minmax(0,523px)]">
        <div className="relative order-2 overflow-hidden rounded-[27px] lg:order-1">
          <img
            src="/auth/register-hero.png"
            alt="Healthcare professionals"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <Link
            href={backHref}
            className="absolute left-6 top-6 inline-flex items-center gap-2 text-white/90"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-lg font-medium">Back</span>
          </Link>
          <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 bg-gradient-to-b from-white/10 to-sky-300/20 px-5 py-4 backdrop-blur-sm">
            <p className="text-2xl italic leading-snug text-white">
              {QUOTE_TEXT} "- <span className="font-semibold">{QUOTE_AUTHOR}</span>"
            </p>
          </div>
        </div>

        <div className="order-1 flex items-center justify-center lg:order-2">
          <div className="w-full max-w-[523px] rounded-[23px] border border-[color:var(--border-light)] bg-white p-10 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-[color:var(--background)] px-3 py-1 text-[13px] text-[color:var(--grey-500)]">
                {roleLabel}
              </div>
              <h1 className="mt-4 text-[23px] font-bold text-[color:var(--foreground)]">
                {title}
              </h1>
              <p className="mt-2 text-[16px] text-[color:var(--grey-500)]">
                {subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="rounded-[12px] border border-[color:var(--border-light)] bg-[color:var(--background)]/50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[15px] font-semibold text-[color:var(--foreground)]">
                        {document.title}
                      </p>
                      <p className="mt-1 text-[13px] text-[color:var(--grey-500)]">
                        {document.description}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                        document.optional
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {document.optional ? "Optional" : "Required"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <input
                      type="file"
                      onChange={(event) => handleFileChange(document.id, event.target.files)}
                      accept={document.accept ?? "application/pdf,image/*"}
                      multiple={document.multiple}
                      className="block w-full text-[14px] text-[color:var(--foreground)] file:mr-3 file:rounded-[7px] file:border-0 file:bg-[color:var(--brand-primary)]/10 file:px-3 file:py-2 file:text-[13px] file:font-medium file:text-[color:var(--brand-primary)]"
                    />
                  </div>
                  <p className="mt-2 text-[12px] text-[color:var(--grey-500)]">
                    {uploads[document.id]
                      ? `Selected: ${uploads[document.id]}`
                      : document.helper ?? DEFAULT_HELPER}
                  </p>
                </div>
              ))}

              <button
                type="submit"
                className="h-11 w-full rounded-[7px] bg-[color:var(--brand-primary)] text-[16px] font-medium text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                {primaryActionLabel}
              </button>

              <Link
                href={skipHref}
                className="flex h-11 w-full items-center justify-center rounded-[7px] border border-[color:var(--border-light)] bg-white text-[16px] font-medium text-[color:var(--foreground)]"
              >
                Skip for now
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
