'use client'
import { useRouter } from 'next/navigation'
import { getUser } from '@/hooks/getUser'
import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const user = getUser()

  if (!user) {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}