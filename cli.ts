// CLI entrypoint for statedoc
// When built with dnt, this becomes an npm binary with #!/usr/bin/env node
import { runOnce } from "./mod.ts";

function parseArgs(argv: string[]) {
  // Filter out --config argument to get the actual command
  const args = argv.filter(a => !a.startsWith("--config="));
  const cmd = args[0] ?? "gen";
  const configPath = argv.find(a => a.startsWith("--config="))?.split("=")[1] ?? ".stateDoc.json";
  return { cmd, configPath };
}

// Use a safer check that works with dnt's WASM transformer
const isDeno = typeof globalThis !== "undefined" && "Deno" in globalThis;

async function exitWithCode(code: number): Promise<never> {
  if (isDeno) {
    const DenoNS = (globalThis as any).Deno;
    DenoNS.exit(code);
  } else {
    const mod = await import("node:process");
    mod.default.exit(code);
  }
  // TypeScript needs this for type checking
  throw new Error("Exit failed");
}

async function readText(p: string): Promise<string> {
  try {
    if (isDeno) {
      const DenoNS = (globalThis as any).Deno;
      return await DenoNS.readTextFile(p);
    }
    const fs = await import("node:fs/promises");
    return await fs.readFile(p, "utf8");
  } catch (_e) {
    console.error(`Missing or unreadable config: ${p}`);
    await exitWithCode(1);
    return ""; // TypeScript needs this even though exitWithCode never returns
  }
}

async function writeText(p: string, content: string) {
  if (isDeno) {
    const DenoNS = (globalThis as any).Deno;
    await DenoNS.writeTextFile(p, content);
  } else {
    const fs = await import("node:fs/promises");
    await fs.writeFile(p, content, "utf8");
  }
}

async function fileExists(p: string): Promise<boolean> {
  try {
    if (isDeno) {
      const DenoNS = (globalThis as any).Deno;
      await DenoNS.stat(p);
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
    globs: ["**/*.schema.ts", "**/*.schema.js"],
    visualization: {
      format: "mermaid",
      exportPng: false
    }
  };

  await writeText(path, JSON.stringify(defaultConfig, null, 2) + "\n");
  console.log(`✓ Created config file: ${path}`);
  console.log("\nEdit the config file to customize:");
  console.log("  - projectTitle: Your project name");
  console.log("  - source: Directory containing your Praxis schema files");
  console.log("  - target: Output directory for documentation");
  console.log("  - globs: File patterns to match (e.g., **/*.schema.ts)");
  console.log("\nRun 'praxisdoc gen' to generate documentation.");
}

// Main function to avoid top-level await which is incompatible with CommonJS
async function main() {
  const argv = isDeno ? (globalThis as any).Deno.args : (await import("node:process")).argv.slice(2);
  const { cmd, configPath } = parseArgs(argv);

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
}

// Run the main function
main().catch((e) => {
  console.error("Fatal error:", e);
  if (isDeno) {
    const DenoNS = (globalThis as any).Deno;
    DenoNS.exit(1);
  } else {
    import("node:process").then(mod => mod.default.exit(1));
  }
});
// 'watch' could be added with chokidar/Deno.watchFs via adapters
