import { Eta } from "eta";

export function renderTemplate(tpl: string, data: unknown): string {
  return Eta.render(tpl, data) as string;
}
