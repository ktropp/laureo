import { MenuForm } from "../menu-form"
import { prisma } from "lib/prisma";

export default async function MenuEditPage({
    params,
}: {
    params: { id: string }
}) {
  const param = await params
  const menu = await prisma.menuLang.findUnique({
    where: {
      id: parseInt(param.id)
    },
    select: {
      id: true,
      menuId: true,
      items: true,
      menu: {
        include: {
          translations: true
        }
      },
      title: true,
      languageCode: true,
    }
  });

  if (!menu) {
    throw new Error('Menu not found');
  }

  return <MenuForm menu={menu} />
}
