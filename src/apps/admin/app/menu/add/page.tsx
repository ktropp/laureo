import {MenuForm} from "../menu-form";

export default async function MenuAddPage() {
  const languages = process.env.LANGUAGES?.split(',');

  return <MenuForm menu languages={languages} />
}
