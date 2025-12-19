import 'server-only'

//TODO: generate from theme settings
const dictionaries = {
  cs: async () => {
    const [front, theme] = await Promise.all([
        import('../../messages/cs.json').then((module) => module.default),
        import('../../../../../theme/messages/cs.json').then((module) => module.default),
    ])
    return {...front, ...theme}
  },
  en: async () => {
    const [front, theme] = await Promise.all([
        import('../../messages/en.json').then((module) => module.default),
        import('../../../../../theme/messages/en.json').then((module) => module.default),
    ])
    return {...front, ...theme}
  },
}

export const getDictionary = async (locale: 'cs' | 'en') =>
  dictionaries[locale]()