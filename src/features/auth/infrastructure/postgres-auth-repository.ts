import { eq } from "drizzle-orm";
import { repository } from "@/shared/core/repository";
import { db } from "@/shared/db";
import { usersTable } from "@/shared/db/schema/users";
import { mapUserFromDrizzle } from "@/shared/mappers/drizzle-to-domain/user";
import type { AuthRepository } from "../application/auth-repository";

export const postgresAuthRepository = repository<AuthRepository>()(() => ({
	async findByUsername(username) {
		const userByUsername = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.username, username));

		const user = userByUsername.at(0);

		return user ? mapUserFromDrizzle(user) : undefined;
	},
	async saveUser(username, password) {
		const result = await db.insert(usersTable).values({ username, password });

		const rowCount = result.rowCount || 0;

		return rowCount > 0;
	},
}));
