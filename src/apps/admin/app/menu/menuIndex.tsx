"use client"

import {Button} from "components/ui/button";
import Link from "next/link";
import {CirclePlus, Edit, Trash2} from "lucide-react";
import {useState} from "react";
import {GridView} from "components/gridview";
import * as Dialog from '@radix-ui/react-dialog';
import {postDelete} from "actions/postDelete";
import {useTranslations} from "next-intl";

export default function MenuIndex({initialData}) {
    const t = useTranslations('menus');
    const tTable = useTranslations('table');
    const [open, setOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const handleDelete = async () => {
        if (postToDelete) {
            await postDelete(postToDelete);
            setOpen(false);
            setPostToDelete(null);
        }
    };

    const columns = [
        {header: tTable('id'), accessor: "id"},
        {header: tTable('language'), accessor: "languageCode"},
        {header: tTable('title'), accessor: "title"},
        {header: tTable('location'), accessor: "menu.location"},
        {
            header: tTable('actions'),
            accessor: "actions",
            render: (value, row) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/menu/${row.id}`}>
                            <Edit className="h-4 w-4"/>
                        </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => {
                        setPostToDelete(row.id);
                        setOpen(true)
                    }}>
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center mb-6 gap-6">
                <h1 className="text-4xl font-bold">{t('heading')}</h1>
                <Button asChild><Link href={`/menu/add`}>{tTable('add')} <CirclePlus
                    className="h-5 w-5"/></Link></Button>
            </div>
            <GridView data={initialData} columns={columns}/>

            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-laureo-body-dark/50"/>
                    <Dialog.Content
                        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-slate-900 rounded-lg p-6 shadow-lg">
                        <Dialog.Title className="text-lg font-semibold mb-4">
                            {tTable('delete-title')}
                        </Dialog.Title>
                        <Dialog.Description className="mb-5">
                            {tTable('delete-description')}
                        </Dialog.Description>
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                {tTable('delete-cancel')}
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                            >
                                {tTable('delete-confirm')}
                            </Button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}
