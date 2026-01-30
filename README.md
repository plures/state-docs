
# praxisdoc (Deno + Node)

[![CI](https://github.com/plures/state-docs/actions/workflows/ci.yml/badge.svg)](https://github.com/plures/state-docs/actions/workflows/ci.yml)
[![JSR](https://jsr.io/badges/@plures/statedoc)](https://jsr.io/@plures/statedoc)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Automated documentation generator for Praxis applications.** One ESM codebase. Runs on Deno or Node. Generates Markdown and Mermaid diagrams from Praxis schemas.

> **⚠️ Version Status**: Alpha (v2.0.0) - Refactored for Praxis. API may change. See [Stability & Versioning](#stability--versioning) below.

## What is praxisdoc?

praxisdoc automatically generates human-readable documentation from your [Praxis](https://github.com/plures/praxis) application schemas. It transforms declarative schema definitions into clear documentation that anyone can understand—perfect for product teams, QA engineers, and stakeholders.

**Now supports Praxis 1.2.x** with enhanced features including business rules, constraints, orchestration, and more.

### About Praxis

**Praxis** is a schema-driven application framework for building local-first, distributed applications. It uses declarative schemas to define:

- **Models**: Data structures with fields, types, indexes, constraints, and relationships
- **Logic**: Business rules, events, facts, state transitions, and runtime constraints
- **Components**: UI elements auto-generated from schemas with props, events, and layouts
- **Orchestration**: Distributed node configuration with PluresDB integration
- **Documentation**: Automatically synchronized with your code

praxisdoc leverages Praxis's schema format to generate comprehensive documentation including state diagrams, event flows, data models, business rules, and orchestration diagrams.

## Installation

### Quick Install (Recommended)

**Linux/macOS:**
```sh
curl -fsSL https://raw.githubusercontent.com/plures/state-docs/main/install.sh | sh
```

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/plures/state-docs/main/install.ps1 | iex
```

### Manual Installation

#### Via Deno (JSR)
```sh
deno install -A -n praxisdoc jsr:@plures/statedoc/cli
```

#### Via npm
```sh
npm install -g @plures/statedoc
```

#### Via npx (No Installation Required)
```sh
npx @plures/statedoc gen --config=.praxisDoc.json
```

## Quick Start

After installation, generate documentation:
```sh
praxisdoc gen --config=.praxisDoc.json
```

### Adding to an Existing Praxis Project

1. Install praxisdoc (choose one method from above)
2. Initialize a configuration file:

```sh
praxisdoc init
```

This creates a `.praxisDoc.json` file (or `.stateDoc.json` for backwards compatibility) with sensible defaults:

```json
{
  "projectTitle": "My Project",
  "source": "./src",
  "target": "./docs",
  "globs": ["**/*.schema.ts", "**/*.schema.js"],
  "visualization": {
    "format": "mermaid",
    "exportPng": false
  }
}
```

3. Edit the config file to match your project structure
4. Run the generator:
```sh
praxisdoc gen
```

5. (Optional) Add to your package.json scripts:
```json
{
  "scripts": {
    "docs": "praxisdoc gen"
  }
}
```

### For Development

Deno:
```sh
deno task gen
```

Node (after building with dnt):
```sh
deno run -A scripts/build_npm.ts
cd npm
npm install -g .
praxisdoc gen --config=.praxisDoc.json
```

## Real-World Example

See the examples directory for comprehensive demonstrations:

- **[Task Management Example](./examples/task-management/README.md)**: Basic Praxis schema with state transitions
- **[Task Management v2 Example](./examples/task-management-v2/README.md)**: Enhanced Praxis 1.2.x features
  - Business rules with conditions and actions
  - Runtime constraints and validation
  - Enhanced component definitions
  - Orchestration configuration
- **[Shopping Cart Example](./examples/shopping-cart/README.md)**: Legacy XState machine (auto-converted)

Each example includes:
- **Before**: Praxis/XState schema definitions in TypeScript
- **After**: Clear Markdown documentation with Mermaid diagrams
- **Use Cases**: Product planning, QA testing, stakeholder communication
- **CLI Output**: See exactly what the tool generates

[View all examples →](./examples/)

## Supported Formats

### Input Formats

**Currently Supported:**
- Praxis schema files (`.schema.ts`, `.schema.js`)
- Legacy XState-compatible state machines (`.machine.ts`, `.machine.js`) - converted to Praxis format
- TypeScript and JavaScript (ES modules)

**Planned (see [ROADMAP.md](./ROADMAP.md)):**
- YAML schema definitions
- JSON state definitions
- Robot Framework state machines
- State Machine Cat format

### Output Formats

**Currently Supported:**
- Markdown (`.md`)
- Mermaid diagrams (`.mmd`)

**Planned:**
- HTML documentation sites
- PDF exports
- PNG/SVG diagram exports
- OpenAPI specifications

### Supported Languages & Ecosystems

- **Runtime**: Deno 2.x, Node.js 18+
- **Input**: TypeScript, JavaScript (ES modules)
- **Schema Libraries**: Praxis schemas, XState-compatible (legacy)
- **Platforms**: Linux, macOS, Windows

## Why praxisdoc?

### Comparison with Other Tools

| Feature | praxisdoc | Praxis Built-in | XState Inspector | Stately Studio | Custom Docs |
|---------|-----------|-----------------|------------------|----------------|-------------|
| **Auto-generate from code** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Praxis schema support** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Markdown output** | ✅ | ✅ | ❌ | ❌ | ✅ (manual) |
| **Mermaid diagrams** | ✅ | ✅ | ❌ | ✅ | ❌ |
| **No runtime required** | ✅ | ❌ | ❌ (needs app) | ✅ | ✅ |
| **CLI tool** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Free & open source** | ✅ | ✅ | ✅ | 💰 (limited) | ✅ |
| **Customizable templates** | ✅ | ⚠️ | ❌ | 💰 (Pro) | ✅ |
| **Version control friendly** | ✅ | ✅ | ❌ | ❌ | ✅ |
| **CI/CD integration** | ✅ | ✅ | ❌ | ❌ | ✅ |
| **Works offline** | ✅ | ✅ | ❌ | ❌ | ✅ |
| **Legacy XState support** | ✅ | ❌ | ✅ | ✅ | ❌ |

### Unique Value Propositions

1. **Praxis-First Design**: Built specifically to document Praxis applications with full schema support
2. **Static Documentation**: Generate docs at build time, no runtime dependencies
3. **Git-Friendly**: Markdown output works with standard version control workflows
4. **Template-Based**: Fully customizable output to match your documentation style
5. **Dual Runtime**: Single codebase works on both Deno and Node.js
6. **CLI-First**: Designed for automation, scripting, and CI/CD pipelines
7. **Legacy Support**: Converts XState machines to Praxis format automatically
8. **Developer-Focused**: Built by developers, for developers, with extensibility in mind

### When to Use praxisdoc

✅ **Use praxisdoc when:**
- You're building a Praxis application
- You want documentation that lives in your repository
- You need to generate docs automatically in CI/CD
- You want to customize documentation templates
- You're migrating from XState to Praxis
- You need offline, static documentation

❌ **Consider alternatives when:**
- You need real-time state visualization during development (→ use Praxis built-in tools)
- You prefer visual state machine editors (→ use Stately Studio)
- You need collaborative, cloud-based diagramming (→ use Stately Studio)
- You're not using Praxis or state machines at all

## Scope & Limitations

### What praxisdoc Does

- ✅ Parses Praxis schema definitions (models, logic, components, orchestration)
- ✅ Supports Praxis 1.2.x enhanced features (rules, constraints, relationships, orchestration)
- ✅ Generates Markdown documentation from schemas
- ✅ Creates Mermaid state diagrams from logic transitions
- ✅ Documents business rules and runtime constraints
- ✅ Documents model constraints, indexes, and relationships
- ✅ Documents component props, events, layouts, and styling
- ✅ Supports customizable templates
- ✅ Works with TypeScript and JavaScript
- ✅ Converts legacy XState machines to Praxis format

### What praxisdoc Doesn't Do

- ❌ **Runtime visualization**: We generate static docs, not interactive UIs
- ❌ **Schema validation**: We document existing schemas, don't validate logic
- ❌ **Execution**: We don't run or test your state machines
- ❌ **Visual editor**: We're a CLI tool, not a GUI for creating schemas
- ❌ **Multiple languages**: Currently only TypeScript/JavaScript (see roadmap)

### Known Limitations (v2.0.0)

- Parser is runtime-based; static TypeScript AST parsing coming in future
- No PNG/SVG export yet; only Mermaid text format
- No watch mode; must manually re-run generator
- Limited to Praxis and XState formats; other formats planned

See our [ROADMAP.md](./ROADMAP.md) for planned improvements.

## Stability & Versioning

### Current Stability: Alpha (v2.0.0)

**What this means:**
- ⚠️ **Major refactor**: Migrated from XState to Praxis
- ⚠️ **API has changed**: Configuration and output formats updated
- ✅ **Core functionality works**: Basic documentation generation is stable
- ⚠️ **Breaking changes possible**: Updates may require configuration changes
- ✅ **Legacy support**: XState machines automatically converted to Praxis format
- ⚠️ **Use with caution in production**: Suitable for early adopters and testing

### Migration from v1.x

If you're upgrading from state-docs v1.x (XState-based):

1. **Config file**: Rename `.stateDoc.json` to `.praxisDoc.json` (optional but recommended)
2. **Update globs**: Add `**/*.schema.ts` to your globs pattern
3. **Legacy support**: Existing `.machine.ts` files will still work
4. **Review output**: Documentation structure has changed to support Praxis schemas

### Stability Roadmap

- **v2.0.x - v2.4.x (Alpha)**: Rapid iteration, API refinements, feature additions
- **v2.5.x+ (Beta)**: Feature complete, stable API, minor changes only
- **v3.0.0+ (Stable)**: Production-ready, backward compatibility guaranteed

### Versioning Policy

We follow [Semantic Versioning](https://semver.org/):

- **Major (X.0.0)**: Breaking changes requiring migration
- **Minor (1.X.0)**: New features, backward compatible
- **Patch (1.0.X)**: Bug fixes, no API changes

### Backward Compatibility Guarantees

**Current (Alpha):**
- ❌ No backward compatibility guarantee between versions
- ❌ Configuration format may change
- ❌ Output format may change
- ✅ We'll document changes in CHANGELOG.md

**Future (Beta & Stable):**
- ✅ Backward compatibility within same major version
- ✅ Deprecation warnings before removing features
- ✅ Migration guides for breaking changes
- ✅ 6-month deprecation period for removals

### Migration Guides

As we're in alpha, migrations are expected. We'll provide:

- **CHANGELOG.md**: Detailed change notes for each release
- **ROADMAP.md**: Advance notice of upcoming changes
- **Migration sections**: Specific guides for major updates

**Planned migration guides:**
- v1.0.x → v1.1.0: Parser implementation changes
- v1.x → v2.0: Major API redesign (when needed)

## Governance

This project uses Architectural Decision Records (ADRs) to document significant technical and architectural decisions. ADRs help us maintain a clear record of why we made certain choices and provide context for future development.

📖 **View all ADRs**: [docs/adr/README.md](docs/adr/README.md)

When making significant decisions about architecture, design patterns, technology choices, or processes, please document them as ADRs following our [ADR template](docs/adr/template.md).

## Contributing

We welcome contributions! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### Getting Started

1. 📖 Read the [CONTRIBUTING.md](./CONTRIBUTING.md) guide
2. 🗺️ Check the [ROADMAP.md](./ROADMAP.md) for planned features
3. 📚 Review [Praxis 1.2.x Support](./docs/PRAXIS_V2_SUPPORT.md) for latest features
4. 🏷️ Look for issues tagged with **`good first issue`**
5. 💬 Join the discussion on open issues

### Quick Links

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines and development setup
- [ROADMAP.md](./ROADMAP.md) - Future plans and feature requests
- [Praxis 1.2.x Support](./docs/PRAXIS_V2_SUPPORT.md) - Enhanced Praxis features documentation
- [Issue Templates](./.github/ISSUE_TEMPLATE/) - Bug reports, feature requests, documentation
- [ADR Process](./docs/adr/README.md) - Architectural decision records

## Publishing

The project includes an automated publishing pipeline that triggers when a new version tag is created.

### For Maintainers: How to publish a new version

1. Update the CHANGELOG (if exists) or release notes
2. Create and push a version tag (format: `v*.*.*`):
   ```sh
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. The GitHub Actions workflow will automatically:
   - Update version numbers in `deno.json` and `package.json.template`
   - Build the npm package using dnt
   - Publish to JSR (Deno registry) at `@plures/statedoc`
   - Publish to npm as `@plures/statedoc`
   - Create a GitHub release with the tag

### For End Users: Installation methods

After publishing, users can install via:
- **Shell script**: `curl -fsSL https://raw.githubusercontent.com/plures/state-docs/main/install.sh | sh`
- **Deno/JSR**: `deno install -A -n praxisdoc jsr:@plures/statedoc/cli`
- **npm global**: `npm install -g @plures/statedoc`
- **npx**: `npx @plures/statedoc gen`

### Required repository secrets:

Configure the following secret in the repository settings:
- `NPM_TOKEN`: npm authentication token for publishing (get from npmjs.com)

### Manual publishing (if needed):

**JSR (Deno):**
```sh
deno publish
```

**npm:**
```sh
deno task build:npm
cd npm
npm publish --access public
```
