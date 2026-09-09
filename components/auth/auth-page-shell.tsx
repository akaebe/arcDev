import { BrainCircuit, ScrollText, Share2, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface AuthPageShellProps {
  children: ReactNode;
}

interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FEATURES: FeatureItem[] = [
  {
    title: "AI Architecture Generation",
    description:
      "Describe your system, AI maps it to nodes and edges on a live canvas.",
    icon: BrainCircuit,
  },
  {
    title: "Real-time Collaboration",
    description:
      "Live cursors, presence indicators, and shared node editing across your team.",
    icon: Share2,
  },
  {
    title: "Instant Spec Generation",
    description:
      "Export a complete Markdown technical spec directly from the canvas graph.",
    icon: ScrollText,
  },
];

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <div className="grid min-h-full flex-1 bg-base font-sans lg:grid-cols-2">
      <aside className="relative hidden min-h-full flex-col justify-center border-r border-surface-border lg:flex">
        <div className="absolute inset-0 bg-elevated" />
        <div className="absolute inset-0 bg-accent-dim" />
        <div className="relative max-w-xl px-12 xl:px-16">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-copy-primary">
            Design systems at the speed of thought.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-copy-muted">
            Describe your architecture in plain English. Arc Dev maps it to a
            shared canvas your whole team can refine in real time.
          </p>
          <ul className="mt-12 space-y-8">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={feature.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-dim">
                    <Icon className="h-5 w-5 text-brand" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-sm font-semibold text-copy-primary">
                      {feature.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-copy-muted">
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      <div className="flex min-h-full items-center justify-center bg-base px-4 py-8">
        {children}
      </div>
    </div>
  );
}
