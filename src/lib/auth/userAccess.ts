import { User } from '../mongoose/models';

type Route = {
	id: string;
	href: string;
	label: string;
};

type Access = {
	user: {
		id: string;
		username: string;
	};
	routes: Route[];
};

export class UserAccess {
	private _cache = new Map<string, Access>();

	cache(): ReadonlyMap<string, Access> {
		return this._cache;
	}

	async get(userId: string): Promise<Access | null> {
		const cached = this._cache.get(userId);

		if (cached) return cached;

		const access = await this.load(userId);

		if (!access) return null;

		this._cache.set(userId, access);

		return access;
	}

	invalidate(userId: string): void {
		this._cache.delete(userId);
	}

	private async load(userId: string): Promise<Access | null> {
		const user: any = await User.findById(userId)
			.populate({
				path: '_roleIds',
				populate: {
					path: '_routeIds'
				}
			})
			.lean();

		if (!user) return null;

		const routes = user._roleIds.flatMap((role: any) => role._routeIds);

		const uniqueRoutes: any[] = Array.from(
			new Map(
				routes.map((route: any) => [
					route._id.toString(),
					{
						id: route._id.toString(),
						href: route.href,
						label: route.label
					}
				])
			).values()
		);

		return {
			user: {
				id: user._id.toString(),
				username: user.username
			},
			routes: uniqueRoutes
		};
	}
}

export const userAccess = new UserAccess();
