import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "./lib/auth.js";
import {authMiddleware, protectRoute} from "./middleware.js";

const app = new Hono();

app.use("*", logger());
app.use("*", authMiddleware);

app.basePath("/api").get("/healthcheck", (c) => {
    return c.text("aye aye cheif");
}).get("/me", protectRoute, (c) => {
    return c.json({ message: "you are authenticated" }, 200);
}).on(["POST", "GET"], "/auth/*", async (c) => {
    return auth.handler(c.req.raw);
});

app.use("*", cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
}));

export default app;
