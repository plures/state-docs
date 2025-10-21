
import { Eta } from "eta";

export function renderTemplate(tpl: string, data: unknown): string {
  return Eta.renderString(tpl, data) as string;
}
