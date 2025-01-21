import { drizzle } from "drizzle-orm/mysql2";
import * as usersTables from './schema/users';
import * as productsTables from './schema/products';
// import "../../envConfig";
import { createConnection } from 'mysql2';

const connection = createConnection({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!
});

export const db = {
    dbObject: drizzle(connection),
    tables: {
        roles: usersTables.roles,
        users: usersTables.users,
        passwordResetTokens: usersTables.passwordResetTokens,
        uom: productsTables.unitOfMeasures,
        productTypes: productsTables.productTypes,
        products: productsTables.products,
        priceHistory: productsTables.priceHistory,
        callbackRequests: productsTables.callbackRequests
    }    
};
