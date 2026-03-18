"use client"
import React, {useCallback, useState} from 'react'
import {Button} from "components/ui/button";
import {CirclePlus, X} from "lucide-react";
import {useDropzone} from 'react-dropzone'
import MediaListing from "../../components/media/MediaListing";
import {useTranslations} from "next-intl";
import {useRouter} from 'next/navigation';

export default function MediaIndex({initialData}) {
    const t = useTranslations('media');
    const router = useRouter()

    async function handleFileUpload(acceptedFiles) {
        if (!acceptedFiles || acceptedFiles === 0) {
            return; // User canceled file selection
        }

        const formData = new FormData();

        for (const file of Array.from(acceptedFiles)) {
            formData.append('files', file);
        }

        await fetch('/api/media/upload', {
            method: 'POST',
            body: formData
        })

        router.push('/media')
    }

    const onDrop = useCallback(acceptedFiles => {
        handleFileUpload(acceptedFiles)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const [isInputVisible, setIsInputVisible] = useState(false)

    return (
        <div>
            <div className="flex items-center mb-6 gap-6">
                <h1 className="text-4xl font-bold">{t('title')}</h1>
                <Button onClick={() => setIsInputVisible(!isInputVisible)}>
                    {isInputVisible ? t('cancel') : t('add')}
                    {isInputVisible ? <X className="h-5 w-5"/> : <CirclePlus className="h-5 w-5"/>}
                </Button>
            </div>
            <div
                className={`border-laureo-border dark:border-laureo-border-dark border-3 border-dashed rounded-lg p-6 text-center relative ${isInputVisible ? 'block' : 'hidden'}`}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>{t('drop')}</p> :
                        <p>{t('drag')}</p>
                }
            </div>
            <MediaListing data={initialData}/>
        </div>
    )
}
