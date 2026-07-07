import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOST ?? "127.0.0.1";
const rootDir = path.join(process.cwd(), "out");
const basePath = "/printly.github.io";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function toFilePath(requestPath) {
  let pathname = requestPath;

  if (pathname === basePath) {
    pathname = "/";
  }

  if (pathname.startsWith(`${basePath}/`)) {
    pathname = pathname.slice(basePath.length);
  }

  if (pathname === "/") {
    pathname = "/index.html";
  }

  if (pathname.endsWith("/")) {
    pathname += "index.html";
  }

  const normalized = path.normalize(pathname).replace(/^[/\\]+/, "");
  const filePath = path.join(rootDir, normalized);

  if (!filePath.startsWith(rootDir)) {
    return null;
  }

  return filePath;
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? "/", `http://${host}:${port}`);
    const filePath = toFilePath(decodeURIComponent(requestUrl.pathname));

    if (!filePath) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const data = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mimeTypes[ext] ?? "application/octet-stream"
    });
    response.end(data);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, host, () => {
  console.log(`Serving out at http://${host}:${port}${basePath}/`);
});
