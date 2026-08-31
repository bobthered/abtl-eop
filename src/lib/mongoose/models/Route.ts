import { defineModel } from '../defineModel';

export const Route = defineModel('Route', {
	href: { type: String, required: true, trim: true, unique: true },
	label: { type: String, required: true, trim: true }
});
