"use client"

import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Button} from "components/ui/button";
import {Select, SelectTrigger, SelectValue, SelectItem, SelectContent} from "components/ui/select";
import {Alert, AlertTitle, AlertDescription} from "components/ui/alert";
import {AlertCircle, Eye, EyeOff} from "lucide-react";
import {userAdd} from "actions/userAdd";
import {useActionState, useState} from "react";

export function AddUserForm() {
    const [state, action, pending] = useActionState(userAdd, undefined);
    const [showPassword, setShowPassword] = useState(false);

    const currentUser = state?.data || {}

    return (
        <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">Add user</h1>
            {state?.message && (<Alert variant="destructive" className="mb-3">
                <AlertCircle className="h-4 w-4"/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {state?.message}
                </AlertDescription>
            </Alert>)}
            <form className="space-y-4" action={action}>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        defaultValue={currentUser.email}
                        required
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

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            required
                            defaultValue={currentUser.password}
                            error={state?.errors?.password}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent max-h-10"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground"/>
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground"/>
                            )}
                        </Button>
                    </div>
                </div>

                <Button type="submit" disabled={pending}>
                    Add
                </Button>
            </form>
        </div>
    )
}