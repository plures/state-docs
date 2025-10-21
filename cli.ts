#!/usr/bin/env -S deno run -A
import { runOnce } from "./mod.ts";

function parseArgs(argv: string[]) {
  const cmd = argv[0] ?? "gen";
  const configPath = argv.find(a => a.startsWith("--config="))?.split("=")[1] ?? ".stateDoc.json";
  return { cmd, configPath };
}

const argv = (globalThis as any).Deno ? (Deno.args as string[]) : process.argv.slice(2);
const { cmd, configPath } = parseArgs(argv);

async function readText(p: string) {
  try {
    if ((globalThis as any).Deno) return await Deno.readTextFile(p);
    const fs = await import("node:fs/promises");
    return await fs.readFile(p, "utf8");
  } catch (_e) {
    console.error(`Missing or unreadable config: ${p}`);
    (globalThis as any).Deno?.exit?.(1); (globalThis as any).process?.exit?.(1);
  }
}

const cfgText = await readText(configPath);
const cfg = JSON.parse(cfgText!);

if (cmd === "gen") await runOnce(cfg);
// 'watch' could be added with chokidar/Deno.watchFs via adapters
