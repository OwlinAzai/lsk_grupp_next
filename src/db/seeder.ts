import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from 'mysql2';
import { roles } from "./schema/users";
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
    } catch (error) {
        console.error("Ошибка при работе с базой данных:", error);
    } finally {
        connection.end(); // Закрытие соединения
    }
}

main();