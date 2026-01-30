import type { Adapters } from "../runtime.ts";
import type { PraxisDocConfig } from "../mod.ts";
import { slugify } from "./utils.ts";

// Praxis Schema Types (aligned with Praxis 1.2.x)
export type PraxisModel = {
  name: string;
  desc: string;
  fields?: Array<{ name: string; type: string; description?: string; default?: any; optional?: boolean; validation?: any[] }>;
  constraints?: Array<{ id: string; description: string; type: string; fields: string[] }>;
  indexes?: Array<{ name: string; fields: string[]; unique?: boolean; type?: string }>;
  relationships?: Array<{ name: string; type: string; target: string; foreignKey?: string; cascadeDelete?: boolean }>;
};

export type PraxisLogic = {
  id: string;
  name: string;
  desc: string;
  slug: string;
  events: Array<{ tag: string; payload?: Record<string, any>; description?: string }>;
  facts?: Array<{ tag: string; payload?: Record<string, any>; description?: string }>;
  rules?: Array<{ id: string; description: string; on?: string[]; when?: string; then: string; priority?: number }>;
  constraints?: Array<{ id: string; description: string; check: string; message: string }>;
  transitions?: Array<{ from: string; event: string; to: string; description?: string }>;
  states?: Array<{ name: string; desc: string; slug: string; on: Array<{ event: string; target: string; description?: string }> }>;
};

export type PraxisComponent = {
  name: string;
  type: string;
  model?: string;
  description?: string;
  props?: Array<{ name: string; type: string; required?: boolean; default?: any; description?: string }>;
  events?: Array<{ name: string; payload?: string; description?: string }>;
  layout?: { type: string; direction?: string; gap?: number; padding?: number; alignment?: string };
  styling?: { classes?: string[]; styles?: Record<string, string>; theme?: Record<string, string> };
};

export type PraxisOrchestration = {
  type: string;
  nodes?: Array<{ id: string; type: string; config: Record<string, any>; x?: number; y?: number; props?: Record<string, any>; bindings?: Record<string, any> }>;
  sync?: { interval: number; conflictResolution: string; targets: string[] };
  health?: { interval: number; endpoints: string[]; timeout: number };
};

export type PraxisSchema = {
  version?: string;
  name: string;
  desc: string;
  slug: string;
  models?: PraxisModel[];
  logic: PraxisLogic[];
  components?: PraxisComponent[];
  orchestration?: PraxisOrchestration;
  metadata?: Record<string, any>;
};

/**
 * Parse a Praxis schema object extracted from source code (Praxis 1.2.x format)
 */
