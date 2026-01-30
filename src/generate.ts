
import type { Adapters } from "../runtime.ts";
import type { PraxisDocConfig } from "../mod.ts";
import { renderTemplate } from "./tpl.ts";
import { parseSchemas } from "./parser.ts";
import { slugify } from "./utils.ts";

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
  const schemaTpl = cfg.templates?.schemaIndex ?? "# {{name}}\n\n{{desc}}\n\n{{#if version}}**Version**: {{version}}\n\n{{/if}}## Models\n{{#each models}}\n### {{name}}\n{{desc}}\n\nFields:\n{{#each fields}}- **{{name}}** ({{type}}){{#if optional}} (optional){{/if}}{{#if description}} — {{description}}{{/if}}{{#if default}} — Default: `{{default}}`{{/if}}\n{{#if validation}}  \n  Validation: {{#each validation}}{{type}}{{#if value}}={{value}}{{/if}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}\n{{/each}}\n{{#if constraints}}\n\nConstraints:\n{{#each constraints}}- **{{id}}**: {{description}} ({{type}} on {{#each fields}}{{this}}{{#unless @last}}, {{/unless}}{{/each}})\n{{/each}}\n{{/if}}\n{{#if indexes}}\n\nIndexes:\n{{#each indexes}}- **{{name}}**: {{#each fields}}{{this}}{{#unless @last}}, {{/unless}}{{/each}} {{#if unique}}(unique){{/if}}{{#if type}} [{{type}}]{{/if}}\n{{/each}}\n{{/if}}\n{{#if relationships}}\n\nRelationships:\n{{#each relationships}}- **{{name}}** ({{type}}): → {{target}}{{#if cascadeDelete}} (cascade delete){{/if}}\n{{/each}}\n{{/if}}\n{{/each}}\n\n{{#if components}}## Components\n{{#each components}}\n### {{name}} ({{type}})\n{{description}}\n{{#if model}}\n\n**Model**: {{model}}\n{{/if}}\n{{#if props}}\n\nProps:\n{{#each props}}- **{{name}}** ({{type}}){{#if required}} *required*{{/if}}{{#if description}} — {{description}}{{/if}}{{#if default}} — Default: `{{default}}`{{/if}}\n{{/each}}\n{{/if}}\n{{#if events}}\n\nEvents:\n{{#each events}}- **{{name}}**{{#if payload}} ({{payload}}){{/if}}{{#if description}} — {{description}}{{/if}}\n{{/each}}\n{{/if}}\n{{/each}}\n{{/if}}\n\n{{#if orchestration}}## Orchestration\n\n**Type**: {{orchestration.type}}\n\n{{#if orchestration.nodes}}### Nodes\n{{#each orchestration.nodes}}- **{{id}}** ({{type}})\n{{/each}}\n{{/if}}\n{{#if orchestration.sync}}\n\n### Synchronization\n- Interval: {{orchestration.sync.interval}}ms\n- Strategy: {{orchestration.sync.conflictResolution}}\n{{/if}}\n{{/if}}\n\n## Logic Definitions\n{{#each logic}}- [{{name}}](./logic/{{slug}}.md) — {{desc}}\n{{/each}}\n";
  const logicTpl = cfg.templates?.logicPage ?? "# {{schema.name}} / {{name}}\n\n{{desc}}\n\n## Events\n{{#each events}}- **{{tag}}**{{#if description}} — {{description}}{{/if}}\n{{/each}}\n\n{{#if states}}## States\n{{#each states}}\n### {{name}}\n{{desc}}\n\nTransitions:\n{{#each on}}- {{event}} → {{target}}{{#if description}} — {{description}}{{/if}}\n{{/each}}\n{{/each}}\n{{/if}}\n{{#if facts}}## Facts\n{{#each facts}}- **{{tag}}**{{#if description}} — {{description}}{{/if}}\n{{/each}}\n{{/if}}\n{{#if rules}}## Rules\n{{#each rules}}\n### {{id}}\n{{description}}\n\n{{#if on}}\n**Triggers**: {{#each on}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}\n{{/if}}\n{{#if when}}\n**Condition**: `{{when}}`\n{{/if}}\n**Action**: `{{then}}`\n{{#if priority}}\n**Priority**: {{priority}}\n{{/if}}\n{{/each}}\n{{/if}}\n{{#if constraints}}## Constraints\n{{#each constraints}}\n### {{id}}\n{{description}}\n\n**Check**: `{{check}}`\n\n**Error**: {{message}}\n{{/each}}\n{{/if}}\n{{#if transitions}}## State Transitions\n{{#each transitions}}- {{from}} --[{{event}}]--> {{to}}{{#if description}} — {{description}}{{/if}}\n{{/each}}\n{{/if}}\n";

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
