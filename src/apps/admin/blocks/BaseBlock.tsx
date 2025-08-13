import blockRegistry from "./blockRegistry";

const BaseBlock = ({ children, block }) => {
  const Block = blockRegistry.find(block => block.type === block.type)?.component;
  if(Block)
    return <Block><div className="border">{children}</div></Block>;

  return <div className="border">{children}</div>
};

export default BaseBlock;
