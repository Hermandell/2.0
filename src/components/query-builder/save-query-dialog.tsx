"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SaveQueryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  queryName: string;
}

export function SaveQueryDialog({ open, onOpenChange, onConfirm, queryName }: SaveQueryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Query</DialogTitle>
          <DialogDescription>
            Are you sure you want to save the query `&quot;`{queryName}`&quot;`?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Save Query
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}