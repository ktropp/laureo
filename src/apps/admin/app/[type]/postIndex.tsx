"use client"

import { Button } from "components/ui/button";
import Link from "next/link";
import { CirclePlus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { GridView } from "components/gridview";
import * as Dialog from '@radix-ui/react-dialog';
import { postDelete } from "actions/postDelete";

export default function PostIndex({ type, initialData }) {
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
    { header: "Id", accessor: "id" },
    { header: "Language", accessor: "languageCode" },
    { header: "Title", accessor: "title" },
    { header: "Slug", accessor: "slug" },
    {
      header: "Actions",
      accessor: "actions",
      render: (value, row) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/${type}/${row.id}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => {
            setPostToDelete(row.id);
            setOpen(true)
          }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const PostTypeTitles = {
    page: 'Pages',
    post: 'Posts'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">{PostTypeTitles[type]}</h1>
        <Button asChild><Link href={`/${type}/add`}>Add <CirclePlus className="h-5 w-5" /></Link></Button>
      </div>
      <GridView data={initialData} columns={columns} />

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-950/50" />
          <Dialog.Content
            className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-slate-900 rounded-lg p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Confirm Deletion
            </Dialog.Title>
            <Dialog.Description className="mb-5">
              Are you sure you want to delete this page? This action cannot be undone.
            </Dialog.Description>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
