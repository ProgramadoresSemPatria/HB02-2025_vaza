import { PlanDetailClient } from "./client";

interface PlanDetailPageProps { 
  params: {
    id: string;
  };
}

export default function PlanDetailPage({ params }: PlanDetailPageProps) {
  return <PlanDetailClient id={params.id} />;
}
