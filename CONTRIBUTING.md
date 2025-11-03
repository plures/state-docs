# Contributing to State-Docs

Thank you for your interest in contributing to State-Docs! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites

- Deno 2.x (primary runtime) - Install via: `curl -fsSL https://deno.land/install.sh | sh`
- Node.js 18+ (for npm package testing) - Optional but recommended

### Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/plures/state-docs.git
   cd state-docs
   ```

2. Run the development tasks:
   ```sh
   # Generate documentation from example FSM files
   deno task gen
   
   # Watch mode for development
   deno task watch
   
   # Build npm package
   deno task build:npm
   ```

### Project Structure

```
.
├── src/              # Core source code
│   ├── generate.ts   # Documentation generation logic
│   └── tpl.ts        # Template rendering utilities
├── scripts/          # Build and tooling scripts
│   └── build_npm.ts  # npm package builder
├── cli.ts            # Command-line interface
├── mod.ts            # Main module exports
├── runtime.ts        # Runtime adapters (Deno/Node)
└── deno.json         # Deno configuration & dependencies
```

## Making Changes

### Code Style

- Write TypeScript with strict typing
- Use `async/await` for asynchronous operations
- Follow the existing code formatting
- Run `deno lint` before committing (some warnings are acceptable)

### Dual-Runtime Compatibility

**Important**: All code must work in both Deno and Node.js!

- Use the adapter pattern in `runtime.ts` for platform-specific operations
- Never use direct `Deno.*` or `node:*` imports in shared code
- Test your changes in both runtimes when possible

### Running Tests

```sh
# Type checking
deno check mod.ts

# Linting (some warnings expected)
deno lint

# Generate docs to test functionality
deno task gen
```

### Building the npm Package

```sh
# Build with dnt
deno task build:npm

# Test the built package
cd npm
npm install -g .
statedoc init
statedoc gen
```

## Submitting Changes

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting and type checking
5. Test in both Deno and Node (if possible)
6. Commit with clear messages
7. Push to your fork
8. Open a Pull Request

### Commit Message Guidelines

- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Reference issues when applicable

Example:
```
Add support for custom templates

- Allow users to specify custom Eta templates
- Update config schema with templates field
- Add example templates to documentation

Fixes #123
```

## Publishing (Maintainers Only)

### Release Process

1. Ensure all tests pass and changes are merged to main
2. Create a version tag:
   ```sh
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. GitHub Actions will automatically:
   - Update version in `deno.json` and `package.json.template`
   - Build and publish to JSR
   - Build and publish to npm
   - Create a GitHub release

### Version Numbering

Follow [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backwards compatible)
- PATCH: Bug fixes

## Adding Dependencies

### For Deno/JSR packages:
Add to `deno.json` imports:
```json
{
  "imports": {
    "new-package": "jsr:@scope/package@^1.0.0"
  }
}
```

### For npm packages:
1. Add to `deno.json` imports with `npm:` specifier:
   ```json
   {
     "imports": {
       "new-package": "npm:package@^1.0.0"
     }
   }
   ```
2. The npm build process (dnt) will handle it automatically

**Security Note**: Always run security checks before adding new dependencies.

## Getting Help

- Open an issue for bug reports or feature requests
- Check existing issues before creating new ones
- Be respectful and constructive in discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
