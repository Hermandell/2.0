"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TakeTaskForm } from "@/components/forms/take-task-form";
import { TakeTaskFormData } from "@/components/forms/take-task-form/schema";

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
      date: data.date.toISOString(),
      time: {
        hours: String(data.hours).padStart(2, '0'),
        minutes: String(data.minutes).padStart(2, '0'),
        seconds: String(data.seconds).padStart(2, '0'),
      },
      assignee: data.assignee,
      notes: data.notes,
    };

    // Log the formatted data
    console.log('Task Take Form Submission:');
    console.log('------------------------');
    console.log('Task ID:', formattedData.taskId);
    console.log('Task Title:', formattedData.taskTitle);
    console.log('Date:', new Date(formattedData.date).toLocaleDateString());
    console.log('Time:', `${formattedData.time.hours}:${formattedData.time.minutes}:${formattedData.time.seconds}`);
    console.log('Assignee:', formattedData.assignee);
    console.log('Notes:', formattedData.notes);
    console.log('------------------------');
    console.log('Raw form data:', data);

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