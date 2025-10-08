import blockRegistry from "admin/blocks/blockRegistry";

const RenderBlock = ({block}) => {
    const Block = blockRegistry.find(b => b.type === block.type);
    const BlockComponent = Block.component;

    return (
        <BlockComponent block={block}>
            {block.children?.map((childBlock, index) => (
                <RenderBlock key={index} block={childBlock}/>
            ))}
        </BlockComponent>
    );
};

export default function PageContent({page}) {
    return (
        <>
            {page.blocks?.map((block, index) => (
                <RenderBlock key={index} block={block}/>
            ))}
        </>
    );
}
