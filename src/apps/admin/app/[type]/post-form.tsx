"use client"

import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { postAdd } from "actions/postAdd";
import { useActionState } from "react";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "../../components/ui/select";
import { Textarea } from "components/ui/textarea";

export function PostForm({ post }: { post: Post }) {
  const [state, action, pending] = useActionState(postAdd, undefined);

  const currentPost = state?.data || post || {};

  return (
    <form action={action}>
      <div className="flex justify-between">
        <div className="w-full">
          <Input
            type="hidden"
            name="blocks"
            defaultValue={currentPost.blocks || '{}'}
            required
          />

          Json: {currentPost.blocks || '{}'}

        </div>
        <div className="w-full max-w-md border-l min-h-sidebar-height px-3 ml-3 border-slate-300 dark:border-slate-600">
          <Button type="submit" disabled={pending} className="mb-2">
            Save
          </Button>

          <Input
            type="hidden"
            name="type"
            defaultValue="PAGE"
            required
          />

          <div className="space-y-2 mb-2">
            <Label htmlFor="select">Status</Label>
            <Select value="DRAFT" name="status">
              <SelectTrigger>
                <SelectValue placeholder="Choose status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 mb-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter title"
              name="title"
              required
              defaultValue={currentPost.title}
              error={state?.errors?.title}
            />
          </div>

          <div className="space-y-2 mb-2">
            <Label htmlFor="slug">Url</Label>
            <Input
              id="slug"
              type="text"
              placeholder="Enter url"
              name="slug"
              required
              defaultValue={currentPost.slug}
              error={state?.errors?.slug}
            />
          </div>

          <div className="w-full border-b-1 border-slate-300 dark:border-slate-600 mt-4 mb-4"></div>

          <h2 className="text-xl mt-5 font-semibold">Seo</h2>

          <div className="space-y-2 mb-2">
            <Label htmlFor="meta_title">Meta title</Label>
            <Input
              id="meta_title"
              type="text"
              placeholder="Enter meta title"
              name="metaTitle"
              defaultValue={currentPost.metaTitle}
              error={state?.errors?.metaTitle}
            />
          </div>

          <div className="space-y2 mb-2">
            <Label htmlFor="meta_description">Meta description</Label>
            <Textarea
              id="meta_description"
              placeholder="Enter meta description"
              name="metaDescription"
              defaultValue={currentPost.metaDescription}
              error={state?.errors?.metaDescription}
            />
          </div>

          <div className="space-y-2 mb-2">
            <Label htmlFor="meta_keywords">Meta keywords</Label>
            <Input
              id="meta_keywords"
              type="text"
              placeholder="Enter meta keywords"
              name="metaKeywords"
              defaultValue={currentPost.metaKeywords}
              error={state?.errors?.metaKeywords}
            />
          </div>

        </div>
      </div>
    </form>
  )
}
