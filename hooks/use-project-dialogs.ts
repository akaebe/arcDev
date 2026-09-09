"use client";

import { useState } from "react";

import { MOCK_PROJECTS } from "@/lib/mock-projects";
import { slugify } from "@/lib/slugify";
import type { Project } from "@/types/project";

export type ProjectDialogType = "create" | "rename" | "delete" | null;

export interface UseProjectDialogsReturn {
  projects: Project[];
  ownedProjects: Project[];
  sharedProjects: Project[];
  dialogType: ProjectDialogType;
  selectedProject: Project | null;
  projectName: string;
  setProjectName: (name: string) => void;
  slugPreview: string;
  isLoading: boolean;
  openCreate: () => void;
  openRename: (project: Project) => void;
  openDelete: (project: Project) => void;
  closeDialog: () => void;
  submitCreate: () => void;
  submitRename: () => void;
  submitDelete: () => void;
}

export function useProjectDialogs(): UseProjectDialogsReturn {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [dialogType, setDialogType] = useState<ProjectDialogType>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const slugPreview = slugify(projectName);
  const ownedProjects = projects.filter((project) => project.owned);
  const sharedProjects = projects.filter((project) => !project.owned);

  function resetForm() {
    setProjectName("");
    setSelectedProject(null);
    setIsLoading(false);
  }

  function closeDialog() {
    setDialogType(null);
    resetForm();
  }

  function openCreate() {
    setSelectedProject(null);
    setProjectName("");
    setIsLoading(false);
    setDialogType("create");
  }

  function openRename(project: Project) {
    setSelectedProject(project);
    setProjectName(project.name);
    setIsLoading(false);
    setDialogType("rename");
  }

  function openDelete(project: Project) {
    setSelectedProject(project);
    setProjectName("");
    setIsLoading(false);
    setDialogType("delete");
  }

  function submitCreate() {
    const name = projectName.trim();
    if (!name || isLoading) return;

    setIsLoading(true);
    const slug = slugify(name) || "project";
    setProjects((current) => [
      {
        id: `proj_${Date.now()}`,
        name,
        slug,
        owned: true,
      },
      ...current,
    ]);
    setIsLoading(false);
    setDialogType(null);
    resetForm();
  }

  function submitRename() {
    const name = projectName.trim();
    if (!name || !selectedProject || isLoading) return;

    setIsLoading(true);
    const slug = slugify(name) || selectedProject.slug;
    const projectId = selectedProject.id;
    setProjects((current) =>
      current.map((project) =>
        project.id === projectId ? { ...project, name, slug } : project,
      ),
    );
    setIsLoading(false);
    setDialogType(null);
    resetForm();
  }

  function submitDelete() {
    if (!selectedProject || isLoading) return;

    setIsLoading(true);
    const projectId = selectedProject.id;
    setProjects((current) =>
      current.filter((project) => project.id !== projectId),
    );
    setIsLoading(false);
    setDialogType(null);
    resetForm();
  }

  return {
    projects,
    ownedProjects,
    sharedProjects,
    dialogType,
    selectedProject,
    projectName,
    setProjectName,
    slugPreview,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    submitCreate,
    submitRename,
    submitDelete,
  };
}
