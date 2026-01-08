import { sValidator } from "@hono/standard-validator";
import { type } from "arktype";
import type { Hono } from "hono";
import { controller } from "@/shared/core/controller";
import { mapError } from "@/shared/utils/map-error";
import type { signInUseCase } from "../../application/use-cases/sign-in";

export type SignInHTTPControllerDeps = {
	useCase: ReturnType<typeof signInUseCase>;
	hono: Hono;
};

const schema = type({
	username: "string<=100",
	password: "string<=100",
});

export const signInHTTPController = controller(
	(deps: SignInHTTPControllerDeps) => {
		deps.hono.post("/sign-in", sValidator("json", schema), async (c) => {
			try {
				const { username, password } = c.req.valid("json");

				const token = await deps.useCase({ username, password });

				return c.json({
					token,
				});
			} catch (e) {
				return mapError(
					e,
					{
						"user not found": () => c.text("user not found", 404),
						"password is incorrect": () => c.text("password is incorrect", 401),
					},
					() => c.text("error", 500),
				);
			}
		});
	},
);
