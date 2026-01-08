import type { Repository } from "@/shared/core/repository";
import type { User } from "../domain/user";

export interface AuthRepository extends Repository {
	saveUser: (username: string, password: string) => Promise<boolean>;
	findByUsername: (username: string) => Promise<User | undefined>;
}
