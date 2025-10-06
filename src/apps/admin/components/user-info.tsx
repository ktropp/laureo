'use client'

import {Avatar, AvatarFallback, AvatarImage} from "components/ui/avatar"
import {useEffect, useState} from "react"

type User = {
    id: number
    email: string
    role: string
    image?: string
    name?: string
    surname?: string
}

export function UserInfo() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/user')
                if (!response.ok) {
                    throw new Error('Failed to fetch user')
                }
                const userData = await response.json()
                setUser(userData)
            } catch (error) {
                console.error('Error fetching user:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])


    if (loading) {
        return (
            <>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={undefined}/>
                    <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 hidden xl:flex flex-col items-center xl:items-start">
                    <p className="text-sm font-medium truncate"></p>
                    <p className="text-xs text-laureo-text-lighter dark:text-laureo-text-lighter-dark truncate"></p>
                </div>
            </>
        )
    }

    if (!user) {
        return null
    }

    return (
        <>
            <Avatar className="h-8 w-8">
                <AvatarImage src={user.image || undefined}/>
                <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 hidden xl:flex flex-col items-center xl:items-start">
                <p className="text-sm font-medium truncate">{(user.name + ' ' + user.surname) || user.email}</p>
                <p className="text-xs text-laureo-text-lighter dark:text-laureo-text-lighter-dark truncate capitalize">{user.role.toLowerCase()}</p>
            </div>
        </>
    )
}
