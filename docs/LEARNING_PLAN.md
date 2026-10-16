# Pixel canvas: 8-week plan and learning guide

Oct 16, 2026

By December 11, 2026, you have a live, shared pixel canvas written in TypeScript, and you have learned real-time web apps by building one.

## What you're building

A shared pixel board that many people draw on at the same time. Every pixel anyone places appears on everyone's screen within a fraction of a second. See the [clickable UI mockup](https://claude.ai/artifact/GWNKgjiSAzyNrPcRkrhG4i) for exactly how it looks.

- One pixel every 5 seconds per person, enforced by the server.
- Anyone can paint over anyone else's pixel. No undo.
- No accounts: each browser gets an anonymous ID.
- The board survives restarts because it is stored in Redis.
- Stack: TypeScript everywhere. Vite and plain TypeScript with an HTML canvas on the front end. Node.js with `ws` on the server. Redis for the board and the cooldowns. Docker for deployment.

## How to learn: books or other resources?

Use both, but read very little. This project is mostly about WebSockets, Redis and canvas, and none of your books is about those. So the books are references for the parts you already half know (TypeScript and Node), and official documentation covers the rest.

- **Build first, read second.** Each week starts with a small goal. Read only the chapter or doc page that helps you reach it, then build.
- **Two books are your main references:** _Effective TypeScript_ and _Efficient Node.js_. Read the chapters on demand, not front to back.
- **Official docs for the new parts:** MDN for WebSockets, canvas and pointer events, plus the Redis, `ws`, zod and Docker docs.
- **Don't start a new book** for this project. Reading six books would feel like progress and delay the build.
- **Stuck for more than 45 minutes?** Write down what you expected and what happened, then ask Claude to explain the concept. You write the fix.

## Your books: use or skip

I went by the titles you listed and have not checked each table of contents, so open each one and confirm the chapters exist before you rely on it.

| Book                                                                | Verdict            | Use it for                                                                                                  |
| ------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| Effective TypeScript (Vanderkam)                                    | **Main reference** | Typing messages shared between client and server, narrowing, and safe types. Dip in all through the project |
| Efficient Node.js (Buna)                                            | **Main reference** | The event loop, streams, buffers and Node's HTTP server, which sit under every WebSocket                    |
| The Complete Developer (Krause)                                     | Use for one topic  | Docker and deployment. Check its table of contents first                                                    |
| You Don't Know JS Yet: Scope & Closures (Simpson)                   | Optional           | A quick skim if closures in your handlers confuse you                                                       |
| How Computers Really Work (Justice)                                 | Optional           | Light background on how networks and processes work, if curious. Skip if short on time                      |
| Programming TypeScript (Cherny), Learning TypeScript (Goldberg)     | Skip               | Overlaps with Effective TypeScript                                                                          |
| Full-Stack React, TypeScript, and Node; React books; Tailwind guide | Skip               | This project uses a plain canvas, not React or CSS frameworks                                               |
| Practical SQL                                                       | Separate track     | Keep your 3 hours a week of SQL for job skills, but it isn't part of this project                           |
| The other languages, Laravel, Blazor, Flutter, ML and AI books      | Skip               | Not related                                                                                                 |

## Skills map: what to learn and where

