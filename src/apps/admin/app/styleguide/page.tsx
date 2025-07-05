"use client"

import {Button} from "components/ui/button";
import {Label} from "components/ui/label";
import {Input} from "components/ui/input";
import {Textarea} from "components/ui/textarea";
import {Select, SelectTrigger, SelectValue, SelectItem, SelectContent} from "../../components/ui/select";
import {Checkbox} from "components/ui/checkbox";
import {RadioGroup, RadioGroupItem} from "components/ui/radio-group";
import {Switch} from "components/ui/switch";
import {Plus, Download, Edit, Trash2} from "lucide-react";
import {Alert, AlertTitle, AlertDescription} from "components/ui/alert";
import {Progress} from "components/ui/progress";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "components/ui/table";
import {Badge} from "components/ui/badge";
import {
    Info,
    CheckCircle,
    AlertTriangle,
    AlertCircle,
} from "lucide-react";

export default function Page() {

    return (
        <>
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold tracking-tight">CMS Style Guide</h1>
                <p className="text-xl text-muted-foreground mt-2">
                    Complete design system and component library
                </p>
            </div>

            {/* Typography */}
            <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-6">Typography</h2>
                <div>
                    <h1 className="text-4xl font-bold">Heading 1 - 4xl</h1>
                    <h2 className="text-3xl font-semibold">Heading 2 - 3xl</h2>
                    <h3 className="text-2xl font-semibold">Heading 3 - 2xl</h3>
                    <h4 className="text-xl font-semibold">Heading 4 - xl</h4>
                    <h5 className="text-lg font-semibold">Heading 5 - lg</h5>
                    <h6 className="text-base font-semibold">Heading 6 - base</h6>
                </div>
                <div className="w-full border-b-1 border-slate-300 dark:border-slate-600 mt-4 mb-4"></div>
                <div className="space-y-2">
                    <p className="text-lg">Large paragraph text for important content.</p>
                    <p className="text-base">Regular paragraph text for standard content.</p>
                    <p className="text-sm">Small text for captions and secondary information.</p>
                    <p className="text-xs text-muted-foreground">Extra small text for metadata.</p>
                </div>
            </section>

            {/* Buttons */}
            <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-6">Buttons</h2>
                <div className="space-y-6">
                    <div className="flex flex-wrap gap-3">
                        <Button>Primary Button</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button size="sm">Small</Button>
                        <Button>Default</Button>
                        <Button size="lg">Large</Button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button><Plus className="mr-2 h-4 w-4"/>With Icon</Button>
                        <Button><Download className="mr-2 h-4 w-4"/>Download</Button>
                        <Button variant="outline"><Edit className="mr-2 h-4 w-4"/>Edit</Button>
                        <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4"/>Delete</Button>
                    </div>
                </div>
            </section>

            {/* Form Components */}
            <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-6">Form Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="text-input">Text Input</Label>
                            <Input id="text-input" placeholder="Enter text here..."/>
                        </div>
                        <div>
                            <Label htmlFor="email-input">Email Input</Label>
                            <Input id="email-input" type="email" placeholder="email@example.com"/>
                        </div>
                        <div>
                            <Label htmlFor="textarea">Textarea</Label>
                            <Textarea id="textarea" placeholder="Enter your message..."/>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="select">Select Dropdown</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose an option"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">Option 1</SelectItem>
                                    <SelectItem value="option2">Option 2</SelectItem>
                                    <SelectItem value="option3">Option 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-3">
                            <Label>Checkboxes</Label>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="checkbox1"/>
                                    <Label htmlFor="checkbox1">Option 1</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="checkbox2"/>
                                    <Label htmlFor="checkbox2">Option 2</Label>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label>Radio Group</Label>
                            <RadioGroup defaultValue="radio1">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="radio1" id="radio1"/>
                                    <Label htmlFor="radio1">Option 1</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="radio2" id="radio2"/>
                                    <Label htmlFor="radio2">Option 2</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="switch"/>
                            <Label htmlFor="switch" className="mb-0">Toggle Switch</Label>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alerts */}
            <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-6">Alerts</h2>
                <div className="space-y-4">
                    <Alert>
                        <Info className="h-4 w-4"/>
                        <AlertTitle>Information</AlertTitle>
                        <AlertDescription>
                            This is an informational alert with some details.
                        </AlertDescription>
                    </Alert>
                    <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400"/>
                        <AlertTitle className="text-green-800 dark:text-green-200">Success</AlertTitle>
                        <AlertDescription className="text-green-700 dark:text-green-300">
                            Operation completed successfully!
                        </AlertDescription>
                    </Alert>
                    <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400"/>
                        <AlertTitle className="text-yellow-800 dark:text-yellow-200">Warning</AlertTitle>
                        <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                            Please review this important information.
                        </AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Something went wrong. Please try again.
                        </AlertDescription>
                    </Alert>
                </div>
            </section>

            {/* Progress & Loading */}
            <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-6">Progress & Loading</h2>
                <div className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label>Progress Bar</Label>
                        <Progress value={65} className="w-full"/>
                        <p className="text-sm text-muted-foreground">65% complete</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Different Progress Values</Label>
                        <Progress value={25} className="w-full"/>
                        <Progress value={50} className="w-full"/>
                        <Progress value={75} className="w-full"/>
                        <Progress value={100} className="w-full"/>
                    </div>
                </div>
            </section>

            {/* Data Tables */}
            <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-6">Data Tables</h2>
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">John Doe</TableCell>
                                <TableCell>john@example.com</TableCell>
                                <TableCell>Admin</TableCell>
                                <TableCell><Badge>Active</Badge></TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4"/></Button>
                                        <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4"/></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Jane Smith</TableCell>
                                <TableCell>jane@example.com</TableCell>
                                <TableCell>Editor</TableCell>
                                <TableCell><Badge variant="secondary">Inactive</Badge></TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4"/></Button>
                                        <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4"/></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Mike Johnson</TableCell>
                                <TableCell>mike@example.com</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell><Badge>Active</Badge></TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4"/></Button>
                                        <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4"/></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>
        </>
    );
}
