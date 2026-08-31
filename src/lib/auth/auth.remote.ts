import bcrypt from 'bcryptjs';
import * as v from 'valibot';
import { form, getRequestEvent } from '$app/server';
import { invalid, redirect } from '@sveltejs/kit';
import { User } from '#lib/mongoose/models/index.ts';
import type { ObjectId } from 'mongoose';

export const signIn = form(
	v.object({
		_password: v.pipe(v.string(), v.nonEmpty()),
		username: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ _password, username }, issue) => {
		const user: { _id: ObjectId; passwordHash: string } | null = await User.findOne({ username });
		if (user === null) return invalid(issue.username(`No username found`));

		if (!(await bcrypt.compare(_password, user.passwordHash)))
			return invalid(issue.username(`Credentials do not match`));

		const { cookies } = getRequestEvent();
		cookies.set('userId', user._id.toString(), { path: '/' });

		redirect(303, '/dashboard');
	}
);
