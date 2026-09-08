# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Editor chrome complete; waiting for the next feature spec.

## Current Goal

- Editor navbar, floating project sidebar, and dialog pattern from `context/feature-specs/02-editor.md` are in place.

## Completed

- Next.js boilerplate stripped to a minimal home page.
- `context/feature-specs/01-design-system.md` — shadcn/ui, listed primitives, `cn()`, lucide-react, dark theme tokens in `globals.css`.
- `context/feature-specs/02-editor.md`:
  - `components/editor/editor-navbar.tsx` — fixed-height top bar, left/center/right, sidebar toggle with `PanelLeftOpen` / `PanelLeftClose`, empty right section, dark background and bottom border.
  - `components/editor/project-sidebar.tsx` — overlay sidebar that does not push content, slides in from the left, `isOpen`, Projects header + close, My Projects / Shared tabs with empty placeholders, full-width New Project button with `Plus`.
  - `components/editor/editor-dialog.tsx` — reusable dialog shell (title, description, footer actions) using `globals.css` tokens. No feature dialogs yet.
  - `components/editor/editor-chrome.tsx` — workspace frame that owns sidebar open state and composes navbar + overlay sidebar.

## In Progress

- None yet.

## Next Up

- Next feature unit after editor chrome.

## Open Questions

- None. New Project has no click behavior in this unit (dialogs are deferred).

## Architecture Decisions

- shadcn/ui primitives live in `components/ui/` and must not be edited after generation.
- Theme tokens live in `globals.css` and map to Tailwind via `@theme inline`.
- Dark-only theme: `:root` and `.dark` share the same token values. No light palette.
- shadcn semantic CSS variables (`--background`, `--primary`, etc.) map onto the app tokens so generated primitives pick up the dark theme without editing `components/ui/*`.
- `cn()` is provided by the `cn` package and re-exported from `lib/utils.ts`.
- Editor sidebar is an overlay, not a layout column — opening it must not shift the canvas.
- Dialog styling for app dialogs is applied in `components/editor/editor-dialog.tsx`, not by editing `components/ui/dialog.tsx`.

## Session Notes

- Installed shadcn with Radix + Nova (Lucide / Geist).
- Added Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea via the CLI.
- lucide-react is installed.
- Do not modify generated `components/ui/*` files.
- Feature spec: `context/feature-specs/02-editor.md`.
- Typecheck and eslint passed for the new editor components.
