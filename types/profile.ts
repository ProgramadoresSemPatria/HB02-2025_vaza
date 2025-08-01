export interface UserProfile {
  user_id: string;
  full_name?: string;
  country?: string;
  job_title?: string;
  age?: number;
  degree?: string;
  institution?: string;
  citizenships?: string[];
  marital_status?: string;
  children?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}
