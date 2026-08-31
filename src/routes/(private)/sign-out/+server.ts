import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ cookies }) => {
	cookies.delete('userId', { path: '/' });

	redirect(303, '/sign-in');
};
