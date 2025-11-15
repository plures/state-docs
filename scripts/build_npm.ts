
import { build, emptyDir } from "@deno/dnt";

// Updated to @deno/dnt@^0.42.3 to fix @types/node version resolution issue.
// Previous version 0.41.3 attempted to use @types/node@24.2.0 which doesn't
// exist in the npm registry, causing build failures.

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
    packageManager: "npm",
    skipNpmInstall: false, // We need npm install to verify dependencies work
    scriptModule: false,
    postBuild() {
      // No additional post-build steps needed
    },
  });
  console.log("Built to npm/");
} catch (error) {
  console.error("Failed to build npm package:");
  console.error(error);
  Deno.exit(1);
}
