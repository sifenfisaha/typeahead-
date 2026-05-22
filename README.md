# rx-search

A **typeahead** built with **RxJS** on the client and a tiny **Express** API on the server. As you type, results stream in live — debounced, deduped, and cancel-safe.

## Stack

- **Client:** Vite, TypeScript, RxJS
- **Server:** Node, Express, TypeScript
- **Workspace:** pnpm

## Project structure

```
rx-search/
├── client/   # Vite + RxJS typeahead UI
└── server/   # Express API backing the typeahead
```

## Requirements

- Node.js 20+
- pnpm 9+

## Getting started

Install dependencies from the repo root:

```bash
pnpm install
```

Run the client and server together:

```bash
pnpm dev
```

- Client: http://localhost:5173
- Server: http://localhost:8001

The client proxies `/api` requests to the server, so you only need to open the client URL.

### Run them separately

```bash
pnpm dev:client   # client only
pnpm dev:server   # server only
```

## How the typeahead works

The input stream is wired through RxJS:

`input` → `debounceTime(300)` → `distinctUntilChanged` → `switchMap(fetch)` → render

- **`debounceTime`** waits for the user to pause typing.
- **`distinctUntilChanged`** ignores repeated values.
- **`switchMap`** cancels in-flight requests when a newer query arrives, so only the latest result is rendered.

The popover renders four states: `closed`, `loading`, `results`, and `empty` / `error`.

## API

`GET /api/search?q=<query>`

Returns countries whose name, region, or capital contain the query (case-insensitive). If `q` is empty, all items are returned.

```json
{
  "query": "fra",
  "count": 1,
  "results": [
    { "id": 1, "name": "France", "region": "Europe", "capital": "Paris" }
  ]
}
```

`GET /health` → `{ "ok": true }`

## Build

```bash
pnpm build       # builds client and server
pnpm start       # runs the server in production mode
```
