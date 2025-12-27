/**
 * Example Praxis Schema - Task Management
 * 
 * This demonstrates a Praxis application schema with models, logic, and components.
 * Praxis uses a schema-driven approach where everything is defined declaratively.
 */

export const taskSchema = {
  version: '1.0.0',
  name: 'TaskManagement',
  description: 'Task management application with state transitions',
  
  models: [
    {
      name: 'Task',
      description: 'A task item in the system',
      fields: [
        { name: 'id', type: 'string', description: 'Unique identifier' },
        { name: 'title', type: 'string', description: 'Task title' },
        { name: 'description', type: 'string', description: 'Detailed description' },
        { name: 'status', type: 'string', default: 'new', description: 'Current status' },
        { name: 'assignee', type: 'string', description: 'Assigned user' },
        { name: 'createdAt', type: 'date', description: 'Creation timestamp' },
        { name: 'completedAt', type: 'date', description: 'Completion timestamp' },
      ],
      indexes: [
        { name: 'by_status', fields: ['status'] },
        { name: 'by_assignee', fields: ['assignee'] },
        { name: 'by_created', fields: ['createdAt'] },
      ],
    },
  ],
  
  logic: [
    {
      id: 'task-state-machine',
      name: 'Task State Machine',
      description: 'Manages task lifecycle from creation to completion',
      
      events: [
        { tag: 'TASK_CREATE', payload: { title: 'string', description: 'string' }, description: 'Create a new task' },
        { tag: 'TASK_ASSIGN', payload: { taskId: 'string', assignee: 'string' }, description: 'Assign task to a user' },
        { tag: 'TASK_START', payload: { taskId: 'string' }, description: 'Start working on task' },
        { tag: 'TASK_PAUSE', payload: { taskId: 'string' }, description: 'Pause work on task' },
        { tag: 'TASK_COMPLETE', payload: { taskId: 'string' }, description: 'Mark task as completed' },
        { tag: 'TASK_REOPEN', payload: { taskId: 'string' }, description: 'Reopen a completed task' },
        { tag: 'TASK_CANCEL', payload: { taskId: 'string' }, description: 'Cancel a task' },
      ],
      
      facts: [
        { tag: 'TaskCreated', payload: { taskId: 'string', title: 'string' }, description: 'Task was created' },
        { tag: 'TaskAssigned', payload: { taskId: 'string', assignee: 'string' }, description: 'Task was assigned' },
        { tag: 'TaskCompleted', payload: { taskId: 'string', completedAt: 'date' }, description: 'Task was completed' },
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
      description: 'Form for creating and editing tasks',
    },
    {
      name: 'TaskList',
      type: 'list',
      model: 'Task',
      description: 'List view of all tasks with filtering',
    },
    {
      name: 'TaskDetail',
      type: 'detail',
      model: 'Task',
      description: 'Detailed view of a single task',
    },
  ],
};
