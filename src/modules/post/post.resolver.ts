import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Post, PostInput } from './post.model';
import { PostProvider } from './post.provider';

@Resolver()
export class PostResolver {
    constructor(private readonly postProvider: PostProvider) {}
    @Query(() => String)
    hello() {
        return 'Hello, World!!!';
    }

    @Query(() => [Post])
    async posts(): Promise<Post[]> {
        return await this.postProvider.allPosts();
    }

    @Mutation(() => Post)
    async createPost(@Arg('post') post: PostInput) {
        return await this.postProvider.createPost(post);
    }
}
