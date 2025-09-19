import {PostForm} from "../post-form"

export default async function PostAddPage() {
  const languages = process.env.LANGUAGES?.split(',');

  return <PostForm post languages={languages} />
}
