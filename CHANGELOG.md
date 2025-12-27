# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2025-12-27

### 🚨 Breaking Changes

- **Complete refactor from XState to Praxis**: The project has been refactored to focus on Praxis application schemas instead of XState state machines
- **Configuration changes**: While `.stateDoc.json` is still supported, `.praxisDoc.json` is now recommended
- **Package renamed**: `@plures/statedoc` → `@plures/praxisdoc` (package name will update in future release)
- **CLI command**: Recommend using `praxisdoc` instead of `statedoc` (both work for backwards compatibility)
- **Default globs**: Now defaults to `**/*.schema.ts` and `**/*.schema.js` for Praxis schemas
- **Output structure**: Documentation is now organized by schemas/logic instead of machines/states

### Added - Praxis Support

- **Praxis schema parsing**: Full support for Praxis application schemas with models, logic, and components
- **Schema documentation**: Generates documentation for Praxis models with fields and types
- **Logic documentation**: Documents events, facts, rules, and state transitions from Praxis logic definitions
- **Component documentation**: Lists Praxis UI components defined in schemas
- **Legacy XState support**: Automatic conversion of XState machines to Praxis schema format
- **Enhanced templates**: New templates for schema and logic documentation
- **Migration support**: Backwards compatible with v1.x XState projects

### Changed

- **Parser refactored**: Complete rewrite to support Praxis schema format
- **Type definitions**: Updated to `PraxisDocConfig`, `PraxisSchema`, and `PraxisLogic`
- **Documentation generator**: Restructured to generate schema-based documentation
- **CLI branding**: Updated help text and initialization to reflect Praxis focus
- **Example files**: Added `task.schema.ts` example demonstrating Praxis schema format
- **README**: Completely rewritten to focus on Praxis integration
- **ROADMAP**: Updated with Praxis-focused features and goals

### Migration Guide

Upgrading from v1.x to v2.0:

1. **Config file**: Rename `.stateDoc.json` to `.praxisDoc.json` (optional)
2. **Update globs**: Add `**/*.schema.ts` to your globs pattern
3. **Legacy support**: Existing `.machine.ts` files will automatically convert to Praxis format
4. **Review output**: Documentation structure has changed - check the new `schemas/` directory structure
5. **Templates**: If you have custom templates, update them to use the new schema structure

## [1.0.0] - 2025-01-XX

### Added - Release Readiness Improvements

- **Real-world example**: Shopping cart state machine example with before/after documentation
- **Enhanced CI/CD**: Comprehensive GitHub Actions workflow with multiple test jobs
- **Community infrastructure**: 
  - Issue templates (bug reports, feature requests, documentation)
  - ROADMAP.md with planned features and community goals
  - Good first issue guidance in CONTRIBUTING.md
- **Documentation improvements**:
  - Terminology section explaining "state" in context
  - Supported formats, languages, and ecosystems
  - Comparison table with other tools (XState Inspector, Stately Studio)
  - Unique value propositions
  - Scope and limitations clearly defined
- **Stability information**:
  - Version stability indicators (Alpha/Beta/Stable roadmap)
  - Backward compatibility guarantees
  - Migration guide framework
  - Semantic versioning policy
- **Status badges**: CI, JSR, and License badges in README
- **Enhanced CONTRIBUTING.md**: Better onboarding for new contributors

### Changed

- README restructured with clearer sections and navigation
- CI workflow expanded to test both Deno and npm builds
- CONTRIBUTING.md enhanced with good first issue guidance

### Initial Release Features

- FSM documentation generator for XState projects
- Dual runtime support (Deno and Node.js) from a single ESM codebase
- Markdown documentation generation from state machine definitions
- Mermaid state diagram generation
- Configurable documentation generation via `.stateDoc.json`
- Template-based output customization using Handlebars templating engine
- Command-line interface with `init` and `gen` commands
- Installation scripts for Linux/macOS (`install.sh`) and Windows (`install.ps1`)
- Support for multiple installation methods:
  - Deno/JSR installation
  - npm global installation
  - npx execution without installation
- Automated publishing pipeline for JSR and npm
- Architectural Decision Records (ADRs) for project governance
- Comprehensive documentation including README, CONTRIBUTING guide, and ADR templates
- GitHub Actions workflows for CI/CD

[2.0.0]: https://github.com/plures/state-docs/releases/tag/v2.0.0
[1.0.0]: https://github.com/plures/state-docs/releases/tag/v1.0.0
