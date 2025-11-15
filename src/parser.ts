import type { Adapters } from "../runtime.ts";
import type { StateDocConfig } from "../mod.ts";

export type Machine = {
  name: string;
  desc: string;
  slug: string;
  states: { name: string; desc: string; slug: string; on: { event: string; target: string }[] }[];
};

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Parse a machine object extracted from source code
 */
function parseMachineObject(machineObj: any, varName: string): Machine {
  const name = machineObj.id || varName;
  const slug = slugify(name);
  
  // Flatten all states (including nested ones)
  const states: Machine['states'] = [];
  
  function processStates(statesObj: any, prefix = '') {
    if (!statesObj || typeof statesObj !== 'object') return;
    
    for (const [stateName, stateConfig] of Object.entries(statesObj)) {
      const config = stateConfig as any;
      const fullName = prefix ? `${prefix}.${stateName}` : stateName;
      const desc = config.description || config.desc || '';
      const on: { event: string; target: string }[] = [];
      
      if (config.on) {
        for (const [event, transition] of Object.entries(config.on)) {
          const t = transition as any;
          let target = '';
          
          if (typeof t === 'string') {
            target = t;
          } else if (t && typeof t === 'object' && t.target) {
            target = t.target;
          }
          
          // Remove machine ID prefix from target (e.g., #shoppingCart.active -> active)
          target = target.replace(/^#[^.]+\./, '');
          
          if (target) {
            on.push({ event, target });
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
  
  return {
    name,
    desc: `State machine for ${name}`,
    slug,
    states
  };
}

/**
 * Extract machine definitions from a JavaScript/TypeScript file
 * This is a runtime evaluation approach - we import the file and extract exported machines
 */
async function extractMachinesFromFile(filePath: string, _adapters: Adapters): Promise<Machine[]> {
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
    const machines: Machine[] = [];
    
    // Look for exported objects that look like state machines
    for (const [exportName, exportValue] of Object.entries(module)) {
      if (exportValue && typeof exportValue === 'object') {
        const obj = exportValue as any;
        
        // Check if it looks like a state machine (has id or states property)
        if (obj.states || obj.id) {
          try {
            const machine = parseMachineObject(obj, exportName);
            machines.push(machine);
          } catch (e) {
            console.warn(`Warning: Failed to parse ${exportName} in ${filePath}:`, e);
          }
        }
      }
    }
    
    return machines;
  } catch (e) {
    console.warn(`Warning: Failed to import ${filePath}:`, e);
    return [];
  }
}

/**
 * Parse machines from all files matching the configuration
 */
export async function parseMachines(cfg: StateDocConfig, adapters: Adapters): Promise<Machine[]> {
  const globs = cfg.globs || ['**/*.machine.ts', '**/*.machine.js'];
  const files = await adapters.glob.glob(cfg.source, globs);
  
  const allMachines: Machine[] = [];
  
  for (const file of files) {
    const machines = await extractMachinesFromFile(file, adapters);
    allMachines.push(...machines);
  }
  
  if (allMachines.length === 0) {
    console.warn('No state machines found. Check your source path and globs configuration.');
  }
  
  return allMachines;
}
