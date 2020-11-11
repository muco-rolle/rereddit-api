import { Field, InputType, ObjectType } from 'type-graphql';
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { ObjectID } from '@rereddit/types';
import { ObjectId } from 'mongodb';
@InputType()
export class PostInput {
    @Field() title!: string;
    @Field() description!: string;
    @Field() content!: string;
}

@ObjectType()
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class Post {
    @Field(() => ObjectID, { name: 'id' }) _id?: ObjectId;

    @prop() @Field(() => String) title!: string;

    @prop() @Field(() => String) description!: string;

    @prop() @Field(() => String) content!: string;

    @Field() updatedAt?: Date;
    @Field() createdAt?: Date;
}

export const PostModel = getModelForClass(Post);
