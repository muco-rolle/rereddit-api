import { Field, InputType, ObjectType } from 'type-graphql';
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { ObjectID } from '@rereddit/types';
import { ObjectId } from 'mongodb';

/**
 *  Response Types
 *******************************************************************/
@ObjectType()
export class LoginResponse {
    @Field() message!: string;
}
/**
 *  Input Types
 *******************************************************************/
@InputType()
export class AuthInput {
    @Field() username!: string;
    @Field() password!: string;
}

/**
 *  Types
 *******************************************************************/
@ObjectType()
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class User {
    @Field(() => ObjectID, { name: 'id' }) _id?: ObjectId;

    @prop({ unique: true }) @Field(() => String) username!: string;

    @prop() @Field(() => String) password!: string;

    @Field() updatedAt?: Date;
    @Field() createdAt?: Date;
}

export const UserModel = getModelForClass(User);
