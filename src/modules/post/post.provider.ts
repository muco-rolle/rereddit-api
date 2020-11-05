import { Post, PostInput, PostModel } from './post.model';

export class PostProvider {
    async allPosts(): Promise<Post[]> {
        return await PostModel.find().exec();
    }

    async onePost(postId: number) {
        return await PostModel.findOne({ _id: postId }).exec();
    }

    async createPost(post: PostInput): Promise<Post> {
        const { title, description, content } = post;
        return await PostModel.create({ title, description, content });
    }
}
