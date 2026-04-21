export const site = {
  name: 'Felipe Schaf',
  description: 'Blog pessoal sobre tecnologia, escrita e aprendizado continuo.',
  locale: 'pt-BR',
  url: (import.meta.env.SITE_URL ?? 'https://felipeschaf.dev').replace(/\/$/, ''),
  author: 'Felipe Schaf',
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' },
    { label: 'RSS', href: '/rss.xml' },
  ],
};

export function absoluteUrl(path: string) {
  return new URL(path, `${site.url}/`).toString();
}
