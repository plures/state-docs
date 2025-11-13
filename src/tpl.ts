import Handlebars from "handlebars";

export function renderTemplate(tpl: string, data: object): string {
  const template = Handlebars.compile(tpl);
  return template(data);
}
