# Contributing to cap-js-plugin-template

Thank you for your interest in contributing!

## Getting Started

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Run tests: `npm test`

## Development Workflow

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make your changes in `src/`
3. Build: `npm run build`
4. Run tests: `npm test`
5. Run linting: `npm run lint`
6. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add new feature` (minor version bump)
   - `fix: fix a bug` (patch version bump)
   - `docs: update documentation`
   - `test: add tests`
   - `chore: tooling changes`
7. Push and open a pull request

## Code Style

- ESLint and Prettier are configured — run `npm run lint` and `npm run format`
- Use `cds.log('plugin')` for logging (never `console.log`)
- Source code is TypeScript in `src/`

## Testing

- Unit tests go in `test/plugin.test.ts`
- Test CAP app lives in `test/app/`
- Run with `npm test`

## Releasing

Releases are automated via semantic-release on the `main` branch. Commit messages determine the version bump — no manual version changes needed.
