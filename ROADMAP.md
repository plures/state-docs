# Roadmap

This document outlines the planned features and improvements for praxisdoc. We use semantic versioning and prioritize community feedback in our development process.

## Current Version: 2.0.0 (Praxis Refactor)

**Status**: Alpha - Major refactor from XState to Praxis. Core functionality is stable, API has changed.

### ✅ Completed Features

- Praxis schema documentation generation (models, logic, components)
- Legacy XState machine support with automatic conversion
- Dual runtime support (Deno and Node.js)
- Markdown output with customizable templates
- Mermaid diagram generation from state transitions
- CLI with `init` and `gen` commands
- Configuration via `.praxisDoc.json` (or `.stateDoc.json` for backwards compatibility)
- Automated publishing to JSR and npm
- Cross-platform installation scripts

---

## Upcoming Releases

### v2.1.0 - Enhanced Praxis Integration (Q1 2025)

**Focus**: Deeper integration with Praxis framework features

- [x] ✅ **Support enhanced model definitions** (constraints, indexes, relationships)
- [x] ✅ **Support business rules in logic** (conditions, actions, priorities)
- [x] ✅ **Support runtime constraints** (validation checks and error messages)
- [x] ✅ **Enhanced component documentation** (props, events, layout, styling)
- [x] ✅ **Orchestration support** (nodes, bindings, sync, health)
- [ ] Support YAML schema definitions
- [ ] Support JSON schema definitions
- [ ] Parse Praxis facts and rules documentation (partial - rules done)
- [ ] Integrate with Praxis CLI for seamless workflow
- [ ] Add watch mode for continuous documentation generation

**Good First Issues**:
- Add examples for YAML schemas
- Improve template customization options
- Add support for JSDoc comments in schema definitions

### v2.2.0 - Enhanced Visualization (Q2 2025)

**Focus**: Improve diagram generation and export options

- [ ] PNG export via Mermaid CLI integration
- [ ] SVG export support
- [ ] Interactive HTML diagrams with tooltips
- [ ] Custom diagram themes and styling
- [ ] Support for nested/hierarchical state visualization
- [ ] Parallel states visualization
- [ ] Component relationship diagrams
- [ ] Model entity-relationship diagrams

**Good First Issues**:
- Add color customization options
- Create diagram theme presets
- Document custom styling examples

### v2.3.0 - Multiple Format Support (Q2 2025)

**Focus**: Support additional schema formats and documentation outputs

- [ ] Support Robot Framework state machines
- [ ] Support State Machine Cat format
- [ ] HTML documentation output with navigation
- [ ] PDF export via markdown conversion
- [ ] OpenAPI integration for API state flows
- [ ] Praxis-native documentation export

**Good First Issues**:
- Add examples for different input formats
- Create format conversion utilities
- Document format specifications

### v2.4.0 - Advanced Features (Q3 2025)

**Focus**: Enhanced documentation and developer experience

- [ ] Integration with documentation sites (Docusaurus, VitePress, etc.)
- [ ] Type definition generation from Praxis schemas
- [ ] Test scenario generation from state transitions
- [ ] Code coverage visualization (which states/transitions are tested)
- [ ] Diff view for schema changes
- [ ] Migration helpers for breaking schema changes
- [ ] Real-time collaboration features

**Good First Issues**:
- Add more template examples
- Create integration guides
- Improve CLI help documentation

---

## v3.0.0 - Major Features (Q4 2025)

**Focus**: Enterprise features and scalability

- [ ] Multi-language support for schema parsing (JavaScript, TypeScript, Python)
- [ ] Schema validation and linting
- [ ] Performance optimization for large codebases
- [ ] Plugin system for custom parsers and generators
- [ ] Cloud integration (GitHub, GitLab, Bitbucket)
- [ ] Analytics and insights (state usage, transition frequency)
- [ ] Praxis framework tight integration (import schemas directly)

---

## Future Considerations

These ideas are under consideration but not yet scheduled:

### Developer Tools
- VS Code extension for inline schema visualization
- Praxis schema debugger integration
- Real-time schema testing playground
- CodeCanvas integration for visual editing

### Documentation Features
- Automatic changelog generation from schema changes
- Multi-language documentation generation
- Interactive schema tutorials
- Version comparison and migration guides
- Business process documentation

### Enterprise Features
- Team collaboration features
- Schema governance and approvals
- Compliance and audit trail
- Custom deployment pipelines
- Multi-tenant documentation

### Integrations
- Jira/Linear integration for linking logic to tickets
- Slack/Discord notifications for schema changes
- CI/CD integrations (GitHub Actions, GitLab CI, CircleCI)
- Monitoring integration (Datadog, New Relic)
- PluresDB integration for runtime state tracking

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

- **Major (X.0.0)**: Breaking changes, API redesigns (e.g., v1→v2 Praxis refactor)
- **Minor (2.X.0)**: New features, backward-compatible
- **Patch (2.0.X)**: Bug fixes, documentation updates

### Release Schedule

- **Patch releases**: As needed for bugs
- **Minor releases**: Quarterly (every 3 months)
- **Major releases**: Annually or as needed for significant changes

### Stability Guarantees

- **Alpha (v2.0.x-2.4.x)**: API may change, migration from v1.x supported
- **Beta (v2.5.0+)**: Feature complete, minor API changes possible
- **Stable (v3.0.0+)**: Guaranteed backward compatibility within major version

---

## Community Goals

We're building praxisdoc as a community-driven project:

- 🎯 **Target**: 100+ stars by v2.2.0
- 🤝 **Target**: 20+ external contributors by v2.3.0
- 📝 **Target**: 10+ production Praxis users by v3.0.0
- 🌍 **Target**: Multi-language documentation by v3.0.0
- 🔗 **Target**: Official Praxis framework integration by v3.0.0

---

## Stay Updated

- ⭐ Star the repo to follow progress
- 👀 Watch releases for announcements
- 💬 Join discussions for feature planning
- 📣 Share your use cases and feedback

---

**Last Updated**: 2025-12-27  
**Next Review**: Q2 2025

For questions about the roadmap, open a discussion or issue on GitHub.
