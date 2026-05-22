const $ = <T extends Element>(selector: string): T => {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el;
};

export const ui = {
  root: $<HTMLDivElement>("#typeahead"),
  field: $<HTMLDivElement>(".typeahead-field"),
  input: $<HTMLInputElement>("#search-input"),
  clearButton: $<HTMLButtonElement>("#search-clear"),
  spinner: $<HTMLSpanElement>("#search-spinner"),
  popover: $<HTMLDivElement>("#search-popover"),
  listbox: $<HTMLUListElement>("#search-listbox"),
  empty: $<HTMLDivElement>("#search-empty"),
  error: $<HTMLDivElement>("#search-error"),
  status: $<HTMLParagraphElement>("#search-status"),
  resultTemplate: $<HTMLTemplateElement>("#search-result-template"),
};
