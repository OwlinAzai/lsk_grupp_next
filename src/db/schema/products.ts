import { mysqlTable } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";
import { timestamps } from '../timestamps';
import { relations,sql } from "drizzle-orm";
import { users } from "./users";

export const productTypes = mysqlTable('product_types', {
    id: t.tinyint().primaryKey().autoincrement(),
    name: t.varchar('name', {length: 256}).notNull(),
    jsonSchema: t.json().notNull(),
    image: t.varchar('image', {length: 256}),
    entryParentID: t.tinyint('entry_parent_id').references(():t.AnyMySqlColumn => productTypes.id, {onDelete: 'set null'}),
    ...timestamps
});

export const unitOfMeasures = mysqlTable('unit_of_measures', {
    id: t.smallint().primaryKey().autoincrement(),
    fullName: t.varchar('full_name', {length: 256}).notNull(),
    shortName: t.varchar('short_name', {length: 256}).notNull(),
    ...timestamps
});

export const products = mysqlTable('products', {
    id: t.int().primaryKey().autoincrement(),
    productName: t.varchar('product_name', {length: 256}).notNull(),
    amount: t.real().notNull(),
    uomID: t.smallint('uom_id').references(() => unitOfMeasures.id, {onDelete: 'set null'}),
    productTypeId: t.tinyint('product_type_id').references(() => productTypes.id, {onDelete: 'cascade'}).notNull(),
    otherAttributes: t.json('other_attributes'),
    mainItem: t.boolean('main_item'),
    ...timestamps
});

export const reviews = mysqlTable('reviews', {
    id: t.int().primaryKey().autoincrement(),
    userID: t.int('user_id').references(() => users.id, {onDelete: 'cascade'}).notNull(),
    productID: t.int('product_id').references(() => products.id, {onDelete: 'cascade'}).notNull(),
    content: t.text(),
    score: t.smallint().notNull(),
    ...timestamps
}, (table) => [{
    checkConstraint: t.check("score_check", sql`${table.score} <= 50 AND ${table.score} >= 0`),
}]);

export const priceHistory = mysqlTable('price_history', {
    id: t.int().primaryKey().autoincrement(),
    productID: t.int('product_id').references(() => products.id, {onDelete: 'cascade'}).notNull(),
    content: t.text(),
    price: t.smallint().notNull(),
    period: t.date().notNull()    
}, (table) => [{
    checkConstraint: t.check("price_check", sql`${table.price} >= 0`),
}]);

export const callbackRequests = mysqlTable('callback_requests', {
    id: t.int().primaryKey().autoincrement(),
    userID: t.int('user_id').references((): t.AnyMySqlColumn => users.id, {onDelete: 'cascade'}),
    productID: t.int('product_id').references(() => products.id, {onDelete: 'cascade'}),
    name: t.varchar('name', {length: 512}).notNull(),
    phoneNumber: t.varchar("phone_number", {length: 15}).notNull(),
    created_at: timestamps['created_at'],
    processed: t.boolean(),
});