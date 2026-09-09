"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

import { clerkAppearance } from "@/lib/clerk-appearance";

interface AppClerkProviderProps {
  children: ReactNode;
}

export function AppClerkProvider({ children }: AppClerkProviderProps) {
  return <ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider>;
}
