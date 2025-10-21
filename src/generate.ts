
import type { Adapters } from "../runtime.ts";
import type { StateDocConfig } from "../mod.ts";
import { renderTemplate } from "./tpl.ts";

type Machine = {
  name: string; desc: string; slug: string;
  states: { name: string; desc: string; slug: string; on: { event: string; target: string }[] }[];
};

// Placeholder parser. Replace with TS compiler API extraction.
async function fakeParseMachines(_cfg: StateDocConfig, adapters: Adapters): Promise<Machine[]> {
  // Generates one demo machine so the pipeline runs end-to-end.
  return [{
    name: "demoMachine",
    desc: "Demo machine parsed placeholder",
    slug: "demo-machine",
    states: [
      { name: "idle", desc: "Waiting", slug: "idle", on: [{ event: "START", target: "running"}] },
      { name: "running", desc: "Working", slug: "running", on: [{ event: "STOP", target: "idle"}] }
    ]
  }];
}

export async function generateDocs(cfg: StateDocConfig, adapters: Adapters) {
  const machines = await fakeParseMachines(cfg, adapters);

  // Ensure target dirs
  await adapters.fs.mkdirp(cfg.target);
  await adapters.fs.mkdirp(adapters.join(cfg.target, "machines"));

  // Index
  const outline = cfg.outline ?? "# {{projectTitle}}\n{{#each machines}}\n## {{name}}\n{{desc}}\n{{/each}}";
  const indexMd = renderTemplate(outline, { projectTitle: cfg.projectTitle ?? "FSM Docs", machines });
  await adapters.fs.writeFile(adapters.join(cfg.target, "index.md"), indexMd);

  // Per-machine docs
  const machineTpl = cfg.templates?.machineIndex ?? "## {{name}}\n{{desc}}\n\nStates:\n{{#each states}}- [{{name}}](./states/{{slug}}.md) — {{desc}}\n{{/each}}\n";
  const stateTpl = cfg.templates?.statePage ?? "# {{machine.name}} / {{name}}\n{{desc}}\n\nTransitions:\n{{#each on}}- {{event}} → {{target}}\n{{/each}}\n";

  for (const m of machines) {
    const mdir = adapters.join(cfg.target, "machines", m.slug);
    const sdir = adapters.join(mdir, "states");
    await adapters.fs.mkdirp(sdir);

    const mReadme = renderTemplate(machineTpl, m);
    await adapters.fs.writeFile(adapters.join(mdir, "README.md"), mReadme);

    for (const s of m.states) {
      const page = renderTemplate(stateTpl, { ...s, machine: m });
      await adapters.fs.writeFile(adapters.join(sdir, `${s.slug}.md`), page);
    }

    // Mermaid diagram (text only for now)
    const lines = [
      "stateDiagram-v2",
      `  [*] --> ${m.states[0]?.slug ?? "idle"}`,
      ...m.states.flatMap(st => st.on.map(tr => `  ${st.slug} --> ${tr.target}: ${tr.event}`))
    ];
    await adapters.fs.writeFile(adapters.join(mdir, "diagram.mmd"), lines.join("\n"));
  }
}
