# B2Gold Drill Hole Data Management

A TypeScript-based drill hole data management application built with React and AG Grid.

## Project Structure

```
src/
├── data-layer/          # Data services and API layer
│   ├── api/            # API client and endpoints
│   ├── hooks/          # Custom React hooks
│   └── services/       # Business logic services
├── ux/                 # User experience layer
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Form and UI hooks
│   ├── pages/          # Page components
│   └── shared/         # Shared utilities
└── create-drill-hole.html
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```


### Playwright screenshot troubleshooting (Codex/browser tool)

If screenshot capture fails with `net::ERR_EMPTY_RESPONSE` on `http://localhost:3000`, the browser tool can reach the port, but no app is responding there.

Use this checklist:

1. Start the dev server first (in a separate terminal/session).
   - Typical commands:
     - `npm install`
     - `npm run dev -- --host 0.0.0.0 --port 3000`
2. Confirm the app is actually listening:
   - `curl -I http://localhost:3000`
3. If your framework uses a different default port (for example Vite uses `5173`), either:
   - run dev on `3000`, or
   - forward/use the real port in `run_playwright_script` (`ports_to_forward: [5173]`) and navigate to `http://localhost:5173`.
4. Retry screenshot after the app is reachable.

## License

MIT
