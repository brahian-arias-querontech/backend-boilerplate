import type { UseCase } from "./use-case";

type MappedDeps<Deps extends Record<string, any>> = {
	[K in keyof Deps]: Deps[K];
};

/**
 * A controller is a function that haves an usecase into its dependencies
 */
type ControllerDeps<Deps extends Record<string, any>> = {
	useCase: UseCase<any>;
} & MappedDeps<Deps>;

/**
 * Tag for type validation
 */
export type Controller = { _tag: "Controller" };

/**
 * Create a controller.
 * 
 * NOTE: Controller's definition will 
 * 
 * Always use this function when creating a controller. This function allows type infer
 * and dependency injection
 * 
 * @example
 * type CreateUserControllerDeps = {
 * 	logger: any;
 * 	useCase: ReturnType<typeof createUserUseCase>;
 * }
 * 
 * // Controller definition
 * const createUserController = controller(
 * 	(deps: CreateUserControllerDeps) => {
 * 		// Controller implementation goes here
 * 	}
 * )
 * 
 * @param def Controller's definition
 * @returns controller
 */
export const controller = <Deps extends ControllerDeps<any>>(
	def: (deps: Deps) => void,
) => {
	return (deps: Deps): Controller => {
		def(deps);
		return { _tag: "Controller" };
	};
};
