import blockRegistry from "@admin/blocks/blockRegistry";

const RenderBlock = ({block, dict, ...props}) => {
    const Block = blockRegistry.find(b => b.type === block.type);
    const BlockComponent = Block.component;

    return (
        <BlockComponent block={block} dict={dict} {...props}>
            {block.children?.map((childBlock, index) => (
                <RenderBlock key={index} block={childBlock} dict={dict} {...props}/>
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
