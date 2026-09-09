"use client";

import { useEffect, useRef, type FormEvent } from "react";

import { EditorDialog } from "@/components/editor/editor-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UseProjectDialogsReturn } from "@/hooks/use-project-dialogs";

type ProjectDialogsProps = Pick<
  UseProjectDialogsReturn,
  | "dialogType"
  | "selectedProject"
  | "projectName"
  | "setProjectName"
  | "slugPreview"
  | "isLoading"
  | "closeDialog"
  | "submitCreate"
  | "submitRename"
  | "submitDelete"
>;

export function ProjectDialogs({
  dialogType,
  selectedProject,
  projectName,
  setProjectName,
  slugPreview,
  isLoading,
  closeDialog,
  submitCreate,
  submitRename,
  submitDelete,
}: ProjectDialogsProps) {
  return (
    <>
      <CreateProjectDialog
        open={dialogType === "create"}
        projectName={projectName}
        setProjectName={setProjectName}
        slugPreview={slugPreview}
        isLoading={isLoading}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        onSubmit={submitCreate}
      />
      <RenameProjectDialog
        open={dialogType === "rename"}
        projectName={projectName}
        setProjectName={setProjectName}
        currentName={selectedProject?.name ?? ""}
        isLoading={isLoading}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        onSubmit={submitRename}
      />
      <DeleteProjectDialog
        open={dialogType === "delete"}
        projectName={selectedProject?.name ?? ""}
        isLoading={isLoading}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        onConfirm={submitDelete}
      />
    </>
  );
}

interface CreateProjectDialogProps {
  open: boolean;
  projectName: string;
  setProjectName: (name: string) => void;
  slugPreview: string;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

function CreateProjectDialog({
  open,
  projectName,
  setProjectName,
  slugPreview,
  isLoading,
  onOpenChange,
  onSubmit,
}: CreateProjectDialogProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <EditorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Project"
      description="Give your architecture workspace a name."
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-project-form"
            disabled={isLoading || !projectName.trim()}
          >
            Create
          </Button>
        </>
      }
    >
      <form id="create-project-form" className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label
            htmlFor="create-project-name"
            className="text-sm text-copy-secondary"
          >
            Project name
          </label>
          <Input
            id="create-project-name"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            placeholder="Payment Platform"
            autoFocus
            disabled={isLoading}
          />
        </div>
        <p className="text-sm text-copy-muted">
          Slug:{" "}
          <span className="font-mono text-copy-secondary">
            {slugPreview || "—"}
          </span>
        </p>
      </form>
    </EditorDialog>
  );
}

interface RenameProjectDialogProps {
  open: boolean;
  projectName: string;
  setProjectName: (name: string) => void;
  currentName: string;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

function RenameProjectDialog({
  open,
  projectName,
  setProjectName,
  currentName,
  isLoading,
  onOpenChange,
  onSubmit,
}: RenameProjectDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <EditorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Rename Project"
      description={`Current name: ${currentName}`}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="rename-project-form"
            disabled={isLoading || !projectName.trim()}
          >
            Rename
          </Button>
        </>
      }
    >
      <form id="rename-project-form" className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label
            htmlFor="rename-project-name"
            className="text-sm text-copy-secondary"
          >
            Project name
          </label>
          <Input
            ref={inputRef}
            id="rename-project-name"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            disabled={isLoading}
          />
        </div>
      </form>
    </EditorDialog>
  );
}

interface DeleteProjectDialogProps {
  open: boolean;
  projectName: string;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

function DeleteProjectDialog({
  open,
  projectName,
  isLoading,
  onOpenChange,
  onConfirm,
}: DeleteProjectDialogProps) {
  return (
    <EditorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Project"
      description={`Delete “${projectName}”? This cannot be undone.`}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isLoading}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </>
      }
    />
  );
}
