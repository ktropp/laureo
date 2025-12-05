"use client"

import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Button} from "components/ui/button";
import {postAdd} from "actions/postAdd";
import {useActionState, useCallback, useState, useEffect} from "react";
import {Select, SelectTrigger, SelectValue, SelectItem, SelectContent} from "../../components/ui/select";
import {Textarea} from "components/ui/textarea";
import {postLangAdd} from "actions/postLangAdd";
import Link from "next/link";
import {BlockJson} from "../../blocks/blockDefinitions";
import {Settings} from "@theme/settings";
import BlockEditor from "../../components/editor/BlockEditor";
import {toast} from 'react-toastify';
import MetaEditor from "@admin/components/editor/MetaEditor";

export function PostForm({post, type}: { post: Post, type: string }) {
    const languages = Settings.languages;
    let translations;
    if (post.post) {
        translations = Settings.languages.map(code => {
            const match = post.post.translations.find(pl => pl.languageCode === code);
            return {
                languageCode: code,
                postLang: match || null
            }
        })
    }
    const defaultLanguage = Settings.defaultLanguage;

    const [state, action, pending] = useActionState(postAdd, undefined);
    const [blocks, setBlocks] = useState<Array<BlockJson>>(post?.blocks || []);

    const currentPost = state || post || {};

    const handleBlocksChange = useCallback((newBlocks: BlockJson[]) => {
        setBlocks(newBlocks);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault(); // Prevent default browser save dialog

                // Find and click the save button
                const saveButton = document.querySelector('button[id="post-submit"]') as HTMLButtonElement;
                if (saveButton && !saveButton.disabled) {
                    saveButton.click();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    let postUrl = Settings.frontendUrl + '/' + post?.slug
    if(type !== 'page' && post.languageCode){
        postUrl = Settings.frontendUrl + '/' + Settings.customPostTypes.filter(postType => postType.slug == type)[0].rewrite.filter(rewrite => rewrite.lang == post.languageCode.slice(0,2))[0].rewrite + '/' + post.slug
    }

    return (
        <form action={async (formData) => {
            const result = await action(formData);

            if (result?.errors) {
                toast.error('Please check the form for errors');
                return;
            }

            toast.success('Successfully saved!');
        }}>
            <Input
                type="hidden"
                name="blocks"
                defaultValue={JSON.stringify(blocks)}
                required
            />
            <div className="flex justify-between">
                <div className="w-full">
                    <BlockEditor
                        content={post?.blocks}
                        onChange={handleBlocksChange}
                    />
                    <MetaEditor postLang={post} type={type} />
                </div>
                <div
                    className="min-w-50 w-50 xl:w-100 border-l min-h-sidebar-height pl-3 ml-3 border-laureo-border dark:border-laureo-border-dark">
                    <div className="flex justify-between">
                        <Button type="submit" disabled={pending} className="mb-2" id="post-submit">
                            Save
                        </Button>
                        {post.slug ? (<Link href={postUrl} target="_blank">
                            <Button type="button" variant="outline">Preview</Button>
                        </Link>) : ''}
                    </div>

                    <Input
                        type="hidden"
                        name="id"
                        defaultValue={currentPost.id || ''}
                    />

                    <Input
                        type="hidden"
                        name="type"
                        defaultValue={type.toUpperCase() || 'PAGE'}
                        required
                    />

                    <div className="space-y-2 mb-2">
                        <Label htmlFor="status">Status</Label>
                        <Select defaultValue={currentPost.status || 'DRAFT'} name="status">
                            <SelectTrigger>
                                <SelectValue placeholder="Choose status"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key="DRAFT" value="DRAFT">Draft</SelectItem>
                                <SelectItem key="PUBLISHED" value="PUBLISHED">Published</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 mb-2">
                        <Label htmlFor="languageCode">Language</Label>
                        <Select defaultValue={currentPost.languageCode || defaultLanguage} name="languageCode"
                                disabled={currentPost.languageCode}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose language"/>
                            </SelectTrigger>
                            <SelectContent>
                                {languages?.map(item => (
                                    <SelectItem key={item}
                                                value={item}>{item}</SelectItem>
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

                    <div
                        className="w-full border-b-1 border-laureo-border dark:border-laureo-border-dark mt-4 mb-4"></div>

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

                    <div
                        className="w-full border-b-1 border-laureo-border dark:border-laureo-border-dark mt-4 mb-4"></div>

                    <h2 className="text-xl mt-5 font-semibold">Translations</h2>

                    {translations?.filter(lang => lang.languageCode !== currentPost.languageCode).map((lang, index) => (
                        <div key={index} className="flex items-center space-y2 mb-2">
                            <Label className="flex-[1_0_auto] mr-2 mb-0">{lang.languageCode}</Label>
                            <Input
                                type="text"
                                disabled
                                defaultValue={lang.postLang?.title || ''}
                            />
                            {lang.postLang ? (
                                <Link href={`/${currentPost.post?.type.toLowerCase()}/${lang.postLang.id}`}><Button
                                    type="button">Edit</Button></Link>) : (<Button type="button"
                                                                                   onClick={() => postLangAdd(currentPost.postId, lang.languageCode)}>Create</Button>)}
                        </div>
                    ))}
                </div>
            </div>
        </form>
    )
}
