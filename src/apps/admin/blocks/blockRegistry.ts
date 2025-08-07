const modules = import.meta.glob('./blocks/types/*.tsx', { eager: true });

export const blockRegistry = Object.entries(modules).reduce((acc, [path, module]) => {
  const blockType = module.default.type || path.split('/').pop()?.replace('.tsx', '');
  acc[blockType] = module.default;
  return acc;
}, {} as Record<string, any>);