function parsePraxisSchema(schemaObj: any, varName: string): PraxisSchema {
  const name = schemaObj.name || varName;
  const slug = slugify(name);
  const desc = schemaObj.description || `Praxis application schema for ${name}`;
  
  // Parse models (enhanced for Praxis 1.2.x)
  const models: PraxisModel[] = [];
  if (schemaObj.models && Array.isArray(schemaObj.models)) {
    for (const model of schemaObj.models) {
      models.push({
        name: model.name || 'Unknown',
        desc: model.description || `Model for ${model.name || 'Unknown'}`,
        fields: model.fields || [],
        constraints: model.constraints,
        indexes: model.indexes,
        relationships: model.relationships
      });
    }
  }
  
  // Parse logic definitions (facts, events, rules, constraints, transitions)
  const logic: PraxisLogic[] = [];
  if (schemaObj.logic && Array.isArray(schemaObj.logic)) {
    for (const logicDef of schemaObj.logic) {
      const logicId = logicDef.id || 'unknown-logic';
      const logicName = logicDef.name || logicDef.id || 'Unknown Logic';
      const logicDesc = logicDef.description || `Logic definition for ${logicName}`;
      
      // Extract events
      const events = (logicDef.events || []).map((evt: any) => ({
        tag: evt.tag || evt.type || 'UNKNOWN_EVENT',
        payload: evt.payload,
        description: evt.description || evt.desc
      }));
      
      // Extract facts
      const facts = (logicDef.facts || []).map((fact: any) => ({
        tag: fact.tag || fact.type || 'UNKNOWN_FACT',
        payload: fact.payload,
        description: fact.description || fact.desc
      }));
      
      // Extract rules (new in Praxis 1.2.x)
      const rules = (logicDef.rules || []).map((rule: any) => ({
        id: rule.id,
        description: rule.description,
        on: rule.on,
        when: rule.when,
        then: rule.then,
        priority: rule.priority
      }));
      
      // Extract constraints (new in Praxis 1.2.x)
      const constraints = (logicDef.constraints || []).map((constraint: any) => ({
        id: constraint.id,
        description: constraint.description,
        check: constraint.check,
        message: constraint.message
      }));
      
      // Extract transitions (if defined)
      const transitions = (logicDef.transitions || []).map((trans: any) => ({
        from: trans.from || '',
        event: trans.event || '',
        to: trans.to || trans.target || '',
        description: trans.description || trans.desc
      }));
      
      // Convert transitions to state representation for compatibility
      const states: Array<{ name: string; desc: string; slug: string; on: Array<{ event: string; target: string; description?: string }> }> = [];
      if (transitions.length > 0) {
        const stateMap = new Map<string, { name: string; desc: string; slug: string; on: Array<{ event: string; target: string; description?: string }> }>();
        
        for (const trans of transitions) {
          if (!stateMap.has(trans.from)) {
            stateMap.set(trans.from, {
              name: trans.from,
              desc: `State: ${trans.from}`,
              slug: slugify(trans.from),
              on: []
            });
          }
          
          const state = stateMap.get(trans.from)!;
          state.on.push({
            event: trans.event,
            target: trans.to,
            description: trans.description
          });
        }
        
        states.push(...Array.from(stateMap.values()));
      }
      
      logic.push({
        id: logicId,
        name: logicName,
        desc: logicDesc,
        slug: slugify(logicId),
        events,
        facts,
        rules: rules.length > 0 ? rules : undefined,
        constraints: constraints.length > 0 ? constraints : undefined,
        transitions,
        states: states.length > 0 ? states : undefined
      });
    }
  }
  
  // Parse components (enhanced for Praxis 1.2.x)
  const components: PraxisComponent[] = [];
  if (schemaObj.components && Array.isArray(schemaObj.components)) {
    for (const comp of schemaObj.components) {
      components.push({
        name: comp.name,
        type: comp.type,
        model: comp.model,
        description: comp.description,
        props: comp.props,
        events: comp.events,
        layout: comp.layout,
        styling: comp.styling
      });
    }
  }
  
  return {
    version: schemaObj.version,
    name,
    desc,
    slug,
    models,
    logic,
    components: components.length > 0 ? components : undefined,
    orchestration: schemaObj.orchestration,
    metadata: schemaObj.metadata
  };
}

/**
 * Extract Praxis schemas from a JavaScript/TypeScript file
 * This is a runtime evaluation approach - we import the file and extract exported schemas
 */
async function extractSchemasFromFile(filePath: string, _adapters: Adapters): Promise<PraxisSchema[]> {
  try {
    // Convert to absolute file:// URL
    let importPath = filePath;
    if (!importPath.startsWith('file://') && !importPath.startsWith('http://') && !importPath.startsWith('https://')) {
      // Check if Deno is available using safer pattern to avoid WASM transformation issues
      const isDeno = typeof globalThis !== "undefined" && "Deno" in globalThis;
      
      // Make it absolute if it's not already
      if (!importPath.startsWith('/')) {
        if (isDeno) {
          // Access Deno dynamically to avoid WASM transformer issues with direct global access
          const DenoNS = (globalThis as any).Deno;
          importPath = `${DenoNS.cwd()}/${importPath}`;
        } else {
          const process = await import("node:process");
          importPath = `${process.cwd()}/${importPath}`;
        }
      }
      importPath = `file://${importPath}`;
    }
    
    // Import the file as a module
    const module = await import(importPath);
    const schemas: PraxisSchema[] = [];
    
    // Look for exported objects that look like Praxis schemas or legacy XState machines
    for (const [exportName, exportValue] of Object.entries(module)) {
      if (exportValue && typeof exportValue === 'object') {
        const obj = exportValue as any;
        
        // Check if it's a Praxis schema (has models or logic property)
        if (obj.logic || obj.models) {
          try {
            const schema = parsePraxisSchema(obj, exportName);
            schemas.push(schema);
          } catch (e) {
            console.warn(`Warning: Failed to parse Praxis schema ${exportName} in ${filePath}:`, e);
          }
        }
        // Legacy support: Check if it looks like an XState machine (has id or states property)
        else if (obj.states || obj.id) {
          try {
            // Convert XState machine to Praxis schema format
            const machine = parseLegacyXStateMachine(obj, exportName);
            schemas.push(machine);
          } catch (e) {
            console.warn(`Warning: Failed to parse legacy XState machine ${exportName} in ${filePath}:`, e);
          }
        }
      }
    }
    
    return schemas;
  } catch (e) {
    console.warn(`Warning: Failed to import ${filePath}:`, e);
    return [];
  }
}

