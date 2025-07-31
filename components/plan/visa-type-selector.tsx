"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { VisaType } from "./types";

interface VisaTypeSelectorProps {
  visaTypes: VisaType[];
  selectedVisaType: VisaType;
  onVisaTypeChange: (visaType: VisaType) => void;
}

export function VisaTypeSelector({
  visaTypes,
  selectedVisaType,
  onVisaTypeChange,
}: VisaTypeSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Visa Type</CardTitle>
      </CardHeader>
      <CardContent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-left font-normal"
            >
              <div className="text-left">
                <div className="font-medium">{selectedVisaType.name}</div>
                <div className="text-sm text-gray-500">
                  {selectedVisaType.description}
                </div>
              </div>
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[350px]">
            {visaTypes.map((visa) => (
              <DropdownMenuItem
                key={visa.id}
                onClick={() => onVisaTypeChange(visa)}
                className="flex flex-col items-start gap-1 cursor-pointer p-3"
              >
                <div className="font-medium">{visa.name}</div>
                <div className="text-sm text-gray-500">{visa.description}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
