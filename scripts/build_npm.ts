
import { build, emptyDir } from "@deno/dnt";

// Note: Using @deno/dnt@^0.41.3 instead of 0.42.3 due to WASM panic issue
// in dnt's Reflect.get (wasm/src/lib.rs line 56). Version 0.42.3 attempts
// to use Reflect.get on a non-object value, causing a panic. Revert to 0.41.3
// until the issue is fixed upstream.

await emptyDir("./npm");

try {
  await build({
    entryPoints: [
      "./mod.ts",
      { kind: "bin", name: "statedoc", path: "./cli.ts" }
    ],
    outDir: "./npm",
    shims: { deno: "dev" },
    package: JSON.parse(await Deno.readTextFile("package.json.template")),
    compilerOptions: { lib: ["ES2022", "DOM"] },
    typeCheck: false, // Skip type checking to avoid shim limitations
    test: false, // Skip tests to avoid test runner issues
  });
  console.log("Built to npm/");
} catch (error) {
  console.error("Failed to build npm package:");
  console.error(error);
  Deno.exit(1);
}
