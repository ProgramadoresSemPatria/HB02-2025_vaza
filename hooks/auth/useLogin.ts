import { useMutation } from '@tanstack/react-query'
import { signInUser, type SignInPayload } from '@/services/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface UseLoginOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useLogin(options: UseLoginOptions = {}) {
  const router = useRouter()
  const { onSuccess, onError } = options

  return useMutation({
    mutationFn: async (data: SignInPayload) => {
      const user = await signInUser(data)
      return { user }
    },
    onSuccess: (result) => {
      toast.success('Logged in successfully')
      router.push('/dashboard/profile')
      onSuccess?.()
    },
    onError: (error: Error) => {
      toast.error('Failed to log in')
      onError?.(error)
    },
  })
}