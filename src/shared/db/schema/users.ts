import { pgTable } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", (t) => ({
	id: t
		.uuid()
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),
	username: t.varchar({ length: 100 }).notNull().unique(),
	password: t.text().notNull(),
	created_at: t.date().defaultNow().notNull(),
}));
