import {Button} from "components/ui/button";
import {Edit, Trash2, CirclePlus} from "lucide-react";
import {GridView} from "components/gridview";

export default function Home() {

    const data = [
        {
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            status: "Active",
        },
        {
            name: "Jane Smith",
            email: "jane@example.com",
            role: "Editor",
            status: "Inactive",
        },
        {
            name: "Mike Johnson",
            email: "mike@example.com",
            role: "Author",
            status: "Active",
        },
    ];

    const columns = [
        {header: "Name", accessor: "name"},
        {header: "Email", accessor: "email"},
        {header: "Role", accessor: "role"},
        {
            header: "Actions",
            accessor: "actions",
            render: () => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4"/>
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">Pages</h1>
                <Button>Add <CirclePlus className="h-5 w-5"/></Button>
            </div>
            <GridView data={data} columns={columns}/>
        </div>
    )
        ;
}
