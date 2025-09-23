import {SimpleTreeItemWrapper, SortableTree, TreeItemComponentProps} from "dnd-kit-sortable-tree";
import {Button} from "components/ui/button";
import {Input} from "components/ui/input";
import {Label} from "components/ui/label";
import React, {useState} from "react";
import {MenuLang, MenuLangItem} from "@prisma/client";

function MenuBuilder({menuLang}: { menuLang: MenuLang}) {
    const [items, setItems] = useState<MenuLangItem[]>(menuLang.items || [] as MenuLangItem[]);
    const [newItem, setNewItem] = useState({title: '', url: ''});


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
            setItems(items);
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

            setItems([...items, response]);
        } catch (error) {
            //toast.error('Failed to save menu items');
            // Optionally revert the state if save fails
            //setItems(items);
        }

        setNewItem({title: '', url: ''});
    };


    const TreeItem = React.forwardRef<
        HTMLDivElement,
        TreeItemComponentProps<MenuItemType>
    >((props, ref) => {
        const [isEditing, setIsEditing] = useState(false);
        const [editedItem, setEditedItem] = useState(props.item);
        const handleSave = () => {
            updateItems(items.map(item =>
                item.id === props.item.id ? editedItem : item)
            );
            setIsEditing(false);
        };
        const handleDelete = (id: string) => {
            updateItems(items.filter(item => item.id !== id));
        };
        return (
            <SimpleTreeItemWrapper {...props} ref={ref} className="flex-1 w-full">
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
            <form onSubmit={handleAddItem} className="space-y-4 p-4 border rounded-md">
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

            <div className="border rounded-md p-4 flex gap-2 flex-col">
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
