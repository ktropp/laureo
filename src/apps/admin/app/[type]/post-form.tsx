"use client"

import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Button} from "components/ui/button";
import {postAdd} from "actions/postAdd";
import {useActionState, useState} from "react";
import {Select, SelectTrigger, SelectValue, SelectItem, SelectContent} from "../../components/ui/select";
import {Textarea} from "components/ui/textarea";
import {postLangAdd} from "actions/postLangAdd";
import Link from "next/link";
import {BlockAdd} from "blocks/BlockAdd";
import {BlockJson} from "../../blocks/blockDefinitions";
import BaseBlock from "../../blocks/BaseBlock";
import {Settings} from "../../../../../theme/settings";
import Editor from "../../components/Editor";

export function PostForm({post}: { post: Post }) {
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

    const handleBlockAdd = (type: string, parentIndex?: string) => {
        const newBlock: BlockJson = {
            type: type
        };

        if (parentIndex !== undefined) {
            setBlocks(prev => {
                const updateBlocksRecursively = (blocks: BlockJson[], indices: string[]): BlockJson[] => {
                    return blocks.map((block, index) => {
                        if (index.toString() === indices[0]) {
                            if (indices.length === 1) {
                                return {
                                    ...block,
                                    children: [...(block.children || []), newBlock]
                                };
                            } else {
                                return {
                                    ...block,
                                    children: updateBlocksRecursively(block.children || [], indices.slice(1))
                                };
                            }
                        }
                        return block;
                    });
                };

                const indices = parentIndex.split('-');
                return updateBlocksRecursively(prev, indices);
            });
        } else {
            setBlocks(prev => [...prev, newBlock]);
        }
    };

    const handleBlockTextChange = (text: string, blockIndex: string) => {
        setBlocks(prev => {
            const updateBlocksRecursively = (blocks: BlockJson[], indices: string[]): BlockJson[] => {
                return blocks.map((block, index) => {
                    if (index.toString() === indices[0]) {
                        if (indices.length === 1) {
                            return {
                                ...block,
                                text: text
                            };
                        } else {
                            return {
                                ...block,
                                children: updateBlocksRecursively(block.children || [], indices.slice(1))
                            };
                        }
                    }
                    return block;
                });
            };

            const indices = blockIndex.split('-');
            return updateBlocksRecursively(prev, indices);
        });
    };


    const renderBlocks = (blocks: BlockJson[], parentIndex: string = '') => {
        return blocks?.map((block, index) => {
            const currentIndex = parentIndex ? `${parentIndex}-${index}` : `${index}`;

            return (
                <BaseBlock
                    key={currentIndex}
                    blockJson={block}
                    onBlockAdd={(newBlock) => handleBlockAdd(newBlock, currentIndex)}
                    onContentChange={(text) => handleBlockTextChange(text, currentIndex)}
                >
                    {block.children && renderBlocks(block.children, currentIndex)}
                </BaseBlock>
            );
        });
    };

    const currentPost = state || post || {};

    return (
        <form action={action}>
            <Input
                type="hidden"
                name="blocks"
                defaultValue={JSON.stringify(blocks)}
                required
            />
            <div className="flex justify-between">
                <div className="w-full">
                    <div className="fe-theme">
                        <div className={Settings.bodyClass}>
                            <Editor
                            data=""
                            onChange={() => {}}
                            holder="editor_create"
                            />
                            {renderBlocks(blocks)}
                            <BlockAdd onBlockAdd={handleBlockAdd}></BlockAdd>
                        </div>
                    </div>
                </div>
                <div
                    className="w-full max-w-md border-l min-h-sidebar-height px-3 ml-3 border-slate-300 dark:border-slate-600">
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
