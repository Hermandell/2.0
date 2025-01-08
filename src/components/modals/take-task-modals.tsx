"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TakeTaskFormData } from "@/components/forms/take-task-form/schema";
import { TakeTaskForm } from "../forms/take-task-form/take-task-form";

interface TakeTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  taskTitle: string;
}

export function TakeTaskModal({
  isOpen,
  onClose,
  taskId,
  taskTitle,
}: TakeTaskModalProps) {
  const handleSubmit = async (data: TakeTaskFormData) => {
    // Format the time values for better readability
    const formattedData = {
      taskId,
      taskTitle,
      datetime: data.datetime.toISOString(),
      age: data.age,
      email: data.email,
      language: data.language,
      marketingEmails: data.marketingEmails,
      name: data.name,
      plan: data.plan,
      terms: data.terms
    };

    console.table(formattedData)
    // Log the formatted data
    console.log("Task Take Form Submission:");
    console.log("------------------------");
    console.log("Task ID:", formattedData.taskId);
    console.log("Task Title:", formattedData.taskTitle);
 

    // Here you would typically make an API call to save the data
    // await saveTaskAssignment(formattedData);

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Take Task: {taskId}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {taskTitle}
          </DialogDescription>
        </DialogHeader>
        <TakeTaskForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
