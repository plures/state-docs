# GitHub Copilot Instructions for state-docs

## Project Overview

**state-docs** is a finite state machine (FSM) documentation generator for XState projects. It provides a unified ESM codebase that runs on both Deno and Node.js, generating Markdown documentation and Mermaid diagrams from machines and states.

### Key Features
- Dual-runtime support (Deno and Node.js)
- Generates Markdown documentation from FSM definitions
- Creates Mermaid state diagrams
- Configurable via `.stateDoc.json`
- Template-based output customization

## Tech Stack

### Primary Technologies
- **TypeScript**: Core language for all source files
- **Deno**: Primary runtime (v2.x)
- **Node.js**: Secondary runtime (via dnt compilation)
- **Eta**: Template engine for documentation generation
- **Mermaid**: State diagram visualization

### Dependencies
- `@std/fs`: File system operations (Deno)
- `@std/path`: Path utilities (Deno)
- `fast-glob`: File globbing (Node.js)
- `@deno/dnt`: Build tool for npm package generation

## Project Structure

```
.
├── .github/           # GitHub configuration
├── src/               # Source code
│   ├── generate.ts    # Main documentation generation logic
│   ├── tpl.ts         # Template rendering utilities
│   └── fsm/           # Example FSM files
├── scripts/           # Build scripts
│   └── build_npm.ts   # npm package builder
├── cli.ts             # Command-line interface
├── mod.ts             # Main module exports
├── runtime.ts         # Runtime adapters for Deno/Node
├── deno.json          # Deno configuration
└── .stateDoc.json     # Example configuration
```

## Development Guidelines

### Coding Standards

1. **TypeScript Style**
   - Use strict TypeScript typing
   - Prefer `interface` over `type` for object shapes
   - Use `async/await` for asynchronous operations
   - Follow existing code style and formatting

2. **Dual-Runtime Compatibility**
   - Always ensure code works in both Deno and Node.js
   - Use runtime adapters in `runtime.ts` for platform-specific operations
   - Test changes in both runtimes before committing
   - Avoid platform-specific imports in shared code

3. **File Operations**
   - Use the `Adapters` interface for file system operations
   - Never use direct `Deno` or `node:fs` imports in shared code
   - Path operations should go through adapter methods

4. **Error Handling**
   - Provide clear error messages
   - Handle missing configuration files gracefully
   - Validate input before processing

### Build & Test

- **Lint**: `deno lint` (CI allows some errors, check output)
- **Type check**: `deno check mod.ts`
- **Generate docs**: `deno task gen`
- **Watch mode**: `deno task watch`
- **Build npm package**: `deno task build:npm`

### Configuration

The project uses `.stateDoc.json` for configuration with the following schema:
- `projectTitle`: Title for generated documentation
- `source`: Directory containing FSM files
- `target`: Output directory for documentation
- `globs`: File patterns to match FSM files
- `templates`: Custom templates for machine and state pages
- `visualization`: Mermaid diagram settings

## Common Tasks

### Adding New Features

1. Implement in TypeScript with dual-runtime support
2. Add to appropriate file (e.g., `generate.ts` for core logic)
3. Use adapters for platform-specific operations
4. Update types in `mod.ts` if adding configuration options
5. Test with `deno task gen`

### Modifying Templates

- Template syntax is Eta (similar to Handlebars)
- Test template changes by running `deno task gen`
- Available template contexts are defined in `generate.ts`

### Working with FSM Parser

The current implementation uses a placeholder parser (`fakeParseMachines`). When implementing the real parser:
- Parse TypeScript files using the TS compiler API
- Extract XState machine definitions
- Return data matching the `Machine` type structure

## Important Notes

- **Shebang Line**: The `cli.ts` file starts with `#!/usr/bin/env -S deno run -A` - this is intentional and causes a linting error. This is expected.
- **Inline Imports**: Some runtime imports use inline `jsr:` specifiers which trigger linting warnings. These are necessary for dynamic imports.
- **CI/CD**: The GitHub Actions workflow runs basic checks but allows some lint failures. Focus on type-checking and functionality.

## Dependencies Management

- Add JSR dependencies to `deno.json` imports section
- For npm packages in Node.js build, add to dnt build configuration
- Always check security advisories before adding new dependencies
- Prefer JSR packages over npm when available for Deno

## Testing Approach

Currently, the project has a simple end-to-end flow:
1. Read configuration from `.stateDoc.json`
2. Parse FSM files (placeholder implementation)
3. Generate Markdown and Mermaid files in the target directory

When adding tests:
- Focus on the documentation generation pipeline
- Test both Deno and Node.js runtimes
- Verify generated file contents
- Test edge cases (missing config, invalid FSM definitions)
