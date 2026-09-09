"use client";

import { Folder, Pencil, Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  ownedProjects: Project[];
  sharedProjects: Project[];
  onNewProject: () => void;
  onRenameProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

function EmptyPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
      <Folder className="h-8 w-8 text-copy-faint" />
      <p className="text-sm text-copy-muted">{label}</p>
    </div>
  );
}

interface ProjectListProps {
  projects: Project[];
  emptyLabel: string;
  showActions: boolean;
  onRenameProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

function ProjectList({
  projects,
  emptyLabel,
  showActions,
  onRenameProject,
  onDeleteProject,
}: ProjectListProps) {
  if (projects.length === 0) {
    return <EmptyPlaceholder label={emptyLabel} />;
  }

  return (
    <ScrollArea className="h-full">
      <ul className="flex flex-col gap-1 pr-2">
        {projects.map((project) => (
          <li key={project.id}>
            <div className="group flex items-center gap-1 rounded-xl px-2 py-1.5 hover:bg-subtle/60">
              <button
                type="button"
                className="min-w-0 flex-1 truncate text-left text-sm text-copy-primary"
              >
                {project.name}
              </button>
              {showActions && project.owned ? (
                <div className="flex shrink-0 items-center gap-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Rename ${project.name}`}
                    onClick={() => onRenameProject(project)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Delete ${project.name}`}
                    onClick={() => onDeleteProject(project)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}

export function ProjectSidebar({
  isOpen,
  onClose,
  ownedProjects,
  sharedProjects,
  onNewProject,
  onRenameProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  return (
    <aside
      aria-hidden={!isOpen}
      className={cn(
        "absolute top-3 bottom-3 left-3 z-20 flex w-72 flex-col rounded-2xl border border-surface-border bg-surface/80 shadow-lg backdrop-blur-md transition-transform duration-200 ease-out",
        isOpen
          ? "pointer-events-auto translate-x-0"
          : "pointer-events-none -translate-x-[calc(100%+0.75rem)]",
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-surface-border px-3 py-2">
        <h2 className="text-sm font-medium text-copy-primary">Projects</h2>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Close sidebar"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        defaultValue="my-projects"
        className="flex min-h-0 flex-1 flex-col gap-0 p-3"
      >
        <TabsList className="w-full">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        <TabsContent value="my-projects" className="mt-3 min-h-0 flex-1">
          <ProjectList
            projects={ownedProjects}
            emptyLabel="No projects yet"
            showActions
            onRenameProject={onRenameProject}
            onDeleteProject={onDeleteProject}
          />
        </TabsContent>
        <TabsContent value="shared" className="mt-3 min-h-0 flex-1">
          <ProjectList
            projects={sharedProjects}
            emptyLabel="No shared projects"
            showActions={false}
            onRenameProject={onRenameProject}
            onDeleteProject={onDeleteProject}
          />
        </TabsContent>
      </Tabs>

      <div className="border-t border-surface-border p-3">
        <Button type="button" className="w-full" onClick={onNewProject}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  );
}
