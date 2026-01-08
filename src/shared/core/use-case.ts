/**
 * An use-case is a function that receives a DTO
 */
export type UseCase<DTO> = (dto: DTO) => any | Promise<any>;

/**
 * Creates a usecase.
 * 
 * Always use this function when creating a use case. This function allows type infer
 * and dependency injection
 * 
 * @example
 * type CreateUserUseCaseDependencies = { userRepository: any }
 * type CreateUserUseCaseDTO = { username: string, password: string }
 * 
 * 
 * const createUserUseCase = useCase((deps: CreateUserUseCaseDependencies) => 
 * 	(dto: CreateUserUseCaseDTO) => {
 * 		// use case implementation goes here
 * 	}
 * )
 * 
 * // Dependencies
 * const userRepository = {}
 * 
 * // Instantiation
 * const createUserUseCaseInstance = createUserUseCase({ userRepository })
 * 
 * // Execution
 * createUserUseCaseInstance({ username: 'foo', password: 'bar' })
 * 
 * @param def - use case definition
 * @returns use case
 */
export const useCase = <Deps, TUseCase extends UseCase<any>>(
	def: (deps: Deps) => TUseCase,
) => {
	return (deps: Deps): TUseCase => def(deps);
};
