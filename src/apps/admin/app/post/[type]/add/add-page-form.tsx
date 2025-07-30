"use client"

import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { postAdd } from "actions/postAdd";
import { useActionState } from "react";

export function AddPostForm() {
  const [state, action, pending] = useActionState(postAdd, undefined);

  const currentPost = state?.data || {}

  return (
    <form action={action}>
      <div className="flex justify-between">
        <div className="w-full">

          <Input
            type="hidden"
            name="type"
            defaultValue="PAGE"
            required
          />

          <div className="space-y-2 mb-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter title"
              name="title"
              required
              defaultValue={currentPost.title}
            />
          </div>

          <div className="space-y-2 mb-2">
            <Label htmlFor="url">Url</Label>
            <Input
              id="url"
              type="text"
              placeholder="Enter url"
              name="url"
              required
              defaultValue={currentPost.url}
            />
          </div>

          <div>
            Page content TODO
          </div>
        </div>
        <div className="w-full max-w-md border-l min-h-sidebar-height px-3 ml-3 border-slate-300 dark:border-slate-600">
          <Button type="submit" disabled={pending}>
            Add
          </Button>
        </div>
      </div>
    </form>
  )
}
