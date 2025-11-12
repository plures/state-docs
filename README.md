
# statedoc (Deno + Node)

[![CI](https://github.com/plures/state-docs/actions/workflows/ci.yml/badge.svg)](https://github.com/plures/state-docs/actions/workflows/ci.yml)
[![JSR](https://jsr.io/badges/@plures/statedoc)](https://jsr.io/@plures/statedoc)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**FSM documentation generator for XState projects.** One ESM codebase. Runs on Deno or Node. Generates Markdown and Mermaid from machines and states.

> **⚠️ Version Status**: Alpha (v1.0.0) - Core functionality is stable, but API may change. See [Stability & Versioning](#stability--versioning) below.

## What is state-docs?

state-docs automatically generates human-readable documentation from your [finite state machine (FSM)](https://en.wikipedia.org/wiki/Finite-state_machine) definitions. It transforms complex state machine code into clear documentation that anyone can understand—perfect for product teams, QA engineers, and stakeholders.

### What "State" Means Here

In state-docs, **"state"** refers to the **behavioral state** of your application's finite state machines (FSMs):

- **Application State Machines**: User workflows (authentication, checkout, onboarding)
- **Business Logic States**: Order processing, approval workflows, document lifecycles
- **UI Component States**: Modal dialogs, form wizards, navigation flows
- **System States**: Connection status, data sync states, error recovery flows

We focus on **XState-compatible state machines** that define discrete states and transitions between them.

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
deno install -A -n statedoc jsr:@plures/statedoc/cli
```

#### Via npm
```sh
npm install -g statedoc
```

#### Via npx (No Installation Required)
```sh
npx statedoc gen --config=.stateDoc.json
```

## Quick Start

After installation, generate documentation:
```sh
statedoc gen --config=.stateDoc.json
```

### Adding to an Existing Project

1. Install state-docs (choose one method from above)
2. Initialize a configuration file:

```sh
statedoc init
```

This creates a `.stateDoc.json` file with sensible defaults:

```json
{
  "projectTitle": "My Project",
  "source": "./src",
  "target": "./docs",
  "globs": ["**/*.ts", "**/*.js"],
  "visualization": {
    "format": "mermaid",
    "exportPng": false
  }
}
```

3. Edit the config file to match your project structure
4. Run the generator:
```sh
statedoc gen
```

5. (Optional) Add to your package.json scripts:
```json
{
  "scripts": {
    "docs": "statedoc gen"
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
statedoc gen --config=.stateDoc.json
```

## Real-World Example

See the [Shopping Cart Example](./examples/shopping-cart/README.md) for a comprehensive demonstration:

- **Before**: Complex TypeScript state machine code
- **After**: Clear Markdown documentation with Mermaid diagrams
- **Use Cases**: Product planning, QA testing, stakeholder communication
- **CLI Output**: See exactly what the tool generates

[View the complete example →](./examples/shopping-cart/README.md)

## Supported Formats

### Input Formats

**Currently Supported:**
- XState-compatible TypeScript state machines (`.ts`, `.tsx`)
- XState-compatible JavaScript state machines (`.js`, `.jsx`)

**Planned (see [ROADMAP.md](./ROADMAP.md)):**
- JSON state definitions
- Robot Framework state machines
- State Machine Cat format
- YAML state definitions

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
- **State Libraries**: XState-compatible syntax
- **Platforms**: Linux, macOS, Windows

## Why state-docs?

### Comparison with Other Tools

| Feature | state-docs | XState Inspector | Stately Studio | Custom Docs |
|---------|-----------|------------------|----------------|-------------|
| **Auto-generate from code** | ✅ | ❌ | ❌ | ❌ |
| **Markdown output** | ✅ | ❌ | ❌ | ✅ (manual) |
| **Mermaid diagrams** | ✅ | ❌ | ✅ | ❌ |
| **No runtime required** | ✅ | ❌ (needs app) | ✅ | ✅ |
| **CLI tool** | ✅ | ❌ | ❌ | ❌ |
| **Free & open source** | ✅ | ✅ | 💰 (limited) | ✅ |
| **Customizable templates** | ✅ | ❌ | 💰 (Pro) | ✅ |
| **Version control friendly** | ✅ | ❌ | ❌ | ✅ |
| **CI/CD integration** | ✅ | ❌ | ❌ | ✅ |
| **Works offline** | ✅ | ❌ | ❌ | ✅ |

### Unique Value Propositions

1. **Static Documentation**: Generate docs at build time, no runtime dependencies
2. **Git-Friendly**: Markdown output works with standard version control workflows
3. **Template-Based**: Fully customizable output to match your documentation style
4. **Dual Runtime**: Single codebase works on both Deno and Node.js
5. **CLI-First**: Designed for automation, scripting, and CI/CD pipelines
6. **Developer-Focused**: Built by developers, for developers, with extensibility in mind

### When to Use state-docs

✅ **Use state-docs when:**
- You want documentation that lives in your repository
- You need to generate docs automatically in CI/CD
- You want to customize documentation templates
- You're using XState or XState-compatible state machines
- You need offline, static documentation

❌ **Consider alternatives when:**
- You need real-time state visualization during development (→ use XState Inspector)
- You prefer visual state machine editors (→ use Stately Studio)
- You need collaborative, cloud-based diagramming (→ use Stately Studio)
- You're not using state machines at all

## Scope & Limitations

### What state-docs Does

- ✅ Parses XState-compatible state machine definitions
- ✅ Generates Markdown documentation from state machines
- ✅ Creates Mermaid state diagrams
- ✅ Supports customizable templates
- ✅ Works with TypeScript and JavaScript

### What state-docs Doesn't Do

- ❌ **Runtime visualization**: We generate static docs, not interactive UIs
- ❌ **State machine validation**: We document existing machines, don't validate logic
- ❌ **Execution**: We don't run or test your state machines
- ❌ **Visual editor**: We're a CLI tool, not a GUI for creating machines
- ❌ **Multiple languages**: Currently only TypeScript/JavaScript (see roadmap)

### Known Limitations (v1.0.0)

- Parser is placeholder-based; full TypeScript parsing coming in v1.1.0
- No PNG/SVG export yet; only Mermaid text format
- No watch mode; must manually re-run generator
- Limited to XState syntax; other formats planned

See our [ROADMAP.md](./ROADMAP.md) for planned improvements.

## Stability & Versioning

### Current Stability: Alpha (v1.0.0)

**What this means:**
- ⚠️ **API may change**: Configuration options and output formats may evolve
- ✅ **Core functionality works**: Basic documentation generation is stable
- ⚠️ **Breaking changes possible**: Updates may require configuration changes
- ⚠️ **Use with caution in production**: Suitable for early adopters and testing

### Stability Roadmap

- **v1.0.x - v1.4.x (Alpha)**: Rapid iteration, API refinements, feature additions
- **v1.5.x+ (Beta)**: Feature complete, stable API, minor changes only
- **v2.0.0+ (Stable)**: Production-ready, backward compatibility guaranteed

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
3. 🏷️ Look for issues tagged with **`good first issue`**
4. 💬 Join the discussion on open issues

### Quick Links

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines and development setup
- [ROADMAP.md](./ROADMAP.md) - Future plans and feature requests
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
   - Publish to npm as `statedoc`
   - Create a GitHub release with the tag

### For End Users: Installation methods

After publishing, users can install via:
- **Shell script**: `curl -fsSL https://raw.githubusercontent.com/plures/state-docs/main/install.sh | sh`
- **Deno/JSR**: `deno install -A -n statedoc jsr:@plures/statedoc/cli`
- **npm global**: `npm install -g statedoc`
- **npx**: `npx statedoc gen`

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