| Skill                                                            | Learn from                                                                                                                            | Week |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| npm workspaces and a TypeScript monorepo                         | [npm workspaces docs](https://docs.npmjs.com/cli/using-npm/workspaces), Effective TypeScript (modules and config chapters)            | 1    |
| Vite and a plain TypeScript front end                            | [Vite guide](https://vite.dev/guide/)                                                                                                 | 1    |
| Node event loop, streams, HTTP server                            | Efficient Node.js, [Node.js API docs](https://nodejs.org/docs/latest/api/)                                                            | 1    |
| WebSocket basics: handshake, messages, close, ping               | [MDN WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [ws library](https://github.com/websockets/ws) | 1    |
| Canvas 2D: draw a grid, crisp pixels, device pixel ratio         | [MDN Canvas tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)                                           | 2    |
| Typed messages shared by client and server                       | Effective TypeScript (types and unions chapters)                                                                                      | 2    |
| Server-authoritative state (the server decides, clients display) | Your own notes. Draw the message flow on paper first                                                                                  | 3    |
| Message validation                                               | [zod docs](https://zod.dev)                                                                                                           | 4    |
| Redis basics: strings, expiry, set-if-missing, atomic commands   | [Redis docs](https://redis.io/docs/)                                                                                                  | 4    |
| Storing the board compactly                                      | Redis docs on strings and bit operations                                                                                              | 4    |
| Pan and zoom with a canvas transform, zoom around the cursor     | MDN Canvas transformations                                                                                                            | 5    |
| Pointer events, drag and pinch                                   | [MDN Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)                                                 | 5    |
| Reconnecting with backoff, and re-syncing the board              | MDN WebSocket docs, your own design                                                                                                   | 6    |
| Tests: unit and a WebSocket integration test                     | [Vitest](https://vitest.dev)                                                                                                          | 6    |
| Docker and Docker Compose                                        | [Docker get started](https://docs.docker.com/get-started/), The Complete Developer                                                    | 7    |
| CI with GitHub Actions                                           | [GitHub Actions docs](https://docs.github.com/en/actions)                                                                             | 7    |
| Rate limiting and basic abuse protection                         | Redis docs, your own design                                                                                                           | 7    |
| Deploying with WebSockets, and load testing                      | Your host's docs, a small script you write                                                                                            | 8    |

## Week-by-week plan

About 12 hours a week for the project, plus your 3 hours of web job skills.

### Week 1 (Oct 17–23): Project setup and your first WebSocket

**Learn:** npm workspaces, Vite, the Node HTTP server, how a WebSocket connection starts and what a message is.

**Build:** the repo with `shared`, `server` and `client` packages. A server that accepts a WebSocket and sends every message it receives back to all connected clients. A page with a text box that shows messages from other tabs.

**Done when:** you type in one browser tab and the text appears in another.

- [ ] Repo, workspaces, TypeScript config, and `AGENTS.md` committed
- [ ] Server accepts connections and logs connects and disconnects
- [ ] Broadcast works between two tabs

### Week 2 (Oct 24–30): A canvas that sends pixels

**Learn:** canvas 2D drawing, crisp pixel rendering, converting a mouse position into a grid cell, shared message types.

**Build:** a 24×24 board drawn on a canvas, a colour palette, and a typed `place pixel` message defined once in `shared`. The server keeps the board in memory and broadcasts accepted pixels.

**Done when:** two tabs show the same board and clicking in one updates the other.

- [ ] Grid drawn on a canvas with crisp squares
- [ ] Click maps to the right cell
- [ ] A new tab receives the full board when it connects

### Week 3 (Oct 31 – Nov 6): The server is in charge

**Learn:** why the server must be authoritative, and how to design a small message protocol (what the client sends, what the server replies and why).

**Build:** the 5-second cooldown on the server, per anonymous ID, with an error message back to the client. A cooldown display in the UI. Reject pixels outside the board.

**Done when:** sending messages by hand (not through your UI) cannot beat the cooldown.

- [ ] Anonymous ID created and stored in the browser
- [ ] Cooldown enforced on the server
- [ ] Client shows the countdown and handles rejection

### Week 4 (Nov 7–13): Validation and Redis

**Learn:** zod schemas, Redis strings, expiry keys and atomic commands, and how to store a board compactly.

**Build:** validate every incoming message with zod. Move the board into Redis and the cooldown into expiring keys. Run Redis locally with Docker Compose.

**Done when:** you restart the server and the board is still there, and a malformed message is rejected without crashing the server.

- [ ] zod schemas for every message type
- [ ] Board stored in Redis and loaded on start
- [ ] Cooldown uses a Redis expiring key
- [ ] `docker-compose.yml` starts Redis

### Week 5 (Nov 14–20): Zoom and pan, and a bigger board

**Learn:** canvas transforms (translate and scale), zooming around the cursor, pointer events for dragging, and pinch on a phone.

**Build:** grow the board (for example 128×128). Add wheel zoom, drag to pan, and pinch zoom. Clamp panning so the board cannot be lost. Redraw efficiently.

**Done when:** you can zoom into one pixel and place it accurately on both a desktop and a phone.

- [ ] Pan and zoom work with mouse
- [ ] Pinch zoom works on a phone
- [ ] Clicks stay accurate at every zoom level

### Week 6 (Nov 21–27): Make it feel good and reliable

**Learn:** reconnecting with backoff, re-syncing after a disconnect, and writing tests for both pure logic and a real WebSocket.

**Build:** auto-reconnect, an online count, a live activity feed, and the palette and layout from the mockup. Add Vitest tests for the cooldown and message validation, and one integration test with two clients.

**Done when:** turning your Wi-Fi off and on brings you back with an up-to-date board and no page refresh.

- [ ] Reconnect with backoff
- [ ] Online count and activity feed
- [ ] Tests pass for cooldown, validation and a two-client scenario

### Week 7 (Nov 28 – Dec 4): Docker, CI and protection

**Learn:** Dockerfiles, multi-stage builds, GitHub Actions, and basic rate limiting.

**Build:** a Dockerfile for the server and a Compose file for server plus Redis. A GitHub Actions workflow that lints, type-checks and tests. Limits on connections per address, on message size, and on message rate.

**Done when:** `docker compose up` starts the whole app, and CI is green on every push.

- [ ] Dockerfile and Compose file
- [ ] CI workflow
- [ ] Message size and rate limits
- [ ] Origin check on connections

### Week 8 (Dec 5–11): Deploy, test with people, write up

**Learn:** how your chosen host handles WebSockets and sleeping, and how to load test.

**Build:** deploy the server and a hosted Redis. Write a small script that opens many fake clients and places pixels. Invite friends to draw. Add a timelapse image of the board if you have time. Write the README with a GIF.

**Done when:** a friend you send the link to can draw on the board from their phone.

- [ ] Live URL works from a phone
- [ ] Load script run with at least 50 clients
- [ ] README with a GIF, the stack, and what you learned
- [ ] A short write-up of the problems you hit

## Weekly routine

- **Weekdays, about 1 hour:** read the one doc page or chapter the week needs, then build the smallest piece of it.
- **Weekend, 3 to 4 hours each day:** the main building session. Finish a feature, test it, commit it.
- **Three hours a week, separate:** SQL practice, and adding Docker, tests and CI to a Node API you already have.
- **Use Claude Code as a tutor:** ask it to explain a concept or point you to documentation. You write the code. Your `AGENTS.md` already enforces this.
- **Commit after every working feature,** with a plain message and no AI attribution.
- **End each week with 10 minutes:** tick the done-when box, write two lines on what confused you, and fix the plan if you're behind.

## Risks and fallbacks

| Risk                                  | What to do                                                                                                             |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Zoom and pan take longer than a week  | Ship a fixed-size board with zoom buttons first, then add pinch and drag                                               |
| Free host sleeps or blocks WebSockets | Test hosting in week 4 with a tiny echo server, not in week 8. A free always-on VM is the backup                       |
| The board gets abused                 | Keep the cooldown, size and rate limits from week 7. Add a simple reset if needed                                      |
| You fall behind                       | Cut in this order: timelapse, activity feed, online count, pinch zoom. Never cut the server-side cooldown or the tests |
| Reading takes over                    | If a week has more than 3 hours of reading, stop and build the next feature                                            |
| Redis feels new                       | Do the Redis docs examples in a terminal for an evening before touching the project                                    |

## Sources

Links were written from memory and not re-checked today, so confirm each one opens.

- [MDN: WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [MDN: Canvas tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [MDN: Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [ws on GitHub](https://github.com/websockets/ws)
- [Redis documentation](https://redis.io/docs/)
- [zod](https://zod.dev)
- [Vite guide](https://vite.dev/guide/)
- [Vitest](https://vitest.dev)
- [Node.js API docs](https://nodejs.org/docs/latest/api/)
- [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces)
- [Docker: get started](https://docs.docker.com/get-started/)
- [GitHub Actions docs](https://docs.github.com/en/actions)
