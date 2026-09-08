# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Design system and UI primitives

## Current Goal

- Design system install is complete; wait for the next feature spec.

## Completed

- Next.js boilerplate stripped to a minimal home page.
- `context/feature-specs/01-design-system.md` — shadcn/ui, listed primitives, `cn()`, lucide-react, dark theme tokens in `globals.css`.

## In Progress

- None yet.

## Next Up

- Next feature unit after the design system.

## Open Questions

- None.

## Architecture Decisions

- shadcn/ui primitives live in `components/ui/` and must not be edited after generation.
- Theme tokens live in `globals.css` and map to Tailwind via `@theme inline`.
- Dark-only theme: `:root` and `.dark` share the same token values. No light palette.
- shadcn semantic CSS variables (`--background`, `--primary`, etc.) map onto the app tokens so generated primitives pick up the dark theme without editing `components/ui/*`.
- `cn()` is provided by the `cn` package and re-exported from `lib/utils.ts`.

## Session Notes

- Installed shadcn with Radix + Nova (Lucide / Geist).
- Added Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea via the CLI.
- lucide-react is installed.
- Do not modify generated `components/ui/*` files.
