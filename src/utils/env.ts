import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { join } from 'path';
import { existsSync } from 'fs';

import { EnvTypes } from '@rereddit/types';

export const nodeEnv = process.env['NODE_ENV'] as string;
export const rootPath = process.cwd();

export const envFile = `.env.${nodeEnv}`;

export const env = {
    get(key: keyof EnvTypes): string {
        const path = join(rootPath, envFile);

        // get system declared env
        if (!existsSync(path)) {
            return process.env[key.toUpperCase()] as string;
        }

        const envConfig = config({ path });
        dotenvExpand(envConfig);

        const envVaribale = process.env[key.toUpperCase()];

        if (!envVaribale) {
            throw Error(`Env variable: ${key} does not exist.`);
        } else {
            return envVaribale;
        }
    },
};
