
import type { Adapters } from "../runtime.ts";
import type { PraxisDocConfig } from "../mod.ts";
import { renderTemplate } from "./tpl.ts";
import { parseSchemas } from "./parser.ts";

export async function generateDocs(cfg: PraxisDocConfig, adapters: Adapters) {
  const schemas = await parseSchemas(cfg, adapters);

  // Ensure target dirs
  await adapters.fs.mkdirp(cfg.target);
  await adapters.fs.mkdirp(adapters.join(cfg.target, "schemas"));

  // Index - list all schemas
  const outline = cfg.outline ?? "# {{projectTitle}}\n{{#each schemas}}\n## {{name}}\n{{desc}}\n\n### Logic Definitions\n{{#each logic}}- [{{name}}](./schemas/{{../slug}}/logic/{{slug}}.md) — {{desc}}\n{{/each}}\n{{/each}}";
  const indexMd = renderTemplate(outline, { projectTitle: cfg.projectTitle ?? "Praxis Application Documentation", schemas });
  await adapters.fs.writeFile(adapters.join(cfg.target, "index.md"), indexMd);

  // Per-schema docs
  const schemaTpl = cfg.templates?.schemaIndex ?? "# {{name}}\n\n{{desc}}\n\n## Models\n{{#each models}}\n### {{name}}\n{{desc}}\n\nFields:\n{{#each fields}}- **{{name}}** ({{type}}){{#if description}} — {{description}}{{/if}}\n{{/each}}\n{{/each}}\n\n## Logic Definitions\n{{#each logic}}- [{{name}}](./logic/{{slug}}.md) — {{desc}}\n{{/each}}\n";
  const logicTpl = cfg.templates?.logicPage ?? "# {{schema.name}} / {{name}}\n\n{{desc}}\n\n## Events\n{{#each events}}- **{{tag}}**{{#if description}} — {{description}}{{/if}}\n{{/each}}\n\n{{#if states}}## States\n{{#each states}}\n### {{name}}\n{{desc}}\n\nTransitions:\n{{#each on}}- {{event}} → {{target}}{{#if description}} — {{description}}{{/if}}\n{{/each}}\n{{/each}}\n{{/if}}\n{{#if facts}}## Facts\n{{#each facts}}- **{{tag}}**{{#if description}} — {{description}}{{/if}}\n{{/each}}\n{{/if}}\n{{#if transitions}}## State Transitions\n{{#each transitions}}- {{from}} --[{{event}}]--> {{to}}{{#if description}} — {{description}}{{/if}}\n{{/each}}\n{{/if}}\n";

  for (const schema of schemas) {
    const sdir = adapters.join(cfg.target, "schemas", schema.slug);
    const ldir = adapters.join(sdir, "logic");
    await adapters.fs.mkdirp(ldir);

    const sReadme = renderTemplate(schemaTpl, schema);
    await adapters.fs.writeFile(adapters.join(sdir, "README.md"), sReadme);

    // Generate documentation for each logic definition
    for (const logic of schema.logic) {
      const page = renderTemplate(logicTpl, { ...logic, schema });
      await adapters.fs.writeFile(adapters.join(ldir, `${logic.slug}.md`), page);
      
      // Generate Mermaid diagram if states are present
      if (logic.states && logic.states.length > 0) {
        const lines = [
          "stateDiagram-v2",
          `  [*] --> ${logic.states[0]?.slug ?? "start"}`,
          ...logic.states.flatMap(st =>
            st.on.map(tr => `  ${st.slug} --> ${slugify(tr.target)}: ${tr.event}`)
          )
        ];
        const mermaidText = lines.join("\n");
        await adapters.fs.writeFile(adapters.join(ldir, `${logic.slug}.mmd`), mermaidText);
        
        // Export PNG if configured
        if (cfg.visualization?.exportPng) {
          const pngData = await adapters.mermaid.toPng(mermaidText);
          if (pngData) {
            await adapters.fs.writeBinaryFile(adapters.join(ldir, `${logic.slug}.png`), pngData);
          }
        }
      }
    }
  }
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
