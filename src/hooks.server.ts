import { type Handle } from '@sveltejs/kit/hooks';
import { connect } from '#lib/mongoose/index.js';
import { redirect } from '@sveltejs/kit';
import { userAccess } from '#lib/auth/userAccess.ts';

export const handle: Handle = async ({ event, resolve }) => {
	await connect();

	const userId = event.cookies.get('userId');

	event.locals.routes = [];
	event.locals.user = null;

	if (userId) {
		const access = await userAccess.get(userId);

		if (access) {
			event.locals.routes = access.routes;
			event.locals.user = access.user;
		}

		if (!access) event.cookies.delete('userId', { path: '/' });
	}

	const isAuthenticated = event.locals.user !== null;

	// handle root path
	if (event.url.pathname === '/') {
		if (userId === undefined) return redirect(303, '/sign-in');
		if (userId !== undefined) return redirect(303, '/dashboard');
	}

	// handle private routes
	if (event.route.id?.startsWith('/(private)')) {
		if (!isAuthenticated) {
			event.cookies.delete('userId', { path: '/' });
			return redirect(303, '/sign-in');
		}
	}

	// handle public routes
	if (event.route.id?.startsWith('/(public)')) {
		if (isAuthenticated) return redirect(303, '/dashboard');
	}

	const response = await resolve(event);
	return response;
};