/**
 * Parse legacy XState machine and convert to Praxis schema format
 */
function parseLegacyXStateMachine(machineObj: any, varName: string): PraxisSchema {
  const name = machineObj.id || varName;
  const slug = slugify(name);
  
  // Flatten all states (including nested ones)
  const states: Array<{ name: string; desc: string; slug: string; on: Array<{ event: string; target: string; description?: string }> }> = [];
  const events = new Set<string>();
  
  function processStates(statesObj: any, prefix = '') {
    if (!statesObj || typeof statesObj !== 'object') return;
    
    for (const [stateName, stateConfig] of Object.entries(statesObj)) {
      const config = stateConfig as any;
      const fullName = prefix ? `${prefix}.${stateName}` : stateName;
      const desc = config.description || config.desc || '';
      const on: { event: string; target: string; description?: string }[] = [];
      
      if (config.on) {
        for (const [event, transition] of Object.entries(config.on)) {
          events.add(event);
          const t = transition as any;
          let target = '';
          let description = '';
          
          if (typeof t === 'string') {
            target = t;
          } else if (t && typeof t === 'object') {
            target = t.target || '';
            description = t.description || t.desc || '';
          }
          
          // Remove machine ID prefix from target (e.g., #shoppingCart.active -> active)
          target = target.replace(/^#[^.]+\./, '');
          
          if (target) {
            on.push({ event, target, description });
          }
        }
      }
      
      states.push({
        name: fullName,
        desc,
        slug: slugify(fullName),
        on
      });
      
      // Process nested states
      if (config.states && typeof config.states === 'object') {
        processStates(config.states, fullName);
      }
    }
  }
  
  if (machineObj.states) {
    processStates(machineObj.states);
  }
  
  // Create a Praxis-compatible logic definition from the XState machine
  const logic: PraxisLogic = {
    id: name,
    name: name,
    desc: `State machine for ${name} (converted from XState)`,
    slug: slug,
    events: Array.from(events).map(tag => ({ tag })),
    states
  };
  
  return {
    name,
    desc: `State machine for ${name} (converted from XState)`,
    slug,
    logic: [logic]
  };
}

/**
 * Parse Praxis schemas from all files matching the configuration
 */
export async function parseSchemas(cfg: PraxisDocConfig, adapters: Adapters): Promise<PraxisSchema[]> {
  const globs = cfg.globs || ['**/*.schema.ts', '**/*.schema.js', '**/*.machine.ts', '**/*.machine.js'];
  const files = await adapters.glob.glob(cfg.source, globs);
  
  const allSchemas: PraxisSchema[] = [];
  
  for (const file of files) {
    const schemas = await extractSchemasFromFile(file, adapters);
    allSchemas.push(...schemas);
  }
  
  if (allSchemas.length === 0) {
    console.warn('No Praxis schemas found. Check your source path and globs configuration.');
    console.warn('Looking for files with .schema.ts/.schema.js extensions or legacy .machine.ts/.machine.js files.');
  }
  
  return allSchemas;
}
