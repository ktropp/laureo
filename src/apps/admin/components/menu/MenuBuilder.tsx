import {SimpleTreeItemWrapper, SortableTree, TreeItemComponentProps} from "dnd-kit-sortable-tree";
import {Button} from "components/ui/button";
import {Input} from "components/ui/input";
import {Label} from "components/ui/label";
import React, {useState, useEffect} from "react";
import {MenuLang, MenuLangItem} from "@prisma/client";

// Helper function to build tree structure
const buildTree = (items: MenuLangItem[]): MenuLangItem[] => {
    // First, sort all items by order
    const sortedItems = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));

    // Create a map for quick lookup
    const itemMap = new Map<string, MenuLangItem>();
    sortedItems.forEach(item => {
        itemMap.set(item.id, {...item, children: []});
    });

    // Build the tree structure
    const tree: MenuLangItem[] = [];

    sortedItems.forEach(item => {
        const itemWithChildren = itemMap.get(item.id)!;

        if (item.parentId === null) {
            tree.push(itemWithChildren);
        } else {
            const parent = itemMap.get(item.parentId);
            if (parent) {
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(itemWithChildren);
            }
        }
    });

    return tree;
};

const updateItemInTree = (items: MenuLangItem[], itemToUpdate: MenuLangItem): MenuLangItem[] => {
    return items.map(item => {
        if (item.id === itemToUpdate.id) {
            return {...itemToUpdate, children: item.children};
        }
        if (item.children && item.children.length > 0) {
            return {
                ...item,
                children: updateItemInTree(item.children, itemToUpdate)
            };
        }
        return item;
    });
};

const deleteItemFromTree = (items: MenuLangItem[], idToDelete: string): MenuLangItem[] => {
    return items.filter(item => {
        if (item.id === idToDelete) {
            return false;
        }
        if (item.children && item.children.length > 0) {
            item.children = deleteItemFromTree(item.children, idToDelete);
        }
        return true;
    });
};

function MenuBuilder({menuLang}: { menuLang: MenuLang }) {
    const [items, setItems] = useState<MenuLangItem[]>([]);
    const [newItem, setNewItem] = useState({title: '', url: ''});


    useEffect(() => {
        if (menuLang.items) {
            // Convert flat array to tree structure when component mounts or menuLang.items changes
            const treeItems = buildTree(menuLang.items);
            setItems(treeItems);
        }
    }, [menuLang.items]);

    const updateItems = async (newItems: MenuLangItem[]) => {
        setItems(newItems);

        try {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItems)
            });

            if (!response.ok) {
                throw new Error('Failed to save menu items');
            }
        } catch (error) {
            //toast.error('Failed to save menu items');
            // Optionally revert the state if save fails
            //setItems(items);
        }
    };

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/menu-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    menuLangId: menuLang.id,
                    title: newItem.title,
                    url: newItem.url,
                    order: items.length + 1,
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save menu items');
            }

            const resultLang = await response.json();
            setItems([...items, resultLang as MenuLangItem]);
            setNewItem({title: '', url: ''});
        } catch (error) {
            //toast.error('Failed to save menu items');
            // Optionally revert the state if save fails
            //setItems(items);
        }
    };


    const TreeItem = React.forwardRef<
        HTMLDivElement,
        TreeItemComponentProps<MenuLangItem>
    >((props, ref) => {
        const [isEditing, setIsEditing] = useState(false);
        const [editedItem, setEditedItem] = useState(props.item);
        const handleSave = () => {
            const updatedItems = updateItemInTree(items, editedItem);
            updateItems(updatedItems);
            setIsEditing(false);
        };
        const handleDelete = (id: string) => {
            const updatedItems = deleteItemFromTree(items, id);
            updateItems(updatedItems);
        };
        return (
            <SimpleTreeItemWrapper key={props.item.id} {...props} ref={ref} className="flex-1 w-full">
                <div className="flex-1 ml-2 flex items-center justify-between">
                    {isEditing ? (
                        <div className="flex-1 flex items-center space-x-2">
                            <Input
                                value={editedItem.title}
                                onChange={(e) => setEditedItem({...editedItem, title: e.target.value})}
                                className="flex-1"
                            />
                            <Input
                                value={editedItem.url}
                                onChange={(e) => setEditedItem({...editedItem, url: e.target.value})}
                                className="flex-1"
                            />
                            <Button onClick={handleSave}>Save</Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-between">
                            <div>
                                <div className="font-medium">{props.item.title}</div>
                                <div className="text-sm text-gray-500">{props.item.url}</div>
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" onClick={() => setIsEditing(true)}>Edit</Button>
                                <Button variant="destructive"
                                        onClick={() => handleDelete(props.item.id)}>Delete</Button>
                            </div>
                        </div>
                    )}
                </div>
            </SimpleTreeItemWrapper>
        );
    });
    return (
        <div className="space-y-4">
            <form onSubmit={handleAddItem}
                  className="space-y-4 p-4 border border-slate-300 dark:border-slate-600 rounded-md">
                <div>
                    <Label htmlFor="menuTitle">Menu Item Title</Label>
                    <Input
                        id="menuTitle"
                        value={newItem.title}
                        onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                        placeholder="Enter menu item title"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="menuUrl">URL</Label>
                    <Input
                        id="menuUrl"
                        value={newItem.url}
                        onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                        placeholder="Enter URL"
                        required
                    />
                </div>
                <Button type="submit">Add Menu Item</Button>
            </form>

            <div className="flex gap-2 flex-col">
                <SortableTree
                    items={items}
                    onItemsChanged={updateItems}
                    TreeItemComponent={TreeItem}
                />
            </div>
        </div>
    )
}

export default MenuBuilder;
