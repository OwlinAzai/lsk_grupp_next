import { mysqlTable } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";
import { timestamps } from '../timestamps';

export const roles = mysqlTable('roles', {
    'id': t.smallint().primaryKey().autoincrement(),
    'name': t.varchar('name', {length: 256}).notNull(),
});

export const users = mysqlTable('users', {
    'id': t.int().primaryKey().autoincrement(),
    firstName: t.varchar('first_name', {length: 256}),
    lastName: t.varchar('last_name', {length: 256}),
    email: t.varchar('email', {length: 256}).unique().notNull(),
    emailVerifiedAt: t.timestamp('email_verified_at'),
    password: t.varchar('password', {length: 256}).notNull(),
    role: t.smallint('role_id').references(() => roles.id, {onDelete: 'set null'}),
    // $table->rememberToken();
    // $table->timestamps();
    ...timestamps
});

export const passwordResetTokens = mysqlTable('password_reset_tokens', {
    email: t.varchar('email', {length: 256}).primaryKey().notNull(),
    token: t.varchar('token', {length: 128}).notNull(),
    created_at: timestamps['created_at'],
}); 