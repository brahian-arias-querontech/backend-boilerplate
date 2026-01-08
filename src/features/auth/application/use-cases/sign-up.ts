import { useCase } from "@/shared/core/use-case";
import type { AuthRepository } from "../auth-repository";
import type { HashRepository } from "../hash-repository";

export interface SignUpDTO {
	username: string;
	password: string;
}

export interface SignUpDeps {
	authRepository: AuthRepository;
	hashRepository: HashRepository;
}

export const signUpUseCase = useCase(
	(deps: SignUpDeps) => async (dto: SignUpDTO) => {
		/**
		 * 1) Hash new password
		 */
		const hashedPassword = await deps.hashRepository.hash(dto.password);

		/**
		 * 2) Save user
		 */
		const saveUser = await deps.authRepository.saveUser(
			dto.username,
			hashedPassword,
		);

		return saveUser;
	},
);
