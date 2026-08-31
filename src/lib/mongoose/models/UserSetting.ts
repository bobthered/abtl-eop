import { defineModel } from '../defineModel';

export const UserSetting = defineModel('UserSetting', {
	magnification: { type: Number, default: 16 },
	theme: { type: String, default: 'elegant-midnight' }
});
