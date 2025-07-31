"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckIcon } from "lucide-react";
import { RequiredDocument } from "./types";

interface RequiredDocumentsProps {
  documents: RequiredDocument[];
  onToggleDocument: (index: number) => void;
}

export function RequiredDocuments({
  documents,
  onToggleDocument,
}: RequiredDocumentsProps) {
  const completedDocuments = documents.filter(
    (doc) => doc.status === "completed"
  ).length;
  const requiredDocumentsCount = documents.filter((doc) => doc.required).length;
  const documentsProgressPercentage =
    (completedDocuments / requiredDocumentsCount) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Required Documents</CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>
              {completedDocuments}/{requiredDocumentsCount}
            </span>
            <span>•</span>
            <span>{Math.round(documentsProgressPercentage)}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ${
                doc.status === "completed"
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Checkbox
                checked={doc.status === "completed"}
                onCheckedChange={() => onToggleDocument(index)}
                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      doc.status === "completed"
                        ? "text-green-700 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {doc.name}
                  </span>
                  {!doc.required && (
                    <Badge variant="outline" className="text-xs">
                      Optional
                    </Badge>
                  )}
                </div>
                {doc.status === "completed" && (
                  <div className="text-xs text-green-600 mt-1">
                    ✓ Document obtained
                  </div>
                )}
              </div>
              <Badge
                variant={
                  doc.status === "completed"
                    ? "default"
                    : doc.status === "pending"
                    ? "secondary"
                    : "destructive"
                }
                className="text-xs"
              >
                {doc.status}
              </Badge>
              {doc.status === "completed" && (
                <CheckIcon className="h-4 w-4 text-green-600" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
