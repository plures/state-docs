
import type { Adapters } from "../runtime.ts";
import type { StateDocConfig } from "../mod.ts";
import { renderTemplate } from "./tpl.ts";
import { parseMachines } from "./parser.ts";

export async function generateDocs(cfg: StateDocConfig, adapters: Adapters) {
  const machines = await parseMachines(cfg, adapters);

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
      ...m.states.flatMap((st: { slug: string; on: { event: string; target: string }[] }) =>
        st.on.map((tr: { event: string; target: string }) => `  ${st.slug} --> ${tr.target}: ${tr.event}`)
      )
    ];
    await adapters.fs.writeFile(adapters.join(mdir, "diagram.mmd"), lines.join("\n"));
  }
}
