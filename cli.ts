#!/usr/bin/env -S deno run -A
import { runOnce } from "./mod.ts";

function parseArgs(argv: string[]) {
  const cmd = argv[0] ?? "gen";
  const configPath = argv.find(a => a.startsWith("--config="))?.split("=")[1] ?? ".stateDoc.json";
  return { cmd, configPath };
}

const argv = (globalThis as any).Deno ? (Deno.args as string[]) : (await import("node:process")).argv.slice(2);
const { cmd, configPath } = parseArgs(argv);

async function exitWithCode(code: number): Promise<never> {
  if ((globalThis as any).Deno) {
    Deno.exit(code);
  } else {
    const mod = await import("node:process");
    mod.default.exit(code);
  }
  // TypeScript needs this for type checking
  throw new Error("Exit failed");
}

async function readText(p: string): Promise<string> {
  try {
    if ((globalThis as any).Deno) return await Deno.readTextFile(p);
    const fs = await import("node:fs/promises");
    return await fs.readFile(p, "utf8");
  } catch (_e) {
    console.error(`Missing or unreadable config: ${p}`);
    await exitWithCode(1);
  }
}

async function writeText(p: string, content: string) {
  if ((globalThis as any).Deno) {
    await Deno.writeTextFile(p, content);
  } else {
    const fs = await import("node:fs/promises");
    await fs.writeFile(p, content, "utf8");
  }
}

async function fileExists(p: string): Promise<boolean> {
  try {
    if ((globalThis as any).Deno) {
      await Deno.stat(p);
      return true;
    } else {
      const fs = await import("node:fs/promises");
      await fs.access(p);
      return true;
    }
  } catch {
    return false;
  }
}

async function initConfig(path: string) {
  if (await fileExists(path)) {
    console.error(`Config file already exists: ${path}`);
    console.log("Use a different path or remove the existing file.");
    await exitWithCode(1);
  }

  const defaultConfig = {
    projectTitle: "My Project",
    source: "./src",
    target: "./docs",
    globs: ["**/*.ts", "**/*.js"],
    visualization: {
      format: "mermaid",
      exportPng: false
    }
  };

  await writeText(path, JSON.stringify(defaultConfig, null, 2) + "\n");
  console.log(`✓ Created config file: ${path}`);
  console.log("\nEdit the config file to customize:");
  console.log("  - projectTitle: Your project name");
  console.log("  - source: Directory containing your FSM files");
  console.log("  - target: Output directory for documentation");
  console.log("  - globs: File patterns to match");
  console.log("\nRun 'statedoc gen' to generate documentation.");
}

if (cmd === "init") {
  await initConfig(configPath);
} else if (cmd === "gen") {
  const cfgText = await readText(configPath);
  try {
    const cfg = JSON.parse(cfgText);
    await runOnce(cfg);
  } catch (e) {
    console.error(`Invalid JSON in config file: ${configPath}`);
    console.error("Please check the file for syntax errors.");
    if (e instanceof SyntaxError) {
      console.error(`Parse error: ${e.message}`);
    }
    await exitWithCode(1);
  }
} else {
  console.error(`Unknown command: ${cmd}`);
  console.log("\nAvailable commands:");
  console.log("  init  - Create a new .stateDoc.json config file");
  console.log("  gen   - Generate documentation (default)");
  await exitWithCode(1);
}
// 'watch' could be added with chokidar/Deno.watchFs via adapters
