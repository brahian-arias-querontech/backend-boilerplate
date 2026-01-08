import { sValidator } from "@hono/standard-validator";
import { type } from "arktype";
import type { Hono } from "hono";
import { controller } from "@/shared/core/controller";
import { mapError } from "@/shared/utils/map-error";
import type { signUpUseCase } from "../../application/use-cases/sign-up";

export type SignUpHTTPControllerDeps = {
	useCase: ReturnType<typeof signUpUseCase>;
	hono: Hono;
};

const schema = type({
	username: "string<=100",
	password: "string<=100",
});

export const signUpHTTPController = controller(
	(deps: SignUpHTTPControllerDeps) => {
		deps.hono.post("/sign-up", sValidator("json", schema), async (c) => {
			try {
				const { username, password } = c.req.valid("json");

				await deps.useCase({ username, password });

				return c.text("user created successfully");
			} catch (e) {
				return mapError(
					e,
					{
						'duplicate key value violates unique constraint "users_username_unique"':
							() => c.text("username already in use", 400),
					},
					() => c.text("Something went wrong", 500),
				);
			}
		});
	},
);
