
import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

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
