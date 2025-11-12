# Examples

This directory contains real-world examples demonstrating how to use state-docs to generate documentation from state machines.

## Available Examples

### [Shopping Cart](./shopping-cart/)

A comprehensive e-commerce checkout flow demonstrating:
- Complex multi-state workflows (empty → active → checkout → processing → completed/failed)
- Nested states (checkout with shipping and payment sub-states)
- Error handling and retry flows
- Before/after documentation comparison
- CLI output demonstration

**Use cases**: Product planning, QA test scenario generation, stakeholder communication

[View the shopping cart example →](./shopping-cart/README.md)

## Running the Examples

Each example includes its own configuration file (`.stateDoc.json`) and state machine definitions.

### Using Deno

```bash
cd examples/shopping-cart
deno run -A ../../cli.ts gen --config=.stateDoc.json
```

### Using npm/npx

```bash
cd examples/shopping-cart
npx statedoc gen --config=.stateDoc.json
```

### Expected Output

After running the generator, you should see:
- `docs/index.md` - Overview of all machines
- `docs/machines/[machine-name]/README.md` - Machine documentation
- `docs/machines/[machine-name]/states/*.md` - Individual state pages
- `docs/machines/[machine-name]/diagram.mmd` - Mermaid diagram

## Contributing Examples

We welcome new examples! Good examples to add:

- **Authentication flow**: Login, logout, session management
- **Modal dialog**: Opening, closing, confirmation states
- **Form wizard**: Multi-step form with validation
- **API request**: Loading, success, error states with retry
- **Video player**: Playing, paused, buffering, ended states
- **Document workflow**: Draft, review, approved, published states

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on submitting examples.

### Example Requirements

Each example should include:
1. **State machine file(s)** - TypeScript/JavaScript with clear comments
2. **`.stateDoc.json`** - Configuration file
3. **`README.md`** - Explanation of the example with:
   - Overview of the state machine
   - Use cases
   - Before/after comparison
   - Instructions for running
4. **Clear comments** - Explain business logic and state transitions

Examples are tested in CI to ensure they work with the latest version.
