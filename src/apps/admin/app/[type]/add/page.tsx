import {PostForm} from "../post-form"
import {getBlocksFromTemplate} from "@admin/lib/template";

export default async function PostAddPage({params,}: { params: { type: string } }) {
  const param = await params
  const defaultBlocks = await getBlocksFromTemplate(param.type)
  const post = {blocks: defaultBlocks}
  return <PostForm post={post} type={param.type} />
}
