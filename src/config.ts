/** biome-ignore-all lint/style/noNonNullAssertion: All env variables should be defined */
import "dotenv/config";

export const appConfig = {
	db: {
		url: process.env.DATABASE_URL!,
	},
	jwt: {
		secret: process.env.JWT_SECRET!,
	},
};
