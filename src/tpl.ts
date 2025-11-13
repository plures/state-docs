import Handlebars from "npm:handlebars@^4.7.8";

export function renderTemplate(tpl: string, data: object): string {
  const template = Handlebars.compile(tpl);
  return template(data);
}
