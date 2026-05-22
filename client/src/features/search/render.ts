import { ui } from "../../dom/selectors";
import type { Country } from "../../api/types";

export type PopoverState =
  | { type: "closed" }
  | { type: "results"; items: Country[] }
  | { type: "empty" }
  | { type: "error"; message: string };

export function renderPopover(state: PopoverState): void {
  ui.listbox.replaceChildren();
  ui.empty.hidden = true;
  ui.error.hidden = true;

  if (state.type === "closed") {
    ui.popover.hidden = true;
    return;
  }

  ui.popover.hidden = false;

  if (state.type === "results") {
    state.items.forEach((c, i) => ui.listbox.appendChild(createOption(c, i)));
  } else if (state.type === "empty") {
    ui.empty.hidden = false;
  } else {
    ui.error.textContent = state.message;
    ui.error.hidden = false;
  }
}

function createOption(c: Country, i: number): HTMLLIElement {
  const li = ui.resultTemplate.content.firstElementChild!.cloneNode(true) as HTMLLIElement;
  li.dataset.index = String(i);
  li.querySelector<HTMLElement>("[data-name]")!.textContent = c.name;
  li.querySelector<HTMLElement>("[data-category]")!.textContent = c.region;
  li.querySelector<HTMLElement>("[data-description]")!.textContent = c.capital;
  return li;
}

export function setLoading(loading: boolean): void {
  ui.spinner.hidden = !loading;
}

export function setClearVisible(visible: boolean): void {
  ui.clearButton.hidden = !visible;
}
