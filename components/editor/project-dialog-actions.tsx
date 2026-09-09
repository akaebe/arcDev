"use client";

import { createContext, useContext, type ReactNode } from "react";

interface ProjectDialogActions {
  openCreate: () => void;
}

const ProjectDialogActionsContext =
  createContext<ProjectDialogActions | null>(null);

export function ProjectDialogActionsProvider({
  openCreate,
  children,
}: ProjectDialogActions & { children: ReactNode }) {
  return (
    <ProjectDialogActionsContext.Provider value={{ openCreate }}>
      {children}
    </ProjectDialogActionsContext.Provider>
  );
}

export function useProjectDialogActions(): ProjectDialogActions {
  const value = useContext(ProjectDialogActionsContext);
  if (!value) {
    throw new Error(
      "useProjectDialogActions must be used within ProjectDialogActionsProvider",
    );
  }
  return value;
}
