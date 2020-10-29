import { database, server } from '@rereddit/config';

async function main() {
    await database.run();
    await server.run();
}

main();
