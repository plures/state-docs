# Examples

This directory contains real-world examples demonstrating how to use praxisdoc to generate documentation from Praxis schemas and state machines.

## Available Examples

### [Task Management](./task-management/) ⭐ **NEW: Praxis Schema Example**

A Praxis application schema demonstrating:
- Schema-driven development with models, logic, and components
- State transitions for task lifecycle (new → assigned → in_progress → completed)
- Events and facts documentation
- Component auto-generation metadata
- Native Praxis format integration

**Use cases**: Product planning, business logic documentation, team onboarding, API design

[View the task management example →](./task-management/README.md)

### [Shopping Cart](./shopping-cart/) **Legacy XState Example**

A comprehensive e-commerce checkout flow demonstrating:
- Complex multi-state workflows (empty → active → checkout → processing → completed/failed)
- Nested states (checkout with shipping and payment sub-states)
- Error handling and retry flows
- Automatic conversion from XState to Praxis format
- Before/after documentation comparison

**Use cases**: Product planning, QA test scenario generation, stakeholder communication

[View the shopping cart example →](./shopping-cart/README.md)

## Running the Examples

Each example includes its own configuration file (`.praxisDoc.json` or `.stateDoc.json`) and schema/machine definitions.

### Using Deno

```bash
cd examples/task-management
deno run -A ../../cli.ts gen --config=.praxisDoc.json
```

### Using npm/npx

```bash
cd examples/task-management
npx @plures/statedoc gen --config=.praxisDoc.json
```

### Expected Output

After running the generator, you should see:
- `docs/index.md` - Overview of all schemas
- `docs/schemas/[schema-name]/README.md` - Schema documentation with models and logic
- `docs/schemas/[schema-name]/logic/*.md` - Individual logic definition pages
- `docs/schemas/[schema-name]/logic/*.mmd` - Mermaid diagrams

## Contributing Examples

We welcome new examples! Good examples to add:

**Praxis Schema Examples:**
- **E-commerce order**: Order processing workflow with inventory, payment, shipping
- **User authentication**: Signup, login, verification, password reset
- **Content management**: Draft, review, publish, archive states
- **Multi-tenant SaaS**: Subscription, billing, feature access
- **IoT device**: Connection, data sync, firmware update states

**Legacy XState Examples (will be auto-converted):**
- **Modal dialog**: Opening, closing, confirmation states
- **Form wizard**: Multi-step form with validation
- **API request**: Loading, success, error states with retry
- **Video player**: Playing, paused, buffering, ended states

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on submitting examples.

### Example Requirements

Each example should include:
1. **Schema/machine file(s)** - Praxis schema (`.schema.ts`) or XState machine with clear comments
2. **`.praxisDoc.json` or `.stateDoc.json`** - Configuration file
3. **`README.md`** - Explanation of the example with:
   - Overview of the schema/state machine
   - Use cases
   - Before/after comparison
   - Instructions for running
4. **Clear comments** - Explain business logic and state transitions

Examples are tested in CI to ensure they work with the latest version.
