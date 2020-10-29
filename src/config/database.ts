import { env, logger } from '@rereddit/utils';
import { connect } from 'mongoose';

export const database = {
    async run() {
        try {
            const url = env.get('DB_URL');
            const mongodbOptions = {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            };

            await connect(url, mongodbOptions);

            logger.info(`mongodb running at: ${url}`);
        } catch (error) {
            logger.error(error);
        }
    },
};
