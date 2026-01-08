/** biome-ignore-all lint/complexity/noBannedTypes: empty object is used for validation */

/**
 * A repository is a collection of functions 
 */
export type Repository = Record<string, (...args: any[]) => any>;

/**
 * Create a repository.
 * 
 * Always use this function when creating a repository. This function allows type infer
 * and dependency injection
 * 
 * @example
 * type UserRepositoryDependencies = { logger: any }
 * 
 * // Repository contract
 * type UserRepository = {
 * 	createUser: (username: string, password: string) => Promise<boolean>,
 * 	deleteUser: (id: string) => Promise<boolean>
 * }
 * 
 * // Repository definition
 * const userRepository<UserRepository>()(
 * 	(deps: UserRepositoryDependencies) => 
 * 		({
 * 			// Repository implementation goes here 
 * 		})
 * )
 * 
 * // Dependencies
 * const db = {}
 * 
 * // Instantiation
 * const userRepositoryInstance = userRepository({ db })
 * 
 * // Execution
 * userRepositoryInstance.createUser('foo', 'bar')
 * 
 * @returns - repository
 */
export const repository =
	<TRepo extends Repository>() =>
	<Deps>(def: (deps: Deps) => TRepo) => {
		// If dependencies are an empty object or undefined, the argument is optional
		return (...args: {} extends Deps ? [deps?: Deps] : [deps: Deps]): TRepo => {
			return def(args[0] as Deps);
		};
	};
