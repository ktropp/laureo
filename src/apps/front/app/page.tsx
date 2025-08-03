import Image from "next/image";
import { prisma } from "../lib/prisma";

export default async function Home() {
  const page = await prisma.postLang.findFirst({
    where: {
      slug: '/',
      languageCode: 'cs-CZ'
    }
  });

  return (
    <div>Page: {page.id}</div>
  )
}
