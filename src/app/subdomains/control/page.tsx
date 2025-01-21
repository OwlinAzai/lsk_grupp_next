import { roles } from "@/db/schema/users";
import { db } from "@/db/singletonDB";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

export default function ControlMenu(){
    async function getRoles(){
        const roles = (await db.dbObject.select().from(db.tables.roles));
        return roles;
    }
    const roles = getRoles();
    console.log(roles);
    return <>hello world</>;
}