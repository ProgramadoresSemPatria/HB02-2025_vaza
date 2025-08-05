import { createClient } from '@/utils/supabase/client'

// Simple auth functions - no complex interfaces or abstractions
export async function signUp(fullName: string, email: string, password: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  })

  if (error) throw error
  return data.user
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data.user
}

export async function signOutUser() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}