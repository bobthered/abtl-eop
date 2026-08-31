import { defineModel } from '../defineModel';

export const Branch = defineModel('Branch', {
	label: { type: String, required: true },
	number: { type: Number, required: true, unique: true }
});
