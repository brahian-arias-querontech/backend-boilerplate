import { sign, verify } from "hono/jwt";
import type { JWTPayload } from "hono/utils/jwt/types";
import { appConfig } from "@/config";
import { repository } from "@/shared/core/repository";
import type { TokenRepository } from "../application/token-repository";

export const honoJwtTokenRepository = repository<TokenRepository>()(() => ({
	sign(payload) {
		return sign(payload as JWTPayload, appConfig.jwt.secret);
	},
	verify(token) {
		return verify(token, appConfig.jwt.secret);
	},
}));
