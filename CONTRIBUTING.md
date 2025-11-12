# Contributing to state-docs

Thank you for your interest in contributing to state-docs! This document provides guidelines and information to help you contribute effectively.

## Quick Links

- 🗺️ [ROADMAP.md](./ROADMAP.md) - See what we're working on
- 🏷️ [Good First Issues](https://github.com/plures/state-docs/labels/good%20first%20issue) - Beginner-friendly tasks
- 💬 [Discussions](https://github.com/plures/state-docs/discussions) - Ask questions and share ideas
- 📋 [Issue Templates](./.github/ISSUE_TEMPLATE/) - Report bugs or request features

## How to Contribute

### For New Contributors

**Start here if you're new to the project:**

1. ⭐ **Star the repository** to show your support
2. 👀 **Browse [Good First Issues](https://github.com/plures/state-docs/labels/good%20first%20issue)** - These are beginner-friendly tasks
3. 💬 **Comment on an issue** you'd like to work on so others know you're taking it
4. 🔀 **Fork the repository** and create a branch
5. 🛠️ **Make your changes** following our guidelines below
6. ✅ **Test thoroughly** and ensure CI passes
7. 🚀 **Submit a pull request** with a clear description

### Types of Contributions We Welcome

- 🐛 **Bug fixes** - Fix issues that are causing problems
- ✨ **Features** - Add new functionality (check roadmap first)
- 📝 **Documentation** - Improve README, guides, or code comments
- 🧪 **Tests** - Add test coverage for existing features
- 🎨 **Examples** - Create new example state machines
- 🌍 **Translations** - Help us reach more developers
- 🗣️ **Community** - Answer questions, review PRs, share the project

### Good First Issues

We label issues with **`good first issue`** to help new contributors get started. These issues typically:

- ✅ Have clear requirements and scope
- ✅ Don't require deep knowledge of the codebase
- ✅ Have guidance from maintainers
- ✅ Are self-contained and focused

**Current Good First Issue areas:**
- Adding more examples (e.g., authentication flow, modal state machine)
- Improving error messages
- Adding JSDoc comments to functions
- Writing integration tests
- Improving CLI help text
- Adding configuration validation

[View all Good First Issues →](https://github.com/plures/state-docs/labels/good%20first%20issue)

### Reporting Issues

- Search existing issues before creating a new one
- Provide clear reproduction steps
- Include relevant system information (OS, Deno/Node version, etc.)
- Use issue templates when available

### Submitting Pull Requests

1. **Fork the repository** and create a new branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
   - Run `deno task gen` to test documentation generation
   - Verify both Deno and Node.js compatibility if applicable
4. **Write or update tests** if needed
5. **Update documentation** if you're changing functionality
6. **Create an ADR** if making significant architectural decisions (see below)
7. **Submit a pull request** with a clear description of your changes

### Coding Standards

- Follow the existing code style
- Use TypeScript strict mode
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Ensure code works in both Deno and Node.js runtimes (where applicable)

## Architectural Decision Records (ADRs)

For significant technical decisions, we use ADRs to document the context, decision, and consequences. This helps maintain institutional knowledge and provides transparency in our decision-making process.

### When to Write an ADR

Create an ADR when making decisions about:
- Project structure and organization
- Technology stack choices
- Design patterns and architectural patterns
- API designs and contracts
- Build and deployment processes
- Testing strategies
- Major dependencies
- Performance optimizations
- Security approaches

### How to Create an ADR

1. Copy the [ADR template](docs/adr/template.md)
2. Create a new file: `docs/adr/NNNN-your-decision-title.md`
   - Use the next sequential number (check existing ADRs)
   - Use kebab-case for the title
3. Fill in all sections of the template:
   - Context: What problem are you solving?
   - Decision: What solution did you choose?
   - Consequences: What are the tradeoffs?
   - Alternatives: What else did you consider?
4. Submit the ADR as part of your pull request
5. Update the ADR index in [docs/adr/README.md](docs/adr/README.md)

See [docs/adr/README.md](docs/adr/README.md) for more details on our ADR process.

## Development Setup

### Prerequisites

- Deno 2.x or later
- Node.js (for building the npm package)
- Git

### Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/plures/state-docs.git
   cd state-docs
   ```

2. Run the documentation generator:
   ```sh
   deno task gen
   ```

3. Check linting:
   ```sh
   deno lint
   ```

4. Type check:
   ```sh
   deno check mod.ts
   ```

### Testing

Currently, the project uses end-to-end testing by running the documentation generator:

```sh
deno task gen
```

Verify that:
- Configuration is read correctly from `.stateDoc.json`
- Documentation files are generated in the target directory
- Mermaid diagrams are created
- No errors are thrown

### Building for npm

To build the npm package:

```sh
deno task build:npm
```

This creates a `npm/` directory with the Node.js-compatible package.

## Project Structure

```
.
├── .github/           # GitHub configuration and workflows
├── docs/              # Documentation
│   └── adr/          # Architectural Decision Records
├── src/               # Source code
│   ├── generate.ts   # Main documentation generation logic
│   ├── tpl.ts        # Template rendering utilities
│   └── fsm/          # Example FSM files
├── scripts/           # Build scripts
│   └── build_npm.ts  # npm package builder
├── cli.ts             # Command-line interface
├── mod.ts             # Main module exports
├── runtime.ts         # Runtime adapters for Deno/Node
├── deno.json          # Deno configuration
└── .stateDoc.json     # Example configuration
```

## Code Review Process

All submissions require review before merging:

1. **Automated checks**: CI must pass (linting, type checking)
2. **Code review**: At least one maintainer approval required
3. **Testing**: Changes should be tested in relevant runtimes
4. **Documentation**: Update docs if changing functionality
5. **ADR review**: If submitting an ADR, ensure team discussion occurs

## Questions?

- Open an issue for general questions
- Check existing ADRs for architectural context
- Review closed issues and PRs for similar discussions

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

---

Thank you for contributing to state-docs! 🎉
