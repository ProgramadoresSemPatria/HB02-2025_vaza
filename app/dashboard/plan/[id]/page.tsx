import { PlanDetailClient } from "./client";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PlanDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <PlanDetailClient id={id} />;
}
