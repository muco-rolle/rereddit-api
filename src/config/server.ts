import 'reflect-metadata';
import express from 'express';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

import { logger, env, nodeEnv } from '@rereddit/utils';
import { RESOLVERS_PATH } from '@rereddit/config';
import { Context } from '@rereddit/types';

export const server = {
    async run() {
        const port = env.get('APP_PORT');
        const url = env.get('APP_URL');
        const secretKey = env.get('SECRET_KEY');

        /**
         * Init Express app
         *************************************************/
        const app = express();

        /**
         * Configure Redis and Express session middleware
         *************************************************/
        const RedisStore = connectRedis(session);
        const redisClient = redis.createClient();

        try {
            /**
             * Add Express middlewares
             *************************************************/
            app.use(
                session({
                    name: 'qid',
                    store: new RedisStore({
                        client: redisClient,
                        disableTouch: true,
                    }),
                    cookie: {
                        maxAge: 1000 * 60 * 60 * 365 * 1, // year,
                        httpOnly: true,
                        sameSite: 'lax', // csrf
                        secure: nodeEnv === 'production' ? true : false,
                    },
                    secret: secretKey,
                    saveUninitialized: false,
                    resave: false,
                })
            );

            const apolloServer = new ApolloServer({
                schema: await buildSchema({
                    resolvers: [RESOLVERS_PATH],
                    validate: false,
                    container: Container,
                }),

                context: async ({ req }: Context) => ({ req }),
            });

            apolloServer.applyMiddleware({ app, path: '/graphql' });

            app.listen(port, () => logger.info(`server is running on: ${url}`));
        } catch (error) {
            logger.error(error);
        }
    },
};
