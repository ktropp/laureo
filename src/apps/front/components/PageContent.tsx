import blockRegistry from "@admin/blocks/blockRegistry";

const RenderBlock = ({block, dict}) => {
    const Block = blockRegistry.find(b => b.type === block.type);
    const BlockComponent = Block.component;

    return (
        <BlockComponent block={block} dict={dict}>
            {block.children?.map((childBlock, index) => (
                <RenderBlock key={index} block={childBlock} dict={dict}/>
            ))}
        </BlockComponent>
    );
};

export default function PageContent({page, dict}) {
    return (
        <>
            {page.blocks?.map((block, index) => (
                <RenderBlock key={index} block={block} dict={dict}/>
            ))}
        </>
    );
}
