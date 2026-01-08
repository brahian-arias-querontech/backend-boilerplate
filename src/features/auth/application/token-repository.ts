import type { Repository } from "@/shared/core/repository";

export interface TokenRepository extends Repository {
	sign: (payload: unknown) => Promise<string>;
	verify: (token: string) => Promise<unknown>;
}
