import * as path from "@std/path";
import { ensureDir, walk } from "@std/fs";

export const isDeno = typeof (globalThis as any).Deno !== "undefined";

export interface FSLike {
  readFile(p: string): Promise<string>;
  writeFile(p: string, data: string): Promise<void>;
  mkdirp(p: string): Promise<void>;
  exists(p: string): Promise<boolean>;
}

export interface GlobLike {
  glob(cwd: string, patterns: string[]): Promise<string[]>;
}

export interface MermaidRenderer {
  toPng(mermaid: string): Promise<Uint8Array | null>;
}

export interface Adapters {
  fs: FSLike;
  glob: GlobLike;
  mermaid: MermaidRenderer;
  sep: string;
  join: (...parts: string[]) => string;
  dirname: (p: string) => string;
  relative: (from: string, to: string) => string;
}

export async function loadAdapters(): Promise<Adapters> {
  if (isDeno) {
    const walkGlob = async (cwd: string, patterns: string[]) => {
      const regs = patterns.map(p => path.globToRegExp(p, { extended: true, globstar: true }));
      const out: string[] = [];
      for await (const entry of walk(cwd, { includeDirs: false })) {
        const rel = path.relative(cwd, entry.path);
        if (regs.some(r => r.test(rel))) out.push(entry.path);
      }
      return out;
    };

    const mermaid: MermaidRenderer = { toPng(_mmd) { return Promise.resolve(null); } };

    const fs: FSLike = {
      readFile: p => Deno.readTextFile(p),
      writeFile: (p, d) => Deno.writeTextFile(p, d),
      mkdirp: p => ensureDir(p),
      exists: p => Deno.stat(p).then(()=>true).catch(()=>false),
    };

    return {
      fs,
      glob: { glob: walkGlob },
      mermaid,
      sep: path.SEPARATOR,
      join: path.join,
      dirname: path.dirname,
      relative: path.relative
    };
  } else {
    const fsP = await import("node:fs/promises");
    const nodePath = await import("node:path");
    const fg = (await import("fast-glob")).default as unknown as (p: string[], o: any)=>Promise<string[]>;
    const mermaid: MermaidRenderer = {
      toPng(_mmd) { return Promise.resolve(null); }
    };
    const fs: FSLike = {
      readFile: p => fsP.readFile(p, "utf8"),
      writeFile: (p, d) => fsP.writeFile(p, d, "utf8").then(()=>{}),
      mkdirp: p => fsP.mkdir(p, { recursive: true }).then(() => {}),
      exists: p => fsP.stat(p).then(() => true).catch(() => false),
    };
    return {
      fs,
      glob: { glob: (cwd, patterns) => fg(patterns, { cwd, absolute: true }) },
      mermaid,
      sep: nodePath.sep,
      join: nodePath.join,
      dirname: nodePath.dirname,
      relative: nodePath.relative
    };
  }
}
