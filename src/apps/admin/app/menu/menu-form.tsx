"use client"

import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Button} from "components/ui/button";
import {Select, SelectTrigger, SelectValue, SelectItem, SelectContent} from "../../components/ui/select";
import {postLangAdd} from "actions/postLangAdd";
import Link from "next/link";
import {Settings} from "../../../../../theme/settings";
import {useActionState} from "react";
import { menuAdd } from "actions/menuAdd";

export function MenuForm({menu, languages}: { menu: Menu, languages: Array }) {
    const [state, action, pending] = useActionState(menuAdd, undefined);

    const currentMenu = state?.data || menu || {};

    return (
        <form action={action}>
            <div className="flex justify-between">
                <div className="w-full">
                    TODO: menu items with children and drag and drop
                </div>
                <div
                    className="w-full max-w-md border-l min-h-sidebar-height px-3 ml-3 border-slate-300 dark:border-slate-600">
                    <Button type="submit" disabled={pending} className="mb-2">
                        Save
                    </Button>

                    <Input
                        type="hidden"
                        name="id"
                        defaultValue={currentMenu.id || ''}
                    />

                    <div className="space-y-2 mb-2">
                        <Label htmlFor="location">Location</Label>
                        <Select defaultValue={currentMenu.location || ''} name="location">
                            <SelectTrigger>
                                <SelectValue placeholder="Choose location"/>
                            </SelectTrigger>
                            <SelectContent>
                                {Settings.menuLocations.map(item => (
                                    <SelectItem key={item.slug}
                                                value={item.slug}>{item.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 mb-2">
                        <Label htmlFor="languageCode">Language</Label>
                        <Select defaultValue={currentMenu.languageCode || process.env.DEFAULT_LANG} name="languageCode"
                                disabled={currentMenu.languageCode}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose language"/>
                            </SelectTrigger>
                            <SelectContent>
                                {languages?.map(item => (
                                    <SelectItem key={item.languageCode}
                                                value={item.languageCode}>{item.languageCode}</SelectItem>
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
                            defaultValue={currentMenu.title}
                            error={state?.errors?.title}
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
                            {lang.postLang ? (
                                <Link href={`/${currentPost.post?.type.toLowerCase()}/${lang.postLang.id}`}><Button
                                    type="button">Edit</Button></Link>) : (<Button type="button"
                                                                                   onClick={() => postLangAdd(currentPost.postId, lang)}>Create</Button>)}
                        </div>
                    ))}
                </div>
            </div>
        </form>
    )
}
