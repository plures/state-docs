# Roadmap

This document outlines the planned features and improvements for state-docs. We use semantic versioning and prioritize community feedback in our development process.

## Current Version: 1.0.0 (Initial Release)

**Status**: Alpha - Core functionality is stable, API may change before 1.0 stable release

### ✅ Completed Features

- FSM documentation generation from XState-compatible state machines
- Dual runtime support (Deno and Node.js)
- Markdown output with customizable templates
- Mermaid diagram generation
- CLI with `init` and `gen` commands
- Configuration via `.stateDoc.json`
- Automated publishing to JSR and npm
- Cross-platform installation scripts

---

## Upcoming Releases

### v1.1.0 - Parser Implementation (Q1 2025)

**Focus**: Replace placeholder parser with real TypeScript/XState parsing

- [ ] Implement TypeScript compiler API integration
- [ ] Extract XState machine definitions from source files
- [ ] Support both `createMachine()` and object literal formats
- [ ] Parse machine context, guards, and actions
- [ ] Add validation for malformed state machines
- [ ] Improve error messages with file locations

**Good First Issues**:
- Add unit tests for parser utilities
- Improve error message formatting
- Add support for JSDoc comments in state definitions

### v1.2.0 - Enhanced Visualization (Q2 2025)

**Focus**: Improve diagram generation and export options

- [ ] PNG export via Mermaid CLI integration
- [ ] SVG export support
- [ ] Interactive HTML diagrams with tooltips
- [ ] Custom diagram themes and styling
- [ ] Support for nested/hierarchical state visualization
- [ ] Parallel states visualization
- [ ] History states representation

**Good First Issues**:
- Add color customization options
- Create diagram theme presets
- Document custom styling examples

### v1.3.0 - Multiple Format Support (Q2 2025)

**Focus**: Support additional state machine formats and documentation outputs

- [ ] Support Robot Framework state machines
- [ ] Support State Machine Cat format
- [ ] Support JSON-based state definitions
- [ ] HTML documentation output
- [ ] PDF export via markdown conversion
- [ ] OpenAPI integration for API state flows

**Good First Issues**:
- Add examples for different input formats
- Create format conversion utilities
- Document format specifications

### v1.4.0 - Advanced Features (Q3 2025)

**Focus**: Enhanced documentation and developer experience

- [ ] Watch mode with hot reload
- [ ] Integration with documentation sites (Docusaurus, VitePress, etc.)
- [ ] Type definition generation from state machines
- [ ] Test scenario generation from state transitions
- [ ] Code coverage visualization (which states/transitions are tested)
- [ ] Diff view for state machine changes
- [ ] Migration helpers for breaking state changes

**Good First Issues**:
- Add more template examples
- Create integration guides
- Improve CLI help documentation

---

## v2.0.0 - Major Features (Q4 2025)

**Focus**: Enterprise features and scalability

- [ ] Multi-language support for state machine parsing (JavaScript, TypeScript, Python)
- [ ] State machine validation and linting
- [ ] Performance optimization for large codebases
- [ ] Plugin system for custom parsers and generators
- [ ] Cloud integration (GitHub, GitLab, Bitbucket)
- [ ] Real-time collaboration features
- [ ] Analytics and insights (state usage, transition frequency)

---

## Future Considerations

These ideas are under consideration but not yet scheduled:

### Developer Tools
- VS Code extension for inline state visualization
- State machine debugger integration
- Real-time state machine testing playground

### Documentation Features
- Automatic changelog generation from state changes
- Multi-language documentation generation
- Interactive state machine tutorials
- Version comparison and migration guides

### Enterprise Features
- Team collaboration features
- State machine governance and approvals
- Compliance and audit trail
- Custom deployment pipelines

### Integrations
- Jira/Linear integration for linking states to tickets
- Slack/Discord notifications for state changes
- CI/CD integrations (GitHub Actions, GitLab CI, CircleCI)
- Monitoring integration (Datadog, New Relic)

---

## How to Contribute

We welcome contributions! Here's how you can help:

### 🌟 For New Contributors

Look for issues tagged with:
- **`good first issue`**: Beginner-friendly tasks
- **`help wanted`**: Tasks we'd love help with
- **`documentation`**: Documentation improvements

### 💡 Suggesting Features

1. Check if the feature is already in this roadmap
2. Search existing issues to avoid duplicates
3. Open a new issue with:
   - Clear use case description
   - Expected behavior
   - Examples from other tools (if applicable)
   - Willingness to contribute (if you'd like to implement it)

### 🐛 Reporting Bugs

Use our bug report template and include:
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, runtime version)
- Minimal reproduction example

### 🔧 Implementing Features

1. Comment on the issue you'd like to work on
2. Wait for maintainer approval/guidance
3. Follow the contributing guidelines
4. Submit a PR with tests and documentation
5. Create an ADR for significant architectural decisions

---

## Release Process

We follow semantic versioning:

- **Major (X.0.0)**: Breaking changes, API redesigns
- **Minor (1.X.0)**: New features, backward-compatible
- **Patch (1.0.X)**: Bug fixes, documentation updates

### Release Schedule

- **Patch releases**: As needed for bugs
- **Minor releases**: Quarterly (every 3 months)
- **Major releases**: Annually or as needed

### Stability Guarantees

- **Alpha (current)**: API may change, no backward compatibility guarantee
- **Beta (v1.5.0+)**: Feature complete, minor API changes possible
- **Stable (v2.0.0+)**: Guaranteed backward compatibility within major version

---

## Community Goals

We're building state-docs as a community-driven project:

- 🎯 **Target**: 50+ stars by v1.1.0
- 🤝 **Target**: 10+ external contributors by v1.2.0
- 📝 **Target**: 5+ production users by v2.0.0
- 🌍 **Target**: Multi-language documentation by v2.0.0

---

## Stay Updated

- ⭐ Star the repo to follow progress
- 👀 Watch releases for announcements
- 💬 Join discussions for feature planning
- 📣 Share your use cases and feedback

---

**Last Updated**: 2025-01-XX  
**Next Review**: Q2 2025

For questions about the roadmap, open a discussion or issue on GitHub.
