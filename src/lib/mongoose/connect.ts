import mongoose from 'mongoose';
import { MONGODB_DB, MONGODB_URL } from '$app/env/private';

type Options = {
	appName?: string;
	dbName?: string;
	family?: 0 | 4 | 6;
	maxPoolSize?: number;
	minPoolSize?: number;
	maxIdleTimeMS?: number;
	serverSelectionTimeoutMS?: number;
};

let connPromise: Promise<typeof mongoose> | null = null;

const options = ({
	appName,
	dbName,
	family,
	maxPoolSize,
	minPoolSize,
	maxIdleTimeMS,
	serverSelectionTimeoutMS
}: Options = {}) => {
	const dev = import.meta.env.DEV;

	return {
		appName: appName ?? 'sveltekit-app',
		dbName: dbName ?? MONGODB_DB,
		family: family ?? 4,
		maxPoolSize: maxPoolSize ?? (dev ? 5 : 10),
		minPoolSize: minPoolSize ?? 0,
		maxIdleTimeMS: maxIdleTimeMS ?? 30_000,
		serverSelectionTimeoutMS: serverSelectionTimeoutMS ?? 5_000
	} as const;
};

export const connect = async (): Promise<typeof mongoose> => {
	const state = mongoose.connection.readyState;

	if (state === 1) return mongoose;

	if (connPromise) return connPromise;

	mongoose.set('bufferCommands', false);

	try {
		connPromise = mongoose.connect(MONGODB_URL ?? '', options());

		return await connPromise;
	} catch (error) {
		connPromise = null;
		throw error;
	}
};
