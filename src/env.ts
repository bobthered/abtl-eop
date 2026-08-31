import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	MONGODB_DB: {},
	MONGODB_URL: {}
});
