import { Types } from 'mongoose';
import { defineModel } from '../defineModel';

export const Role = defineModel('Role', {
	_routeIds: [{ type: Types.ObjectId, ref: 'Route' }],
	label: { type: String, required: true, unique: true }
});
