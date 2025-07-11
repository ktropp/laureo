import {Button} from "components/ui/button";
import {Edit, Trash2, CirclePlus} from "lucide-react";
import {GridView} from "components/gridview";
import {prisma} from "../../lib/prisma";
import Link from "next/link"

export default async function Home() {

    const data = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            surname: true,
            role: true,
        }
    })

    const columns = [
        {header: "Id", accessor: "id"},
        {header: "Email", accessor: "email"},
        {header: "Name", accessor: "name"},
        {header: "Surname", accessor: "surname"},
        {header: "Role", accessor: "role"},
        {
            header: "Actions",
            accessor: "actions",
            render: (value, row) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/user/${row.id}`}>
                            <Edit className="h-4 w-4"/>
                        </Link>
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
                <h1 className="text-4xl font-bold">Users</h1>
                <Button asChild><Link href="/user/add">Add <CirclePlus className="h-5 w-5"/></Link></Button>
            </div>
            <GridView data={data} columns={columns}/>
        </div>
    );
}
