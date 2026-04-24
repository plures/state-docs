# Roadmap

## Role in Plures Ecosystem

praxisdoc is the automated documentation generator for Praxis applications. It transforms declarative Praxis schemas into human-readable Markdown and Mermaid diagrams — keeping docs in sync with code for product teams, QA, and stakeholders.

## Current State

**Version 2.0.0** (Alpha) — Major refactor from XState to Praxis. Core schema documentation generation is stable. Dual runtime (Deno + Node). Published to JSR and npm.

### ✅ Shipped

- Praxis schema documentation (models, logic, components, orchestration)
- Legacy XState machine support with auto-conversion
- Mermaid diagram generation from state transitions
- CLI (`init`, `gen`) with `.praxisDoc.json` configuration
- Automated publishing to JSR and npm
- Cross-platform install scripts (curl/PowerShell)
- Enhanced Praxis 1.2+ features (business rules, constraints, orchestration)

## Milestones

### Near-term
- Parse Praxis facts and rules documentation (rules done, facts pending)
- Integrate with Praxis CLI for seamless workflow
- Watch mode for continuous documentation generation
- Support YAML and JSON schema definitions

### Mid-term
- PNG/SVG export via Mermaid CLI integration
- Interactive HTML diagrams with tooltips
- Component relationship diagrams
- Model entity-relationship diagrams
- Custom diagram themes and styling

### Long-term
- Integration with doc sites (Docusaurus, VitePress)
- Type definition generation from Praxis schemas
- Test scenario generation from state transitions
- Plugin system for custom parsers and generators
- VS Code extension for inline schema visualization

---

**Last Updated**: 2026-04-24
