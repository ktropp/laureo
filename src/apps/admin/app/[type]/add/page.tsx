import {PostForm} from "../post-form"

export default async function PostAddPost() {
  const languages = process.env.LANGUAGES?.split(',');

  return <PostForm post languages={languages} />
}
