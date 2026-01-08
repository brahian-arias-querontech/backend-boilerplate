import { drizzle } from "drizzle-orm/node-postgres";
import { appConfig } from "../../config";

export const db = drizzle(appConfig.db.url, {
	casing: "snake_case",
});
