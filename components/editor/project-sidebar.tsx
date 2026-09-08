"use client";

import { Folder, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function EmptyPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
      <Folder className="h-8 w-8 text-copy-faint" />
      <p className="text-sm text-copy-muted">{label}</p>
    </div>
  );
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
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

      <Tabs defaultValue="my-projects" className="flex min-h-0 flex-1 flex-col gap-0 p-3">
        <TabsList className="w-full">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        <TabsContent value="my-projects" className="mt-3 min-h-0">
          <EmptyPlaceholder label="No projects yet" />
        </TabsContent>
        <TabsContent value="shared" className="mt-3 min-h-0">
          <EmptyPlaceholder label="No shared projects" />
        </TabsContent>
      </Tabs>

      <div className="border-t border-surface-border p-3">
        <Button type="button" className="w-full">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  );
}
