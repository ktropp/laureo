import {PostForm} from "../post-form"

export default async function PostAddPage({params,}: { params: { type: string } }) {
  const param = await params
  return <PostForm post type={param.type} />
}
