
import { build, emptyDir } from "jsr:@deno/dnt@^0.41.3";

await emptyDir("./npm");

await build({
  entryPoints: [
    "./mod.ts",
    { kind: "bin", name: "statedoc", path: "./cli.ts" }
  ],
  outDir: "./npm",
  shims: { deno: "dev" },
  package: JSON.parse(await Deno.readTextFile("package.json.template")),
  compilerOptions: { lib: ["ES2022", "DOM"] }
});
console.log("Built to npm/");
