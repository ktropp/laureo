import blockRegistry from "@admin/blocks/blockRegistry";

const RenderBlock = ({block, dict, GlobalFields, ...props}) => {
    const Block = blockRegistry.find(b => b.type === block.type);
    const BlockComponent = Block.component;
    return (
        <BlockComponent block={block} dict={dict} GlobalFields={GlobalFields} {...props}>
            {block.children?.map((childBlock, index) => (
                <RenderBlock key={index} block={childBlock} dict={dict} GlobalFields={GlobalFields} {...props}/>
            ))}
        </BlockComponent>
    );
};

export default function PageContent({page, dict, GlobalFields}) {
    return (
        <>
            {page.blocks?.map((block, index) => (
                <RenderBlock key={index} block={block} dict={dict} GlobalFields={GlobalFields}/>
            ))}
        </>
    );
}
