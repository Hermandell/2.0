"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ViewSelectorProps {
  selectedView: string;
  onViewChange: (view: string) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function ViewSelector({ 
  selectedView,
  onViewChange, 
  onRefresh, 
  isLoading = false,
}: ViewSelectorProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <Select onValueChange={onViewChange} value={selectedView}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select view" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tasks">Tasks</SelectItem>
          <SelectItem value="users">Users</SelectItem>
          <SelectItem value="events">Events</SelectItem>
        </SelectContent>
      </Select>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onRefresh} 
        disabled={isLoading}
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
}