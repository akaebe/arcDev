import type { Project } from "@/types/project";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj_owned_1",
    name: "Payment Platform",
    slug: "payment-platform",
    owned: true,
  },
  {
    id: "proj_owned_2",
    name: "Auth Service",
    slug: "auth-service",
    owned: true,
  },
  {
    id: "proj_shared_1",
    name: "Design System",
    slug: "design-system",
    owned: false,
  },
  {
    id: "proj_shared_2",
    name: "Event Bus",
    slug: "event-bus",
    owned: false,
  },
];
