export interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  job_title: string;
  age: number;
  degree: string;
  institution: string;
  city: string;
  country: string;
  citizenships: string[];
  marital_status: string;
  children: number;
  created_at: Date;
}

export type Step = {
  id: string;
  plan_id: string;
  order: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: Date;
}

export type Plan = {
  id: string;
  country_id: string;
  recommended_visa_type: string;
  visa_explanation: string;
  expected_timeline: string;
  timeline_explanation: string;
  expected_cost: string;
  cost_explanation: string;
}

export type Country = {
  id: string;
  profile_id: string;
  name: string;
  chat: [ // IMPORTANT: index 0 is the first ever message, index 1 is the second message, etc.
    {
      message: string;
      sender: "user" | "ai";
    }
  ]
  created_at: Date;
}