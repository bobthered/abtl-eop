import { Types } from 'mongoose';
import { defineModel } from '../defineModel';

export const User = defineModel('User', {
	_branchIds: [{ type: Types.ObjectId, ref: 'Branch' }],
	_defaultBranchId: { type: Types.ObjectId, ref: 'Branch' },
	_roleIds: [{ type: Types.ObjectId, ref: 'Role' }],
	_userProfileId: { type: Types.ObjectId, ref: 'UserProfile' },
	_userSettingsId: { type: Types.ObjectId, ref: 'UserSetting' },
	isActive: { type: Boolean, default: false },
	passwordHash: { type: String, required: true },
	username: { type: String, required: true, unique: true }
});
