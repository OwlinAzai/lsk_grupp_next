import Image from "next/image";
import { db } from "@/db/singletonDB";
import Layout from './layout';
import Header from "@/app/components/header";

export default function Home() {
  return (<Layout>
    <div>
      <Header />
    </div>
  </Layout>);
}
