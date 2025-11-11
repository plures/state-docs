# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-XX

### Added

- Initial public release of state-docs
- FSM documentation generator for XState projects
- Dual runtime support (Deno and Node.js) from a single ESM codebase
- Markdown documentation generation from state machine definitions
- Mermaid state diagram generation
- Configurable documentation generation via `.stateDoc.json`
- Template-based output customization using Eta templating engine
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

### Features

- **Documentation Generation**: Automatically generates Markdown documentation from FSM definitions
- **State Diagrams**: Creates Mermaid state diagrams for visualization
- **Flexible Configuration**: JSON-based configuration with sensible defaults
- **Template Customization**: Customizable templates for machine and state documentation
- **Cross-Platform**: Works on Windows, Linux, and macOS
- **Dual Runtime**: Single codebase runs on both Deno and Node.js

### Documentation

- README with installation and quick start guide
- CONTRIBUTING guide for contributors
- ADR process documentation
- Example configuration file (`.stateDoc.json`)

### Infrastructure

- GitHub Actions CI workflow for linting and type checking
- Automated publishing workflow for version releases
- Support for publishing to both JSR (Deno) and npm registries

[1.0.0]: https://github.com/plures/state-docs/releases/tag/v1.0.0

