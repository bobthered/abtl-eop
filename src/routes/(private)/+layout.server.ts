import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	return {
		routes: locals.routes,
		user: locals.user
	};
};
