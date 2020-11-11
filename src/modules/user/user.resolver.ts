import { Arg, Ctx, Mutation, Query } from 'type-graphql';
import { AuthInput, LoginResponse, User, UserModel } from './user.model';
import { hash, verify } from 'argon2';
import { ApolloError } from 'apollo-server-express';
import { logger } from '@rereddit/utils';
import { Context } from '@rereddit/types';

export class UserResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: Context) {
        logger.log('info', `user id: ${ctx.req.session.userId}`);

        const { userId } = ctx.req.session;

        return userId ? await UserModel.findById(userId) : null;
    }

    @Mutation(() => User)
    async signup(@Arg('user') user: AuthInput) {
        const { username, password } = user;

        const hashedPassword = await hash(password);

        try {
            const savedUser = await UserModel.create({
                username,
                password: hashedPassword,
            });

            return savedUser;
        } catch (error) {
            logger.log('error', error.code);

            if (error.code === 11000) {
                throw new ApolloError('SIGNUP.USER_REGISTERED');
            }

            throw new ApolloError('SERVER.INTERNAL_SERVER_ERROR');
        }
    }

    @Mutation(() => LoginResponse)
    async login(@Arg('user') user: AuthInput, @Ctx() ctx: Context) {
        const { username, password } = user;

        const foundUser = await UserModel.findOne({ username }).exec();

        if (!foundUser)
            throw new ApolloError('LOGIN.INVALID_CREDENTIALS', '400');

        const validPassword = verify(foundUser.password, password);

        if (!validPassword)
            throw new ApolloError('LOGIN.INVALID_CREDENTIALS', '400');

        ctx.req.session.userId = foundUser._id;

        return { message: 'LOGIN.SUCCESS' };
    }
}
