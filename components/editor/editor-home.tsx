"use client";

import { Plus } from "lucide-react";

import { useProjectDialogActions } from "@/components/editor/project-dialog-actions";
import { Button } from "@/components/ui/button";

export function EditorHome() {
  const { openCreate } = useProjectDialogActions();

  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-medium tracking-tight text-copy-primary">
          Create a project or open an existing one
        </h1>
        <p className="text-sm text-copy-muted">
          Start a new architecture workspace, or choose a project from the
          sidebar.
        </p>
        <Button type="button" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  );
}
