import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

export const getUser = async (): Promise<User | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw error
  }
  
  return data.user
}
