import Link from "next/link"

export function EntryCard() {
  return (
    <div className="min-h-screen bg-[color:var(--background)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full items-center justify-center">
        <div className="w-full max-w-[872px] rounded-[23px] border border-[color:var(--border-light)] bg-white px-12 py-20 text-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center gap-6">
            <img
              src="/auth/medlink360-logo.png"
              alt="MedLink360"
              className="h-[85px] w-auto"
            />
            <div>
              <h1 className="text-[23px] font-bold text-[color:var(--foreground)]">
                MEDLINK360 Platform
              </h1>
              <p className="mt-2 text-[16px] text-[rgba(33,37,41,0.78)]">
                Connecting patients, healthcare providers, and administrators in a
                unified digital ecosystem
              </p>
            </div>
            <div className="flex w-full max-w-[535px] flex-col gap-4">
              <Link
                href="/login"
                className="flex h-11 items-center justify-center rounded-[7px] bg-[color:var(--brand-primary)] text-[16px] font-medium text-[#f4f4f4] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                Sign In
              </Link>
              <Link
                href="/role-selection"
                className="flex h-11 items-center justify-center rounded-[7px] border border-[color:var(--border-light)] bg-white text-[16px] font-medium text-[color:var(--foreground)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                Sign Up
              </Link>
            </div>
            <div className="mt-6 pt-6 border-t border-[color:var(--border-light)]">
              <p className="text-[14px] text-[rgba(33,37,41,0.6)] mb-3">
                Are you a hospital administrator?
              </p>
              <Link
                href="/register-hospital"
                className="text-[14px] font-medium text-[color:var(--brand-primary)] hover:underline"
              >
                Register your hospital →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
