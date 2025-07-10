"use client"
import {useActionState} from "react";
import {userEdit} from "actions/userEdit";
import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Button} from "components/ui/button";
import {Select, SelectTrigger, SelectValue, SelectItem, SelectContent} from "components/ui/select";
import {Alert, AlertTitle, AlertDescription} from "components/ui/alert";
import {AlertCircle} from "lucide-react";

interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    role: string;
}

export function UserForm({user}: { user: User }) {
    const [state, action, pending] = useActionState(userEdit, undefined);

    const currentUser = state?.data || user;

    return (
        <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">User</h1>
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        defaultValue={user.email}
                        required
                        disabled
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        defaultValue={currentUser.name}
                        error={state?.errors?.name}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="surname">Surname</Label>
                    <Input
                        id="surname"
                        type="text"
                        placeholder="Enter your surname"
                        name="surname"
                        defaultValue={currentUser.surname}
                        error={state?.errors?.surname}
                    />
                </div>

                <div>
                    <Label htmlFor="role">Role</Label>
                    <Select name="role" defaultValue={currentUser.role} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose an role"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="EDITOR">Editor</SelectItem>
                            <SelectItem value="AUTHOR">Author</SelectItem>
                            <SelectItem value="CONTRIBUTOR">Contributor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button type="submit" disabled={pending}>
                    Update
                </Button>
            </form>
        </div>
    );
}