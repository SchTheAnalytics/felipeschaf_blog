import { readFile } from 'node:fs/promises';
import { assertBefore, assertIncludes, readDist } from './assertions.mjs';

const home = await readDist('index.html');
const firstPost = await readDist('posts/primeiro-post/index.html');

assertIncludes(home, 'FelipeSchaf Blog');
assertIncludes(home, 'SchTheAnalytics.com');
assertIncludes(home, 'href="/" aria-label="SchTheAnalytics.com - pagina inicial"');
assertIncludes(home, 'Buscar...');
assertIncludes(home, 'href="https://github.com/SchTheAnalytics"');
assertIncludes(home, 'Primeiro post da V1');
assertIncludes(home, 'Organizacao cronologica');
assertIncludes(home, 'Escrevendo com Markdown');
assertBefore(home, 'Primeiro post da V1', 'Organizacao cronologica');
assertBefore(home, 'Organizacao cronologica', 'Escrevendo com Markdown');
assertIncludes(home, 'href="/posts/primeiro-post/"');

if (home.includes('<time ')) {
  throw new Error('Home must not show per-post dates in the post list.');
}

if (home.includes('Notas iniciais sobre a V1 do blog pessoal em Astro.')) {
  throw new Error('Home must not show post descriptions in the post list.');
}

if (home.includes('>Home</a>')) {
  throw new Error('Header must not show a Home navigation link.');
}

if (home.includes('href="/rss.xml">RSS</a>')) {
  throw new Error('Header must not show an RSS navigation link.');
}

assertIncludes(firstPost, '<h1>Primeiro post da V1</h1>');
assertIncludes(firstPost, 'Markdown como fonte de verdade.');
assertIncludes(firstPost, '<main class="site-main">');

await readFile('dist/posts/organizacao-cronologica/index.html', 'utf8');
await readFile('dist/posts/escrevendo-com-markdown/index.html', 'utf8');

console.log('Home and Post render assertions passed.');
