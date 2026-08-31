import mongoose, { Schema, Types, type Model } from 'mongoose';

const _createdById = {
	type: Types.ObjectId,
	ref: 'User',
	required: false
};

const schemaOptions = {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt'
	}
};

export const defineModel = <T>(name: string, schemaDef: any): Model<T> => {
	const schema = new Schema<T>(
		{
			_createdById,
			...schemaDef
		},
		schemaOptions
	);

	return (mongoose.models[name] as Model<T>) ?? mongoose.model<T>(name, schema);
};
