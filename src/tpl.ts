import { Eta } from "eta";

export function renderTemplate(tpl: string, data: object): string {
  const eta = new Eta();
  return eta.renderString(tpl, data) as string;

}
