import { drizzle } from "drizzle-orm/node-postgres";
import * as usersTables from './schema/users';
import * as productsTables from './schema/products';
import "../../envConfig";

export const db = {
    dbObject: drizzle({
        connection: {
            host: process.env.DB_HOST!,
            port: Number(process.env.DB_PORT!),
            user: process.env.DB_USERNAME!,
            password: process.env.DB_PASSWORD!,
            database: process.env.DB_DATABASE!
        }
    }),
    tables: {
        roles: usersTables.roles
    }    
};
