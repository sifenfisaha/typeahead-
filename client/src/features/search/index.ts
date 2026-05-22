import { fromEvent, from, of } from "rxjs";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  tap,
} from "rxjs/operators";
import { ui } from "../../dom/selectors";
import { fetchCountries } from "../../api/countries";
import type { Country } from "../../api/types";
import {
  renderPopover,
  setLoading,
  setClearVisible,
  type PopoverState,
} from "./render";

let items: Country[] = [];

fromEvent(ui.input, "input")
  .pipe(
    map(() => ui.input.value.trim()),
    tap((q) => setClearVisible(q.length > 0)),
    debounceTime(300),
    distinctUntilChanged(),
    tap((q) => setLoading(q.length > 0)),
    switchMap((q) =>
      !q
        ? of<PopoverState>({ type: "closed" })
        : from(fetchCountries(q)).pipe(
            map(
              (r): PopoverState =>
                r.length ? { type: "results", items: r } : { type: "empty" },
            ),
            catchError((e: Error) =>
              of<PopoverState>({ type: "error", message: e.message }),
            ),
          ),
    ),
    tap(() => setLoading(false)),
  )
  .subscribe((state) => {
    items = state.type === "results" ? state.items : [];
    renderPopover(state);
  });

fromEvent(ui.clearButton, "click").subscribe(() => {
  ui.input.value = "";
  setClearVisible(false);
  renderPopover({ type: "closed" });
  ui.input.focus();
});

fromEvent<MouseEvent>(ui.listbox, "mousedown").subscribe((event) => {
  const li = (event.target as HTMLElement | null)?.closest<HTMLLIElement>(
    "li.typeahead-option",
  );
  if (!li) return;
  event.preventDefault();
  const item = items[Number(li.dataset.index)];
  if (!item) return;
  ui.input.value = item.name;
  setClearVisible(true);
  renderPopover({ type: "closed" });
});
