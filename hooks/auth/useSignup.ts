import { useMutation } from '@tanstack/react-query'
import { signUpUser, signInUser, type SignUpPayload } from '@/services/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface UseSignupOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  autoSignIn?: boolean
}

export function useSignup(options: UseSignupOptions = {}) {
  const router = useRouter()
  const { onSuccess, onError, autoSignIn = true } = options

  return useMutation({
    mutationFn: async (data: SignUpPayload) => {
      const user = await signUpUser(data)

      // Auto sign-in after successful signup if enabled
      if (autoSignIn) {
        try {
          await signInUser({ email: data.email, password: data.password })
          return { user, signedIn: true }
        } catch (signInError) {
          // Signup was successful, but auto sign-in failed
          return { user, signedIn: false, signInError }
        }
      }

      return { user, signedIn: false }
    },
    onSuccess: (result) => {
      toast.success('Account created successfully')

      if (result.signedIn) {
        router.push('/dashboard/profile')
      } else if (result.signInError) {
        router.push('/login')
      }

      onSuccess?.()
    },
    onError: (error: Error) => {
      toast.error('Failed to create account')
      onError?.(error)
    },
  })
}