import mongoose from 'mongoose';
import { MONGODB_DB, MONGODB_URL } from '$app/env/private';

type Options = {
	appName?: string;
	dbName?: string;
	maxPoolSize?: number;
	minPoolSize?: number;
	maxIdleTimeMS?: number;
	serverSelectionTimeoutMS?: number;
};

let connPromise: Promise<typeof mongoose> | null = null;

const options = ({
	appName,
	dbName,
	maxPoolSize,
	minPoolSize,
	maxIdleTimeMS,
	serverSelectionTimeoutMS
}: Options = {}) => {
	const dev = import.meta.env.DEV;

	return {
		appName: appName ?? 'sveltekit-app',
		dbName: dbName ?? MONGODB_DB,
		maxPoolSize: maxPoolSize ?? (dev ? 5 : 10),
		minPoolSize: minPoolSize ?? 0,
		maxIdleTimeMS: maxIdleTimeMS ?? 30_000,
		serverSelectionTimeoutMS: serverSelectionTimeoutMS ?? 5_000
	} as const;
};

export const connect = async (): Promise<typeof mongoose> => {
	const state = mongoose.connection.readyState;

	// 1 = connected
	if (state === 1) return mongoose;

	// Existing in-flight connection
	if (connPromise) return connPromise;

	// Disable mongoose command buffering so failures surface immediately
	mongoose.set('bufferCommands', false);

	try {
		connPromise = mongoose.connect(MONGODB_URL, options());

		return await connPromise;
	} catch (error) {
		// Allow future retries if initial connection fails
		connPromise = null;
		throw error;
	}
};
