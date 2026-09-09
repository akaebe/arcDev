"use client";

import { useState, type ReactNode } from "react";

import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectDialogActionsProvider } from "@/components/editor/project-dialog-actions";
import { ProjectDialogs } from "@/components/editor/project-dialogs";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";
import { cn } from "@/lib/utils";

interface EditorChromeProps {
  children?: ReactNode;
}

export function EditorChrome({ children }: EditorChromeProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dialogs = useProjectDialogs();

  return (
    <ProjectDialogActionsProvider openCreate={dialogs.openCreate}>
      <div className="flex min-h-0 flex-1 flex-col bg-base">
        <EditorNavbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
        />
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {isSidebarOpen ? (
            <button
              type="button"
              aria-label="Close sidebar"
              className={cn("absolute inset-0 z-10 bg-black/50 md:hidden")}
              onClick={() => setIsSidebarOpen(false)}
            />
          ) : null}
          <ProjectSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            ownedProjects={dialogs.ownedProjects}
            sharedProjects={dialogs.sharedProjects}
            onNewProject={dialogs.openCreate}
            onRenameProject={dialogs.openRename}
            onDeleteProject={dialogs.openDelete}
          />
          {children}
          <ProjectDialogs
            dialogType={dialogs.dialogType}
            selectedProject={dialogs.selectedProject}
            projectName={dialogs.projectName}
            setProjectName={dialogs.setProjectName}
            slugPreview={dialogs.slugPreview}
            isLoading={dialogs.isLoading}
            closeDialog={dialogs.closeDialog}
            submitCreate={dialogs.submitCreate}
            submitRename={dialogs.submitRename}
            submitDelete={dialogs.submitDelete}
          />
        </div>
      </div>
    </ProjectDialogActionsProvider>
  );
}
