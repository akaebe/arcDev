import { dark } from "@clerk/ui/themes";

export const clerkAppearance = {
  theme: dark,
  variables: {
    colorPrimary: "var(--accent-primary)",
    colorDanger: "var(--state-error)",
    colorSuccess: "var(--state-success)",
    colorWarning: "var(--state-warning)",
    colorNeutral: "var(--text-muted)",
    colorForeground: "var(--text-primary)",
    colorPrimaryForeground: "var(--bg-base)",
    colorMutedForeground: "var(--text-muted)",
    colorMuted: "var(--bg-subtle)",
    colorBackground: "var(--bg-surface)",
    colorInputForeground: "var(--text-primary)",
    colorInput: "var(--bg-elevated)",
    colorRing: "var(--accent-primary)",
    colorBorder: "var(--border-default)",
    colorModalBackdrop: "var(--bg-base)",
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    fontFamilyButtons: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    fontFamilyMono: "var(--font-geist-mono), ui-monospace, monospace",
    borderRadius: "var(--radius)",
  },
};
