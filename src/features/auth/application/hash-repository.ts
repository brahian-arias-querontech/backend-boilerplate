import type { Repository } from "@/shared/core/repository";

export interface HashRepository extends Repository {
	hash: (value: string) => Promise<string>;
	compare: (value: string, hash: string) => Promise<boolean>;
}
