# Task Management v2 Example (Praxis 1.2.x)

This example demonstrates the enhanced features of Praxis 1.2.x supported by praxisdoc.

## New Features Demonstrated

### Enhanced Model Definitions
- **Validation rules** on fields (required, min, max)
- **Constraints** at model level (unique, check, foreign keys)
- **Indexes** for optimized queries (btree, hash, fulltext)
- **Relationships** between models (one-to-one, one-to-many, many-to-many)
- **Optional fields** and default values

### Enhanced Logic Definitions
- **Rules**: Business logic with conditions (when) and actions (then)
- **Constraints**: Runtime validation with custom error messages
- **Rule priorities**: Control execution order
- **Event triggers**: Rules that respond to specific events

### Enhanced Component Definitions
- **Props**: Component properties with types and defaults
- **Events**: Component events with payload types
- **Layout**: Flexible layout configuration (stack, grid, flex)
- **Styling**: CSS classes, inline styles, and theme tokens

### Orchestration Support
- **Node configurations**: Terminal, webhook, and custom nodes
- **Bindings**: Connect nodes to PluresDB paths
- **Synchronization**: State sync with conflict resolution
- **Health checks**: Monitoring configuration

### Metadata
- Additional schema metadata for documentation and tracking

## Files in This Example

- `task-enhanced.schema.ts` - Praxis 1.2.x enhanced schema definition
- `.praxisDoc.json` - Configuration file for praxisdoc
- `docs/` - Generated documentation (created when you run praxisdoc)

## Running the Example

Install Deno if you haven't already, then from this directory:

```bash
# Using Deno directly
deno run -A ../../cli.ts --config=.praxisDoc.json

# Or if praxisdoc is installed globally
praxisdoc gen --config=.praxisDoc.json
```

## What Gets Generated

After running praxisdoc, you'll find:

- `docs/index.md` - Overview of all schemas
- `docs/schemas/taskmanagementv2/README.md` - Enhanced schema documentation with:
  - Models with constraints, indexes, and relationships
  - Components with props, events, layout, and styling
  - Orchestration configuration
- `docs/schemas/taskmanagementv2/logic/task-state-machine.md` - Logic documentation with:
  - Events and facts
  - **NEW**: Business rules with conditions and actions
  - **NEW**: Runtime constraints with validation
  - State transitions
- `docs/schemas/taskmanagementv2/logic/task-state-machine.mmd` - Mermaid state diagram

## Comparison with Basic Example

The basic `task-management` example uses the simpler Praxis schema format, while this example demonstrates:

1. **Richer Models**: Fields with validation, constraints, indexes, and relationships
2. **Business Rules**: Not just state transitions, but conditions and actions
3. **Runtime Constraints**: Validation that executes during state transitions
4. **Enhanced Components**: Full component definitions with props, events, and layout
5. **Orchestration**: Node configuration for distributed systems
6. **Metadata**: Additional schema information for tooling

## Praxis 1.2.x Features Supported

This example and the updated praxisdoc support:

✅ Enhanced model definitions (constraints, indexes, relationships)
✅ Business rules in logic definitions
✅ Runtime constraints with validation
✅ Enhanced component definitions (props, events, layout, styling)
✅ Orchestration configuration (nodes, sync, health)
✅ Schema metadata
✅ Field validation rules
✅ Optional fields and defaults

## Next Steps

1. Explore the generated documentation in `docs/`
2. Modify the schema to add new features
3. Re-run praxisdoc to see updated documentation
4. Try creating your own Praxis 1.2.x schema

For more information about Praxis features, see the [Praxis documentation](https://github.com/plures/praxis).
