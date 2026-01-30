# Praxis 1.2.x Support

This document describes praxisdoc's support for Praxis 1.2.x enhanced features.

## Overview

As of version 2.1.0, praxisdoc fully supports the enhanced schema format introduced in Praxis 1.2.x. This includes:

- Enhanced model definitions with constraints, indexes, and relationships
- Business rules in logic definitions with conditions and actions
- Runtime constraints with validation
- Enhanced component definitions with props, events, layout, and styling
- Orchestration configuration for distributed systems

## Enhanced Model Definitions

### Field Validation

Models now support field-level validation rules:

```typescript
{
  name: 'email',
  type: 'string',
  validation: [
    { type: 'required' },
    { type: 'pattern', value: '^[^@]+@[^@]+\\.[^@]+$', message: 'Invalid email' }
  ]
}
```

### Model Constraints

Define constraints at the model level:

```typescript
{
  constraints: [
    {
      id: 'unique_email',
      description: 'Email must be unique',
      type: 'unique',
      fields: ['email']
    },
    {
      id: 'valid_age',
      description: 'Age must be positive',
      type: 'check',
      fields: ['age']
    }
  ]
}
```

### Indexes

Optimize queries with database indexes:

```typescript
{
  indexes: [
    {
      name: 'by_email',
      fields: ['email'],
      unique: true,
      type: 'hash'
    },
    {
      name: 'by_name_created',
      fields: ['name', 'createdAt'],
      type: 'btree'
    }
  ]
}
```

### Relationships

Define relationships between models:

```typescript
{
  relationships: [
    {
      name: 'posts',
      type: 'one-to-many',
      target: 'Post',
      foreignKey: 'authorId',
      cascadeDelete: true
    }
  ]
}
```

## Business Rules

Logic definitions now support business rules with conditions and actions:

```typescript
{
  rules: [
    {
      id: 'notify_high_priority',
      description: 'Notify admin when high priority item created',
      on: ['ITEM_CREATE'],
      when: 'event.payload.priority >= 4',
      then: 'emit("NOTIFY_ADMIN", { itemId: event.payload.id })',
      priority: 1
    }
  ]
}
```

### Rule Components

- **id**: Unique identifier for the rule
- **description**: Human-readable description
- **on**: Array of event triggers
- **when**: Optional condition (JavaScript expression)
- **then**: Action to execute (JavaScript expression)
- **priority**: Execution priority (lower number = higher priority)

## Runtime Constraints

Define validation that runs during state transitions:

```typescript
{
  constraints: [
    {
      id: 'cannot_complete_unassigned',
      description: 'Cannot complete a task without an assignee',
      check: 'state.tasks[taskId].assignee !== null',
      message: 'Task must be assigned before completion'
    }
  ]
}
```

## Enhanced Components

### Component Props

Define component properties with types and defaults:

```typescript
{
  props: [
    {
      name: 'taskId',
      type: 'string',
      required: true,
      description: 'ID of the task to display'
    },
    {
      name: 'editable',
      type: 'boolean',
      default: false,
      description: 'Whether the task can be edited'
    }
  ]
}
```

### Component Events

Define events with payload types:

```typescript
{
  events: [
    {
      name: 'submit',
      payload: 'Task',
      description: 'Fired when form is submitted'
    },
    {
      name: 'taskSelected',
      payload: 'string',
      description: 'Fired when a task is selected'
    }
  ]
}
```

### Layout Configuration

Define component layout:

```typescript
{
  layout: {
    type: 'stack',
    direction: 'vertical',
    gap: 16,
    padding: 24,
    alignment: 'center'
  }
}
```

Supported layout types:
- `stack`: Vertical or horizontal stack
- `grid`: CSS Grid layout
- `flex`: Flexbox layout
- `absolute`: Absolute positioning

### Styling

Define component styling:

```typescript
{
  styling: {
    classes: ['task-form', 'elevated'],
    styles: {
      'background-color': '#f5f5f5',
      'border-radius': '8px'
    },
    theme: {
      primary: 'blue',
      spacing: 'comfortable'
    }
  }
}
```

## Orchestration

Define distributed system configuration:

```typescript
{
  orchestration: {
    type: 'mcp',
    nodes: [
      {
        id: 'processor',
        type: 'terminal',
        config: { command: 'node', args: ['process.js'] },
        x: 100,
        y: 100,
        bindings: {
          output: '/processing/output',
          input: '/processing/input'
        }
      }
    ],
    sync: {
      interval: 5000,
      conflictResolution: 'last-write-wins',
      targets: ['local', 'cloud']
    },
    health: {
      interval: 30000,
      endpoints: ['/health', '/ready'],
      timeout: 5000
    }
  }
}
```

### Node Configuration

- **id**: Unique node identifier
- **type**: Node type (terminal, webhook, custom)
- **config**: Type-specific configuration
- **x, y**: Position for canvas visualization
- **props**: Node-specific properties
- **bindings**: Connections to PluresDB paths

### Synchronization

- **interval**: Sync frequency in milliseconds
- **conflictResolution**: Strategy for conflicts (last-write-wins, merge, custom)
- **targets**: Sync targets (local, cloud, etc.)

### Health Checks

- **interval**: Check frequency in milliseconds
- **endpoints**: Health check endpoints
- **timeout**: Request timeout in milliseconds

## Documentation Generation

praxisdoc automatically generates documentation for all Praxis 1.2.x features:

### Model Documentation

- Field types and descriptions
- Validation rules
- Constraints
- Indexes
- Relationships

### Logic Documentation

- Events and facts
- Business rules with conditions and actions
- Runtime constraints
- State transitions

### Component Documentation

- Component type and model binding
- Props with types and defaults
- Events with payloads
- Layout configuration
- Styling information

### Orchestration Documentation

- Node configuration
- Bindings to data paths
- Synchronization settings
- Health check configuration

## Examples

See the `examples/task-management-v2` directory for a comprehensive example demonstrating all Praxis 1.2.x features.

## Migration from Basic Schemas

To upgrade existing schemas to Praxis 1.2.x:

1. Add field validation to models
2. Define constraints and indexes
3. Add relationships between models
4. Convert state transitions to rules with conditions
5. Add runtime constraints for validation
6. Enhance component definitions with props and events
7. Add orchestration configuration if needed

## Version Compatibility

- praxisdoc 2.0.x: Supports basic Praxis schemas
- praxisdoc 2.1.0+: Full Praxis 1.2.x support
- Backward compatible with basic schemas

## Resources

- [Praxis Documentation](https://github.com/plures/praxis)
- [Praxis 1.2.x Changelog](https://github.com/plures/praxis/blob/main/CHANGELOG.md)
- [Example Schemas](../examples/task-management-v2)
