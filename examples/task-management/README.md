# Task Management Example

This example demonstrates how praxisdoc generates documentation from a Praxis application schema.

## Overview

The task management system is a simple application that tracks tasks through their lifecycle:
- New tasks are created
- Tasks are assigned to users
- Users start work on tasks
- Work can be paused and resumed
- Tasks are completed or cancelled

This workflow is defined using a Praxis schema with models, logic, and components.

## Files in This Example

- `task.schema.ts` - Praxis schema definition with models, logic, and components
- `.praxisDoc.json` - Configuration file for praxisdoc
- `docs/` - Generated documentation (created when you run praxisdoc)

## Running the Example

From this directory, run:

```bash
praxisdoc gen --config=.praxisDoc.json
```

Or if using npx:

```bash
npx @plures/statedoc gen --config=.praxisDoc.json
```

This will generate documentation in the `docs/` directory.

## What Gets Generated

After running praxisdoc, you'll find:

- `docs/index.md` - Overview of all schemas
- `docs/schemas/taskmanagement/README.md` - Schema documentation with models and logic
- `docs/schemas/taskmanagement/logic/task-state-machine.md` - Logic definition with events, facts, and transitions
- `docs/schemas/taskmanagement/logic/task-state-machine.mmd` - Mermaid state diagram

## Praxis Schema Structure

The Praxis schema in this example includes:

### Models
- **Task**: The main data model with fields like id, title, status, assignee, etc.

### Logic
- **Events**: Actions that trigger state changes (TASK_CREATE, TASK_ASSIGN, etc.)
- **Facts**: State changes that occurred (TaskCreated, TaskAssigned, etc.)
- **Transitions**: State machine transitions from one state to another

### Components
- **TaskForm**: Form for creating/editing tasks
- **TaskList**: List view of tasks
- **TaskDetail**: Detailed view of a single task

## Key Features Demonstrated

1. **Schema-Driven Development**: Everything is defined in the schema
2. **State Transitions**: Clear workflow with explicit state changes
3. **Event-Driven Logic**: Actions trigger state transitions
4. **Auto-Generated Documentation**: No manual documentation needed
5. **Mermaid Diagrams**: Visual representation of state flows

## Comparison with Legacy XState

Unlike the shopping-cart example which uses XState format, this example uses the native Praxis schema format. Benefits include:

- Unified schema for models, logic, and components
- Better integration with Praxis tools
- Richer metadata for documentation
- Support for facts and rules, not just states

## Next Steps

1. Modify the schema to add new states or transitions
2. Re-run praxisdoc to see updated documentation
3. Customize templates in `.praxisDoc.json`
4. Add your own Praxis schemas

For more information, see the [main README](../../README.md).
