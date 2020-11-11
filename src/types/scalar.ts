import { GraphQLScalarType, Kind } from 'graphql';
import { ObjectId as MongoObjectID } from 'mongodb';

export const ObjectID = new GraphQLScalarType({
    name: 'ObjectID',
    description: 'Mongo object id scalar type',
    serialize(value: unknown): string {
        // check the type of received value
        if (!(value instanceof MongoObjectID)) {
            throw new Error(
                'ObjectIdScalar can only serialize ObjectId values'
            );
        }
        return value.toHexString(); // value sent to the client
    },
    parseValue(value: unknown): MongoObjectID {
        // check the type of received value
        if (typeof value !== 'string') {
            throw new Error('ObjectIdScalar can only parse string values');
        }
        return new MongoObjectID(value); // value from the client input variables
    },
    parseLiteral(ast): MongoObjectID {
        // check the type of received value
        if (ast.kind !== Kind.STRING) {
            throw new Error('ObjectIdScalar can only parse string values');
        }
        return new MongoObjectID(ast.value); // value from the client query
    },
});
