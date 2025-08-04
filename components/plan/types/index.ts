export interface Country {
  id: string;
  name: string;
  flag: string;
  difficulty: "Easy" | "Medium" | "Hard";
  avgTime: string;
}

export interface VisaType {
  id: string;
  name: string;
  description: string;
}

export interface PlanTask {
  id: number;
  text: string;
  completed: boolean;
  estimatedDays: number;
  category:
    | "research"
    | "documents"
    | "medical"
    | "appointment"
    | "preparation"
    | "submission"
    | "waiting"
    | "travel";
}

export interface RequiredDocument {
  name: string;
  required: boolean;
  status: "pending" | "completed" | "missing";
}

export interface PlanStatus {
  status: "not-started" | "in-progress" | "completed";
  startDate: Date | null;
}

export interface PlanProgress {
  completedTasks: number;
  totalTasks: number;
  progressPercentage: number;
  completedDocuments: number;
  requiredDocumentsCount: number;
  documentsProgressPercentage: number;
  estimatedTotalDays: number;
  completedDays: number;
  remainingDays: number;
}
