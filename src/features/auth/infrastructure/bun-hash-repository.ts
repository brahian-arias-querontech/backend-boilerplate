import { repository } from "@/shared/core/repository";
import type { HashRepository } from "../application/hash-repository";

export const bunHashRepository = repository<HashRepository>()(() => ({
	async hash(value) {
		const hashed = await Bun.password.hash(value, {
			algorithm: "bcrypt",
			cost: 5,
		});

		return hashed;
	},
	async compare(value, hash) {
		const comparison = await Bun.password.verify(value, hash, "bcrypt");

		return comparison;
	},
}));
