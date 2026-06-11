import { loadEnv, type Plugin } from "vite";

const SMTP_KEYS = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"] as const;

const applySmtpEnv = (mode: string) => {
  const env = loadEnv(mode, process.cwd(), "");

  for (const key of SMTP_KEYS) {
    if (env[key]) {
      process.env[key] = env[key];
    }
  }
};

export const contactApiDevPlugin = (mode: string): Plugin => ({
  name: "contact-api-dev",
  apply: "serve",
  configureServer(server) {
    applySmtpEnv(mode);

    server.middlewares.use((req, res, next) => {
      const path = req.url?.split("?")[0];

      if (path !== "/api/contact") {
        next();
        return;
      }

      if (req.method !== "POST") {
        res.statusCode = 405;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "method_not_allowed" }));
        return;
      }

      const chunks: Buffer[] = [];

      req.on("data", (chunk) => {
        chunks.push(Buffer.from(chunk));
      });

      req.on("end", async () => {
        try {
          applySmtpEnv(mode);

          const body = Buffer.concat(chunks).toString("utf8");
          const { processContactRequest } = await import("./server/contactMail");
          const result = await processContactRequest("POST", body);

          res.statusCode = result.status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result.body));
        } catch (error) {
          console.error("Contact API dev error:", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "send_failed" }));
        }
      });
    });
  },
});
