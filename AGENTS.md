# AGENTS

This repository is a VS Code extension for Flutter localization. The codebase follows a Functional Core / Imperative Shell design, so keep business rules in `src/core` and editor/runtime concerns in `src/features`, `src/infrastructure`, and `src/ui`.

## Project map

- [README.md](README.md): product overview, settings, and architecture summary
- [src/core/README.md](src/core/README.md): pure business logic and deterministic rules
- [src/features/README.md](src/features/README.md): command and editor orchestration
- [src/infrastructure/README.md](src/infrastructure/README.md): shared runtime adapters
- [src/ui/README.md](src/ui/README.md): prompt and picker UI boundary

## Working conventions

- Keep the functional core free of VS Code APIs and workspace access.
- Put file/editor integration, commands, and UI flows in the shell layer rather than in `src/core`.
- Prefer small, testable transformations over side-effect-heavy logic.
- When changing behavior, update or add tests in `src/test/suite` to prove the rule still holds.

## Validation commands

Run these from the repository root:

- `npm test` — Vitest suite
- `npm run check-lint` — Biome lint for `src`
- `npm run compile` — webpack build
- `npm run watch` — rebuild on file changes

## Common project patterns

- ARB parsing, sorting, and generation logic belongs in `src/core/arb`.
- Placeholder formatting rules live under `src/core/placeholders`.
- Extension commands and workspace access are coordinated in `src/features/extension`.
- UI actions are thin wrappers; they should delegate logic instead of owning business rules.

## Before finishing a change

- Confirm the affected boundary is respected (core vs shell).
- Check whether a focused test already exists or should be added.
- Prefer targeted validation over broad changes.

## Helpful references

- [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) if present in the project documentation set
- [docs/architecture-map.md](docs/architecture-map.md) for the architecture map
- [docs/reading-guide.md](docs/reading-guide.md) for role-based navigation
