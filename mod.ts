
import { loadAdapters } from "./runtime.ts";
import { generateDocs } from "./src/generate.ts";

export type PraxisDocConfig = {
  projectTitle?: string;
  source: string;
  target: string;
  outline?: string;
  alwaysDisplayVisualizationAfterLogic?: boolean;
  globs?: string[];
  templates?: Record<string, string>;
  visualization?: { format?: "mermaid"; exportPng?: boolean };
};

export async function runOnce(cfg: PraxisDocConfig): Promise<void> {
  const adapters = await loadAdapters();
  return generateDocs(cfg, adapters);
}

// Re-export types from parser for external use
export type {
  PraxisSchema,
  PraxisModel,
  PraxisLogic,
  PraxisComponent,
  PraxisOrchestration,
} from "./src/parser.ts";

