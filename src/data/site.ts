export const site = {
  name: 'FelipeSchaf Blog',
  headerName: 'SchTheAnalytics.com',
  description: 'Blog pessoal sobre tecnologia, escrita e aprendizado continuo.',
  locale: 'pt-BR',
  url: (import.meta.env.SITE_URL ?? 'https://felipeschaf.dev').replace(/\/$/, ''),
  author: 'Felipe Schaf',
  githubUrl: 'https://github.com/SchTheAnalytics',
  navigation: [
    { label: 'About', href: '/about/' },
  ],
};

export function absoluteUrl(path: string) {
  return new URL(path, `${site.url}/`).toString();
}
