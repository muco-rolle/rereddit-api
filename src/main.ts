import { database } from '@rereddit/config';

async function bootstrap() {
    await database.run();
}

bootstrap();
