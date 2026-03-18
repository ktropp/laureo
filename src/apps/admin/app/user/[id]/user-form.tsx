"use client"
import {useActionState} from "react";
import {userEdit} from "actions/userEdit";
import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Button} from "components/ui/button";
import {Select, SelectTrigger, SelectValue, SelectItem, SelectContent} from "components/ui/select";
import {Alert, AlertTitle, AlertDescription} from "components/ui/alert";
import {AlertCircle} from "lucide-react";
import {useTranslations} from "next-intl";

interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    role: string;
}

export function UserForm({user}: { user: User }) {
    const t = useTranslations('user');
    const tRoles = useTranslations('roles')

    const [state, action, pending] = useActionState(userEdit, undefined);

    const currentUser = state?.data || user;

    return (
        <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
            {state?.message && (<Alert variant="destructive" className="mb-3">
                <AlertCircle className="h-4 w-4"/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {state?.message}
                </AlertDescription>
            </Alert>)}
            <form className="space-y-4" action={action}>
                <input type="hidden" name="id" value={user.id}/>
                <div className="space-y-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder={t('email-placeholder')}
                        name="email"
                        defaultValue={user.email}
                        required
                        disabled
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name">{t('name')}</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder={t('name-placeholder')}
                        name="name"
                        defaultValue={currentUser.name}
                        error={state?.errors?.name}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="surname">{t('surname')}</Label>
                    <Input
                        id="surname"
                        type="text"
                        placeholder={t('surname-placeholder')}
                        name="surname"
                        defaultValue={currentUser.surname}
                        error={state?.errors?.surname}
                    />
                </div>

                <div>
                    <Label htmlFor="role">{t('role')}</Label>
                    <Select name="role" defaultValue={currentUser.role} required>
                        <SelectTrigger>
                            <SelectValue placeholder={t('role-placeholder')}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ADMIN">{tRoles('admin')}</SelectItem>
                            <SelectItem value="EDITOR">{tRoles('editor')}</SelectItem>
                            <SelectItem value="AUTHOR">{tRoles('author')}</SelectItem>
                            <SelectItem value="CONTRIBUTOR">{tRoles('contributor')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button type="submit" disabled={pending}>
                    {t('update')}
                </Button>
            </form>
        </div>
    );
}