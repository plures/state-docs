
# statedoc (Deno + Node)

FSM documentation generator for XState projects. One ESM codebase. Runs on Deno or Node. Generates Markdown and Mermaid from machines and states.

## Quick start

Deno:
```sh
deno task gen
```

Node (after building with dnt):
```sh
deno run -A scripts/build_npm.ts
cd npm
npm install -g .
statedoc gen --config=.stateDoc.json
```

## Governance

This project uses Architectural Decision Records (ADRs) to document significant technical and architectural decisions. ADRs help us maintain a clear record of why we made certain choices and provide context for future development.

📖 **View all ADRs**: [docs/adr/README.md](docs/adr/README.md)

When making significant decisions about architecture, design patterns, technology choices, or processes, please document them as ADRs following our [ADR template](docs/adr/template.md).

## Publishing

The project includes an automated publishing pipeline that triggers when a new version tag is created.

### How to publish a new version:

1. Create and push a version tag (format: `v*.*.*`):
   ```sh
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. The GitHub Actions workflow will automatically:
   - Update version numbers in `deno.json` and `package.json.template`
   - Build the npm package
   - Publish to JSR (Deno registry)
   - Publish to npm
   - Create a GitHub release

### Required secrets:

Configure the following secret in the repository settings:
- `NPM_TOKEN`: npm authentication token for publishing
