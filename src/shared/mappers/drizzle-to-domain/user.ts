import type { User } from "../../../features/auth/domain/user";
import type { usersTable } from "../../db/schema/users";

export function mapUserFromDrizzle(user: typeof usersTable.$inferSelect): User {
	return {
		id: user.id,
		username: user.username,
		password: user.password,
		createdAt: user.created_at ? new Date(user.created_at) : new Date(),
	};
}
