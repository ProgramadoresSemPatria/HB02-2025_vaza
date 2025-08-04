import { createClient } from '@/utils/supabase/client'
import type { User } from '@supabase/supabase-js'

export interface SignUpPayload {
  fullName: string
  email: string
  password: string
}

export interface SignInPayload {
  email: string
  password: string
}

export async function signUpUser({
  fullName,
  email,
  password,
}: SignUpPayload): Promise<User> {
  const supabase = await createClient()
  // 1) sign up at the auth layer
  const { data: { user }, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  })

  if (signUpError) throw signUpError

  return user!
}

export async function signInUser({
  email,
  password,
}: SignInPayload): Promise<User> {
  const supabase = await createClient()
  const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) throw signInError

  return user!
}

export async function signOutUser(): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}