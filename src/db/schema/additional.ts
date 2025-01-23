import { createConnection } from "mysql2";
import { mysqlTable } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";
import { timestamps } from '../timestamps';

export const companyInfo = mysqlTable('company_info', {
    id: t.tinyint().primaryKey().autoincrement(),
    name: t.varchar("name", {length: 256}).notNull(),
    numberOfEmployees: t.mysqlEnum(["1", "2-4", "5-10", "10-100", "больше 100"]).notNull(),
    dateOfFoundation: t.date().notNull(),
    legalForm: t.mysqlEnum(["Индивидуальный предприниматель", "Унитарное предприятие", "Общество с ограниченной ответственностью", "Общество с дополнительной ответственностью", "Открытое акционерное общество", "Закрытое акционерное общество"]).notNull(),
});

export const contacts = mysqlTable('contacts', {
    id: t.smallint().primaryKey().autoincrement(),
    type: t.mysqlEnum(["phone", "adress", "email"]).notNull(),
    signature: t.varchar("signature", {length: 128}),
    value: t.varchar("value", {length: 128})
});