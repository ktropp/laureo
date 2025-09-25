import blockRegistry from "admin/blocks/blockRegistry";

export default function PageContent({page}) {
    return (
        <>
            {page.blocks?.map((blockJson, index) => {
                const Block = blockRegistry.find(block => block.type === blockJson.type);
                const BlockComponent = Block.component;

                return (
                    <BlockComponent key={index} block={blockJson}>
                        {blockJson.children?.map((childBlock, childIndex) => {
                            const ChildBlock = blockRegistry.find(block => block.type === childBlock.type);
                            const ChildBlockComponent = ChildBlock.component;

                            return (
                                <ChildBlockComponent key={childIndex} block={childBlock}/>
                            )
                        })}
                    </BlockComponent>
                )
            })}
        </>
    )
}