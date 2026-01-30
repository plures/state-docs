/**
 * Example Praxis Schema - Task Management (Praxis 1.2.x)
 * 
 * This demonstrates enhanced Praxis 1.2.x features including:
 * - Enhanced model definitions with constraints, indexes, and relationships
 * - Rules and constraints in logic definitions
 * - Enhanced component definitions with props, events, layout, and styling
 * - Orchestration configuration
 */

export const taskSchemaV2 = {
  version: '1.2.0',
  name: 'TaskManagementV2',
  description: 'Enhanced task management application with Praxis 1.2.x features',
  
  models: [
    {
      name: 'Task',
      description: 'A task item in the system',
      fields: [
        { name: 'id', type: 'string', description: 'Unique identifier', optional: false },
        { name: 'title', type: 'string', description: 'Task title', validation: [{ type: 'required' }, { type: 'min', value: 3 }] },
        { name: 'description', type: 'string', description: 'Detailed description', optional: true },
        { name: 'status', type: 'string', default: 'new', description: 'Current status' },
        { name: 'assignee', type: 'string', description: 'Assigned user', optional: true },
        { name: 'priority', type: 'number', default: 0, description: 'Task priority (0-5)' },
        { name: 'createdAt', type: 'date', description: 'Creation timestamp' },
        { name: 'completedAt', type: 'date', description: 'Completion timestamp', optional: true },
        { name: 'tags', type: 'string[]', description: 'Task tags', optional: true },
      ],
      constraints: [
        {
          id: 'unique_title',
          description: 'Task titles must be unique',
          type: 'unique',
          fields: ['title']
        },
        {
          id: 'valid_priority',
          description: 'Priority must be between 0 and 5',
          type: 'check',
          fields: ['priority']
        }
      ],
      indexes: [
        { name: 'by_status', fields: ['status'], type: 'btree' },
        { name: 'by_assignee', fields: ['assignee'], type: 'btree' },
        { name: 'by_created', fields: ['createdAt'], type: 'btree' },
        { name: 'by_priority', fields: ['priority', 'createdAt'], type: 'btree' },
        { name: 'search_title_desc', fields: ['title', 'description'], type: 'fulltext' },
      ],
      relationships: [
        {
          name: 'assignedTo',
          type: 'one-to-one',
          target: 'User',
          foreignKey: 'assignee',
        }
      ]
    },
    {
      name: 'User',
      description: 'User who can be assigned tasks',
      fields: [
        { name: 'id', type: 'string', description: 'Unique identifier' },
        { name: 'name', type: 'string', description: 'User full name' },
        { name: 'email', type: 'string', description: 'User email' },
        { name: 'role', type: 'string', default: 'user', description: 'User role' },
      ],
      constraints: [
        {
          id: 'unique_email',
          description: 'Email must be unique',
          type: 'unique',
          fields: ['email']
        }
      ],
      indexes: [
        { name: 'by_email', fields: ['email'], unique: true, type: 'hash' },
      ],
      relationships: [
        {
          name: 'tasks',
          type: 'one-to-many',
          target: 'Task',
          foreignKey: 'assignee',
          cascadeDelete: false
        }
      ]
    },
  ],
  
  logic: [
    {
      id: 'task-state-machine',
      name: 'Task State Machine',
      description: 'Manages task lifecycle from creation to completion with business rules',
      
      events: [
        { tag: 'TASK_CREATE', payload: { taskId: 'string', title: 'string', description: 'string', priority: 'number' }, description: 'Create a new task' },
        { tag: 'TASK_ASSIGN', payload: { taskId: 'string', assignee: 'string' }, description: 'Assign task to a user' },
        { tag: 'TASK_START', payload: { taskId: 'string' }, description: 'Start working on task' },
        { tag: 'TASK_PAUSE', payload: { taskId: 'string' }, description: 'Pause work on task' },
        { tag: 'TASK_COMPLETE', payload: { taskId: 'string' }, description: 'Mark task as completed' },
        { tag: 'TASK_REOPEN', payload: { taskId: 'string' }, description: 'Reopen a completed task' },
        { tag: 'TASK_CANCEL', payload: { taskId: 'string' }, description: 'Cancel a task' },
        { tag: 'TASK_SET_PRIORITY', payload: { taskId: 'string', priority: 'number' }, description: 'Update task priority' },
      ],
      
      facts: [
        { tag: 'TaskCreated', payload: { taskId: 'string', title: 'string', createdAt: 'date' }, description: 'Task was created' },
        { tag: 'TaskAssigned', payload: { taskId: 'string', assignee: 'string', assignedAt: 'date' }, description: 'Task was assigned' },
        { tag: 'TaskCompleted', payload: { taskId: 'string', completedAt: 'date' }, description: 'Task was completed' },
        { tag: 'TaskPriorityChanged', payload: { taskId: 'string', oldPriority: 'number', newPriority: 'number' }, description: 'Task priority was changed' },
      ],
      
      rules: [
        {
          id: 'auto_assign_high_priority',
          description: 'Automatically notify when high priority task is created',
          on: ['TASK_CREATE'],
          when: 'event.payload.priority >= 4',
          then: 'emit("NOTIFY_ADMIN", { taskId: event.payload.taskId, reason: "high_priority" })',
          priority: 1
        },
        {
          id: 'validate_assignee',
          description: 'Validate that assignee exists before assignment',
          on: ['TASK_ASSIGN'],
          when: 'state.users[event.payload.assignee] !== undefined',
          then: 'transition("assigned")',
          priority: 2
        },
        {
          id: 'record_completion_time',
          description: 'Record completion timestamp when task is completed',
          on: ['TASK_COMPLETE'],
          then: 'emit("TaskCompleted", { taskId: event.payload.taskId, completedAt: new Date() })',
          priority: 1
        }
      ],
      
      constraints: [
        {
          id: 'no_complete_without_assignee',
          description: 'Cannot complete a task without an assignee',
          check: 'state.tasks[taskId].assignee !== null',
          message: 'Task must be assigned before it can be completed'
        },
        {
          id: 'priority_in_range',
          description: 'Priority must be between 0 and 5',
          check: 'event.payload.priority >= 0 && event.payload.priority <= 5',
          message: 'Task priority must be between 0 and 5'
        }
      ],
      
      transitions: [
        { from: 'new', event: 'TASK_ASSIGN', to: 'assigned', description: 'Assign a new task' },
        { from: 'assigned', event: 'TASK_START', to: 'in_progress', description: 'Start working on assigned task' },
        { from: 'in_progress', event: 'TASK_PAUSE', to: 'paused', description: 'Pause work' },
        { from: 'paused', event: 'TASK_START', to: 'in_progress', description: 'Resume work' },
        { from: 'in_progress', event: 'TASK_COMPLETE', to: 'completed', description: 'Complete the task' },
        { from: 'completed', event: 'TASK_REOPEN', to: 'assigned', description: 'Reopen completed task' },
        { from: 'new', event: 'TASK_CANCEL', to: 'cancelled', description: 'Cancel before assignment' },
        { from: 'assigned', event: 'TASK_CANCEL', to: 'cancelled', description: 'Cancel assigned task' },
      ],
    },
  ],
  
  components: [
    {
      name: 'TaskForm',
      type: 'form',
      model: 'Task',
      description: 'Form for creating and editing tasks with validation',
      props: [
        { name: 'taskId', type: 'string', required: false, description: 'Task ID for editing (empty for new task)' },
        { name: 'initialValues', type: 'object', required: false, description: 'Initial form values' },
      ],
      events: [
        { name: 'submit', payload: 'Task', description: 'Fired when form is submitted' },
        { name: 'cancel', description: 'Fired when form is cancelled' },
      ],
      layout: {
        type: 'stack',
        direction: 'vertical',
        gap: 16,
        padding: 24
      },
      styling: {
        classes: ['task-form', 'elevated'],
        theme: {
          primary: 'blue',
          spacing: 'comfortable'
        }
      }
    },
    {
      name: 'TaskList',
      type: 'list',
      model: 'Task',
      description: 'List view of all tasks with filtering and sorting',
      props: [
        { name: 'filterStatus', type: 'string', required: false, description: 'Filter by task status' },
        { name: 'sortBy', type: 'string', default: 'createdAt', description: 'Sort field' },
        { name: 'sortOrder', type: 'string', default: 'desc', description: 'Sort order (asc/desc)' },
      ],
      events: [
        { name: 'taskSelected', payload: 'string', description: 'Fired when a task is selected' },
        { name: 'taskAction', payload: '{ action: string, taskId: string }', description: 'Fired when an action is performed on a task' },
      ],
      layout: {
        type: 'grid',
        gap: 8
      }
    },
    {
      name: 'TaskDetail',
      type: 'display',
      model: 'Task',
      description: 'Detailed view of a single task with actions',
      props: [
        { name: 'taskId', type: 'string', required: true, description: 'ID of the task to display' },
        { name: 'editable', type: 'boolean', default: false, description: 'Whether the task can be edited' },
      ],
      events: [
        { name: 'edit', description: 'Fired when edit button is clicked' },
        { name: 'delete', description: 'Fired when delete button is clicked' },
        { name: 'statusChange', payload: 'string', description: 'Fired when status is changed' },
      ],
      layout: {
        type: 'stack',
        direction: 'vertical',
        gap: 12
      }
    },
    {
      name: 'TaskBoard',
      type: 'custom',
      description: 'Kanban-style task board',
      props: [
        { name: 'columns', type: 'string[]', required: true, description: 'Status columns to display' },
        { name: 'allowDragDrop', type: 'boolean', default: true, description: 'Enable drag and drop' },
      ],
      events: [
        { name: 'taskMoved', payload: '{ taskId: string, from: string, to: string }', description: 'Fired when a task is moved between columns' },
      ],
      layout: {
        type: 'flex',
        direction: 'horizontal',
        gap: 16
      }
    },
  ],
  
  orchestration: {
    type: 'mcp',
    nodes: [
      {
        id: 'task_processor',
        type: 'terminal',
        config: {
          command: 'node',
          args: ['./scripts/process-tasks.js']
        },
        x: 100,
        y: 100,
        props: {
          inputMode: 'text',
          history: [],
          lastOutput: null
        },
        bindings: {
          output: '/tasks/processing/output',
          input: '/tasks/processing/input'
        }
      },
      {
        id: 'notification_service',
        type: 'webhook',
        config: {
          url: 'https://api.example.com/notifications',
          method: 'POST'
        },
        x: 300,
        y: 100,
        bindings: {
          input: '/tasks/notifications/queue'
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
  },
  
  metadata: {
    author: 'Praxis Team',
    version: '2.0.0',
    tags: ['task-management', 'productivity', 'workflow'],
    documentation: 'https://docs.example.com/task-management'
  }
};
