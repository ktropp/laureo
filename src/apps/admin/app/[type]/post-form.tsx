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
import {useTranslations} from "next-intl";
import {EllipsisVertical} from "lucide-react";

export function PostForm({post, type}: { post: Post, type: string }) {
    const t = useTranslations('post-form')
    const tStatuses = useTranslations('statuses')
    const tSeo = useTranslations('seo')
    const tTranslations = useTranslations('translations')
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
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

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
    if (type === 'page' && Settings.defaultLanguage !== post.languageCode) {
        postUrl = Settings.frontendUrl + '/' + post.languageCode.slice(0, 2) + '/' + post?.slug
    }
    if (type !== 'page' && post.languageCode) {
        postUrl = Settings.frontendUrl + '/' + Settings.customPostTypes.filter(postType => postType.slug == type)[0].rewrite.filter(rewrite => rewrite.lang == post.languageCode.slice(0, 2))[0].rewrite + '/' + post.slug
    }

    return (
        <form spellCheck={false} action={async (formData) => {
            const result = await action(formData);

            if (result?.errors) {
                toast.error(t('error'));
                return;
            }

            toast.success(t('success'));
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
                    <MetaEditor postLang={post} type={type}/>
                </div>
                <div
                    className="min-w-50 w-50 xl:w-100 border-l min-h-sidebar-height pl-3 ml-3 border-laureo-border dark:border-laureo-border-dark">
                    <div className="flex justify-between">
                        <Button type="submit" disabled={pending} className="mb-2" id="post-submit">
                            {t('save')}
                        </Button>
                        <div className="flex items-center">
                            {post.slug ? (<Link href={postUrl} target="_blank">
                                <Button type="button" variant="outline">{t('preview')}</Button>
                            </Link>) : ''}
                            <div className="relative">
                                <Button
                                    type="button"
                                    variant="link"
                                    title={t('more-title')}
                                    onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                                >
                                    <EllipsisVertical></EllipsisVertical>
                                </Button>
                                <div
                                    className={`absolute z-2 top-12 right-0 bg-laureo-body dark:bg-laureo-body-dark border border-laureo-border dark:border-laureo-border-dark min-w-60 flex-col ${isOptionsOpen ? 'flex' : 'hidden'}`}>
                                    <div className="p-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsOptionsOpen(false);
                                            }}
                                            className="cursor-pointer hover:text-laureo-primary flex justify-between w-full p-2">
                                            <span>{t('more-copy-all')}</span>
                                        </button>
                                    </div>
                                    <div className="p-2 border-t border-laureo-border dark:border-laureo-border-dark">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsOptionsOpen(false);
                                            }}
                                            className="cursor-pointer hover:text-laureo-primary flex justify-between w-full p-2">
                                            <span>{t('more-lock-all')}</span>
                                        </button>
                                    </div>
                                    <div className="p-2 border-t border-laureo-border dark:border-laureo-border-dark">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsOptionsOpen(false);
                                            }}
                                            className="cursor-pointer hover:text-laureo-primary flex justify-between w-full p-2">
                                            <span>{t('more-unlock-all')}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        <Label htmlFor="status">{t('status')}</Label>
                        <Select defaultValue={currentPost.status || 'DRAFT'} name="status">
                            <SelectTrigger>
                                <SelectValue placeholder={t('status-placeholder')}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key="DRAFT" value="DRAFT">{tStatuses('draft')}</SelectItem>
                                <SelectItem key="PUBLISHED" value="PUBLISHED">{tStatuses('published')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 mb-2">
                        <Label htmlFor="languageCode">{t('language')}</Label>
                        <Select defaultValue={currentPost.languageCode || defaultLanguage} name="languageCode"
                                disabled={currentPost.languageCode}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('language-placeholder')}/>
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
                        <Label htmlFor="title">{t('title')}</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder={t('title-placeholder')}
                            name="title"
                            required
                            defaultValue={currentPost.title}
                            error={state?.errors?.title}
                        />
                    </div>

                    <div className="space-y-2 mb-2">
                        <Label htmlFor="slug">{t('url')}</Label>
                        <Input
                            id="slug"
                            type="text"
                            placeholder={t('url-placeholder')}
                            name="slug"
                            required
                            defaultValue={currentPost.slug}
                            error={state?.errors?.slug}
                        />
                    </div>

                    <div
                        className="w-full border-b-1 border-laureo-border dark:border-laureo-border-dark mt-4 mb-4"></div>

                    <h2 className="text-xl mt-5 font-semibold">{tSeo('title')}</h2>

                    <div className="space-y-2 mb-2">
                        <Label htmlFor="meta_title">{tSeo('meta-title')}</Label>
                        <Input
                            id="meta_title"
                            type="text"
                            placeholder={tSeo('meta-title-placeholder')}
                            name="metaTitle"
                            defaultValue={currentPost.metaTitle}
                            error={state?.errors?.metaTitle}
                        />
                    </div>

                    <div className="space-y2 mb-2">
                        <Label htmlFor="meta_description">{tSeo('meta-description')}</Label>
                        <Textarea
                            id="meta_description"
                            placeholder={tSeo('meta-description-placeholder')}
                            name="metaDescription"
                            defaultValue={currentPost.metaDescription}
                            error={state?.errors?.metaDescription}
                        />
                    </div>

                    <div className="space-y-2 mb-2">
                        <Label htmlFor="meta_keywords">{tSeo('meta-keywords')}</Label>
                        <Input
                            id="meta_keywords"
                            type="text"
                            placeholder={tSeo('meta-keywords-placeholder')}
                            name="metaKeywords"
                            defaultValue={currentPost.metaKeywords}
                            error={state?.errors?.metaKeywords}
                        />
                    </div>

                    <div
                        className="w-full border-b-1 border-laureo-border dark:border-laureo-border-dark mt-4 mb-4"></div>

                    <h2 className="text-xl mt-5 font-semibold">{tTranslations('title')}</h2>

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
                                    type="button">{tTranslations('edit')}</Button></Link>) : (<Button type="button"
                                                                                                      onClick={() => postLangAdd(currentPost.postId, lang.languageCode)}>{tTranslations('create')}</Button>)}
                        </div>
                    ))}
                </div>
            </div>
        </form>
    )
}
