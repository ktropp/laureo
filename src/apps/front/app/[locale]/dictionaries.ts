import 'server-only'

//TODO: generate from theme settings
const dictionaries = {
  cs: () => import('../../../../../theme/messages/cs.json').then((module) => module.default),
  en: () => import('../../../../../theme/messages/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'cs' | 'en') =>
  dictionaries[locale]()