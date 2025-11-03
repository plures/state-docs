
# statedoc (Deno + Node)

FSM documentation generator for XState projects. One ESM codebase. Runs on Deno or Node. Generates Markdown and Mermaid from machines and states.

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

## Publishing

The project includes an automated publishing pipeline that triggers when a new version tag is created.

### How to publish a new version:

1. Create and push a version tag (format: `v*.*.*`):
   ```sh
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. The GitHub Actions workflow will automatically:
   - Update version numbers in `deno.json` and `package.json.template`
   - Build the npm package
   - Publish to JSR (Deno registry)
   - Publish to npm
   - Create a GitHub release

### Required secrets:

Configure the following secret in the repository settings:
- `NPM_TOKEN`: npm authentication token for publishing
