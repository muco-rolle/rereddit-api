import { ApolloError } from 'apollo-server-express';
import { Post, PostInput, PostModel } from './post.model';
import { ObjectId } from 'mongodb';
import { logger } from '@rereddit/utils';

export class PostProvider {
    async allPosts(): Promise<Post[]> {
        const posts = PostModel.find().exec();

        return posts;
    }

    async onePost(postId: ObjectId) {
        const post = await PostModel.findOne({ _id: postId }).exec();

        if (!post) throw new ApolloError('GET-POST_NOT-FOUND', '404');

        return post;
    }

    async createPost(post: PostInput): Promise<Post> {
        const { title, description, content } = post;
        return PostModel.create({ title, description, content });
    }

    async updatePost(postId: ObjectId, post: PostInput) {
        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            post,
            {
                new: true,
            }
        ).exec();

        if (!updatedPost)
            return new ApolloError('UPDATE-POST_NOT-FOUND', '404');

        return updatedPost;
    }

    async deletePost(postId: ObjectId) {
        const deletedPost = await PostModel.findOneAndDelete({
            _id: postId,
        }).exec();

        logger.info(deletedPost);
        if (!deletedPost) throw new ApolloError('DELETE-POST_NOT-FOUND', '404');

        return deletedPost;
    }
}
