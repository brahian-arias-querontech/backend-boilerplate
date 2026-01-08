import { useCase } from "@/shared/core/use-case";
import type { AuthRepository } from "../auth-repository";
import type { HashRepository } from "../hash-repository";
import type { TokenRepository } from "../token-repository";

export interface SignInDTO {
	username: string;
	password: string;
}

export interface SignInDeps {
	authRepository: AuthRepository;
	tokenRepository: TokenRepository;
	hashRepository: HashRepository;
}

export const signInUseCase = useCase(
	(deps: SignInDeps) => async (dto: SignInDTO) => {
		/**
		 * 1) Find user
		 */
		const user = await deps.authRepository.findByUsername(dto.username);

		if (!user) {
			throw new Error("user not found");
		}

		/**
		 * 2) Compare hashed password
		 */
		const passwordsMatch = await deps.hashRepository.compare(
			dto.password,
			user.password,
		);

		if (!passwordsMatch) {
			throw new Error("password is incorrect");
		}

		/**
		 * Generate token
		 */
		const token = deps.tokenRepository.sign({ id: user.id });

		return token;
	},
);
