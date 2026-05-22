import { fromEvent, merge, timer, from, of } from "rxjs";
import {
  switchMap,
  map,
  distinctUntilChanged,
  catchError,
} from "rxjs/operators";
import { ui } from "../../dom/selectors";

const POLL_MS = 5000;

const checkHealth = () =>
  from(
    fetch("/api/health")
      .then((r) => r.ok)
      .catch(() => false),
  );

export const apiStatus$ = merge(
  timer(0, POLL_MS),
  fromEvent(window, "online"),
  fromEvent(window, "offline"),
).pipe(
  switchMap(() => (navigator.onLine ? checkHealth() : of(false))),
  map((ok) => Boolean(ok)),
  distinctUntilChanged(),
  catchError(() => of(false)),
);

apiStatus$.subscribe((isUp) => {
  ui.apiStatus.classList.toggle("is-up", isUp);
  ui.apiStatus.classList.toggle("is-down", !isUp);
});
