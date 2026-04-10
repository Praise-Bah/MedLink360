import { AppShell } from "@/components/layout/app-shell"
import { StaffManagement } from "@/components/hospital-admin/staff-management"

export default function StaffPage() {
  return (
    <AppShell>
      <StaffManagement />
    </AppShell>
  )
}
