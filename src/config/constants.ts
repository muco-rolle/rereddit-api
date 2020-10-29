import { join } from 'path';
import { rootPath } from '@rereddit/utils';

export const LOG_PATH = join(rootPath, 'src/logs');

export const RESOLVERS_PATH = join(
    rootPath,
    'src/modules/**/*.resolver.{ts,js}'
);
