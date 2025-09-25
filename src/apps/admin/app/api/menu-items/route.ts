import {NextRequest, NextResponse} from 'next/server'

export async function POST(
    request: NextRequest
) {
    try {
        const data: MenuLangItem[] = await request.json();

        if (data.length === 0) {
            return NextResponse.json({error: 'No data provided'}, {status: 400});
        }

        const existingItems = await prisma.menuLangItem.findMany({
            where: {
                menuLangId: data[0].menuLangId
            }
        });

        const getItemIds = (items: MenuLangItem[]): Set<number | string> => {
            const ids = new Set<number | string>();

            items.forEach(item => {
                if (item.id) {
                    ids.add(item.id);
                }
                // Recursively add children IDs if they exist
                if (item.children && item.children.length > 0) {
                    const childrenIds = getItemIds(item.children);
                    childrenIds.forEach(id => ids.add(id));
                }
            });

            return ids;
        };


        const flattenItems = (items: MenuLangItem[], parentId: number | null = null): MenuLangItem[] => {
            return items.flatMap((item) => {
                const flatItem = {
                    where: {
                        id: item.id
                    },
                    data: {
                        title: item.title,
                        url: item.url,
                        order: item.index,
                        parentId: parentId // Set the parentId to maintain hierarchy
                    }
                };

                if (item.children && item.children.length > 0) {
                    return [
                        flatItem,
                        ...flattenItems(item.children, item.id)
                    ];
                }

                return [flatItem];
            });
        };


        const newItemIds = getItemIds(data);

        const itemsToDelete = existingItems.filter(item => !newItemIds.has(item.id));
        const itemsToUpdate = flattenItems(data);

        // Perform all database operations in a transaction
        const result = await prisma.$transaction([
            // Delete items
            ...itemsToDelete.map(item =>
                prisma.menuLangItem.delete({
                    where: {id: item.id}
                })
            ),
            // Update items
            ...itemsToUpdate.map(item =>
                prisma.menuLangItem.update(item)
            )
        ]);

        return NextResponse.json({success: true, result});
    } catch (error) {
        return NextResponse.json({error: 'Internal server error: ' + error}, {status: 500})
    }
}
