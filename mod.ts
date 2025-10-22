
import { loadAdapters } from "./runtime.ts";
import { generateDocs } from "./src/generate.ts";

export type StateDocConfig = {
  projectTitle?: string;
  source: string;
  target: string;
  outline?: string;
  alwaysDisplayVisualizationAfterMachine?: boolean;
  globs?: string[];
  templates?: Record<string, string>;
  visualization?: { format?: "mermaid"; exportPng?: boolean };
};

export async function runOnce(cfg: StateDocConfig): Promise<void> {
  const adapters = await loadAdapters();
  return generateDocs(cfg, adapters);
}
