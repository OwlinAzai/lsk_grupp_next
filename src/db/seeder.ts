import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from 'mysql2';
import { roles } from "./schema/users";
import { companyInfo, contacts } from './schema/additional';
import '../../envConfig';

async function main() {
    const connection = createConnection({
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT!),
        user: process.env.DB_USERNAME!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_DATABASE!
    });

    const db = drizzle(connection);
    try {
        await db.delete(roles);
        await db.insert(roles).values({ name: 'Администратор' });
        await db.insert(roles).values({ name: 'Пользователь' });
        await db.insert(companyInfo).values({
            name: "ООО \"ЛСК-групп\"",
            numberOfEmployees: "5-10",
            dateOfFoundation: new Date(2020, 2, 28),
            legalForm: "Общество с ограниченной ответственностью",
        });
        await db.insert(contacts).values({
            type: "phone",
            signature: "Рабочий телефон",
            value: "+375172439159",
        });
        await db.insert(contacts).values({
            type: "phone",
            signature: "Василий Николаевич (МТС)",
            value: "+375292782343",
        });
        await db.insert(contacts).values({
            type: "phone",
            signature: "Игорь Болеславович (А1)",
            value: "+375291730654",
        });
        await db.insert(contacts).values({
            type: "adress",
            signature: "Адрес офиса",
            value: "г. Минск, ул. Селицкого 23, Минск, Беларусь",
        });
        await db.insert(contacts).values({
            type: "contact_person",
            signature: "Директор",
            value: "Германович Игорь Болеславович",
        });
        await db.insert(contacts).values({
            type: "email",
            signature: "Email",
            value: "lskgruppinfo@gmail.com",
        });
    } catch (error) {
        console.error("Ошибка при работе с базой данных:", error);
    } finally {
        connection.end(); // Закрытие соединения
    }
}

main();