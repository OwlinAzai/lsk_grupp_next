import * as t from 'drizzle-orm/mysql-core';

export const timestamps = {
    created_at: t.timestamp().notNull(),
    edited_at: t.timestamp()
};