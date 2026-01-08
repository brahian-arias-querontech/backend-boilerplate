import type { DrizzleQueryError } from "drizzle-orm";

/**
 * Handles error by its message
 * 
 * Looks for strings that matches the error message into the `map` parameter, if the error message matches with any of
 * the keys, then the function following the key will be execute
 * Supported constructors:
 * - Error
 * - DrizzleQueryError
 * 
 * @example
 * const userNotFoundError = new Error('user not found')
 * 
 * const parsedMessage = mapError(userNotFoundError, {
 * 	'incorrect password': () => 'please provide a correct password',
 * 	'user not found': () => 'the user doesn\'t exists in the database' // This will be executed
 * })
 * 
 * console.log(parsedMessage) // "the user doesn't exists in the database"
 * 
 * @param e - Error
 * @param map - Error map where the key 
 * @param defaultFn - Default function that will be execute if the error message doesn't match with any of the map strings
 */
export function mapError(
	e: unknown,
	map: Record<string, () => any>,
	defaultFn: () => any,
) {
	let message = "";
	const error = e as any;

	if (error.constructor.name === "Error") {
		message = (error as Error).message;
	} else if (error.constructor.name === "DrizzleQueryError") {
		message = (error as DrizzleQueryError).cause?.message ?? "";
	}

	for (const [key, fn] of Object.entries(map)) {
		if (message && key.toLowerCase().includes(message.toLowerCase())) {
			return fn();
		}
	}

	return defaultFn?.();
}
