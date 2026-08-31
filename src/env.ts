import { building } from '$app/env';
import { defineEnvVars } from '@sveltejs/kit/env';
import * as v from 'valibot';

export const variables = defineEnvVars({
	MONGODB_DB: {
		schema: building ? v.optional(v.string()) : v.string()
	},

	MONGODB_URL: {
		schema: building ? v.optional(v.string()) : v.string()
	}
});
