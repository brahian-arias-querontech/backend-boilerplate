import { Hono } from "hono";
import { authModule } from "./features/auth";

const app = new Hono();

app.route("/api/v1/auth", authModule());

export default app;
