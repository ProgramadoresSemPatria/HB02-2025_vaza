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
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Required Documents
          </CardTitle>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="font-medium">
              {completedDocuments}/{requiredDocumentsCount}
            </span>
            <span>•</span>
            <span className="font-semibold">
              {Math.round(documentsProgressPercentage)}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 ${
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
                <div className="flex items-center gap-3 mb-2">
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
                  <div className="text-xs text-green-600 font-medium">
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
                <CheckIcon className="h-5 w-5 text-green-600" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
