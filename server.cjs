// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
// Explicitly fallback to "3000" if PORT is undefined
const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = "0.0.0.0";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url || "/", true);
      const { pathname, query } = parsedUrl;

      // ✅ DigitalOcean health check
      if (pathname === "/healthz") {
        res.statusCode = 200;
        res.end("ok");
        return;
      }

      // ✅ Example custom routes
      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
        return;
      }
      if (pathname === "/b") {
        await app.render(req, res, "/b", query);
        return;
      }

      // ✅ Default Next.js handler
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error("Server error:", err);
      process.exit(1);
    })
    .listen(PORT, HOST, () => {
      console.log(
        `> Ready on http://${HOST}:${PORT} (NODE_ENV=${process.env.NODE_ENV || "unset"
        })`
      );
    });
});