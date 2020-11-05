import 'reflect-metadata';
import express from 'express';
import { Container } from 'typedi';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { logger, env } from '@rereddit/utils';
import { RESOLVERS_PATH } from '@rereddit/config';

export const server = {
    async run() {
        const port = env.get('APP_PORT');
        const url = env.get('APP_URL');

        const app = express();

        try {
            const apolloServer = new ApolloServer({
                schema: await buildSchema({
                    resolvers: [RESOLVERS_PATH],
                    validate: false,
                    container: Container,
                }),
            });

            apolloServer.applyMiddleware({ app, path: '/graphql' });

            app.listen(port, () => logger.info(`server is running on: ${url}`));
        } catch (error) {
            logger.error(error);
        }
    },
};
