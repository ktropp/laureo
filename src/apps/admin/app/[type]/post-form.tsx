"use client"

import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { postAdd } from "actions/postAdd";
import { useActionState } from "react";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "../../components/ui/select";
import { Textarea } from "components/ui/textarea";
import { postLangAdd } from "actions/postLangAdd";
import Link from "next/link";
import { BlockAdd } from "blocks/BlockAdd";

export function PostForm({ post, languages }: { post: Post, languages: Array }) {
  const [state, action, pending] = useActionState(postAdd, undefined);

  const currentPost = state?.data || post || {};

  return (
    <form action={action}>
      <div className="flex justify-between">
        <div className="w-full">
          <Input
            type="hidden"
            name="blocks"
            defaultValue={JSON.stringify(currentPost.blocks) || '{}'}
            required
          />

          Json: {JSON.stringify(currentPost.blocks) || '{}'}

          <BlockAdd></BlockAdd>

        </div>
        <div className="w-full max-w-md border-l min-h-sidebar-height px-3 ml-3 border-slate-300 dark:border-slate-600">
          <Button type="submit" disabled={pending} className="mb-2">
            Save
          </Button>

          <Input
            type="hidden"
            name="id"
            defaultValue={currentPost.id || ''}
          />

          <Input
            type="hidden"
            name="type"
            defaultValue="PAGE"
            required
          />

          <div className="space-y-2 mb-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue={currentPost.status || 'DRAFT'} name="status">
              <SelectTrigger>
                <SelectValue placeholder="Choose status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="DRAFT" value="DRAFT">Draft</SelectItem>
                <SelectItem key="PUBLISHED" value="PUBLISHED">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 mb-2">
            <Label htmlFor="languageCode">Language</Label>
            <Select defaultValue={currentPost.languageCode || process.env.DEFAULT_LANG} name="languageCode" disabled={currentPost.languageCode}>
              <SelectTrigger>
                <SelectValue placeholder="Choose language" />
              </SelectTrigger>
              <SelectContent>
                {languages?.map(item => (
                  <SelectItem key={item.languageCode} value={item.languageCode}>{item.languageCode}</SelectItem>
                ))}
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

          <div className="w-full border-b-1 border-slate-300 dark:border-slate-600 mt-4 mb-4"></div>

          <h2 className="text-xl mt-5 font-semibold">Translations</h2>

          {languages?.filter(lang => lang.languageCode !== currentPost.languageCode).map((lang, index) => (
            <div key={index} className="flex items-center space-y2 mb-2">
              <Label className="flex-[1_0_auto] mr-2 mb-0">{lang.languageCode}</Label>
              <Input
                type="text"
                disabled
                defaultValue={lang.postLang?.title || ''}
              />
              {lang.postLang ? (<Link href={`/${currentPost.post.type.toLowerCase()}/${lang.postLang.id}`}><Button type="button">Edit</Button></Link>) : (<Button type="button" onClick={() => postLangAdd(currentPost.postId, lang)}>Create</Button>)}
            </div>
          ))}
        </div>
      </div>
    </form>
  )
}
