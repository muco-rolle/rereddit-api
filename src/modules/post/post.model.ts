import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

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
    @prop() @Field(() => ID, { name: 'id' }) id?: number;

    @prop() @Field(() => String) title!: string;

    @prop() @Field(() => String) description!: string;

    @prop() @Field(() => String) content!: string;
    @Field() updatedAt?: Date;
    @Field() createdAt?: Date;
}

export const PostModel = getModelForClass(Post);
