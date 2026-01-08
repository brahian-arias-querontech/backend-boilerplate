import { Hono } from "hono";
import { signInUseCase } from "./application/use-cases/sign-in";
import { signUpUseCase } from "./application/use-cases/sign-up";
import { bunHashRepository } from "./infrastructure/bun-hash-repository";
import { honoJwtTokenRepository } from "./infrastructure/hono-jwt-token-repository";
import { postgresAuthRepository } from "./infrastructure/postgres-auth-repository";
import { signInHTTPController } from "./interfaces/http/sign-in";
import { signUpHTTPController } from "./interfaces/http/sign-up";

/**
 * Bootstrap auth module
 * 
 * @returns Auth module
 */
export function authModule() {
	/* ---------------------------- Key Dependencies ---------------------------- */
	const authRepository = postgresAuthRepository();
	const hashRepository = bunHashRepository();
	const tokenRepository = honoJwtTokenRepository();

	/* --------------------------- Set up controllers --------------------------- */
	const hono = new Hono();

	signUpHTTPController({
		hono,
		useCase: signUpUseCase({ authRepository, hashRepository }),
	});

	signInHTTPController({
		hono,
		useCase: signInUseCase({ authRepository, tokenRepository, hashRepository }),
	});

	return hono;
}
