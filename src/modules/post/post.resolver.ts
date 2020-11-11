import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Post, PostInput } from './post.model';
import { PostProvider } from './post.provider';
import { ObjectID } from '@rereddit/types';
import { ObjectId } from 'mongodb';

@Resolver()
export class PostResolver {
    constructor(private readonly postProvider: PostProvider) {}

    @Query(() => Post)
    async post(@Arg('postId', () => ObjectID) postId: ObjectId): Promise<Post> {
        return await this.postProvider.onePost(postId);
    }

    @Query(() => [Post])
    async posts() {
        return await this.postProvider.allPosts();
    }

    @Mutation(() => Post)
    async createPost(@Arg('post') post: PostInput) {
        return await this.postProvider.createPost(post);
    }

    @Mutation(() => Post)
    async updatePost(
        @Arg('postId', () => ObjectID) postId: ObjectId,
        @Arg('post') post: PostInput
    ) {
        return await this.postProvider.updatePost(postId, post);
    }

    @Mutation(() => Post)
    async deletePost(@Arg('postId', () => ObjectID) postId: ObjectId) {
        return await this.postProvider.deletePost(postId);
    }
}
