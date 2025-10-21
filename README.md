
# statedoc (Deno + Node)

FSM documentation generator for XState projects. One ESM codebase. Runs on Deno or Node. Generates Markdown and Mermaid from machines and states.

## Quick start

Deno:
```sh
deno task gen
```

Node (after building with dnt):
```sh
deno run -A scripts/build_npm.ts
cd npm
npm install -g .
statedoc gen --config=.stateDoc.json
```
