import { Eta } from "eta";

export function renderTemplate(tpl: string, data: unknown): string {
  const eta = new Eta();
  return eta.renderString(tpl, data) as string;
}
