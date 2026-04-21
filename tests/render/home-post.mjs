import { readFile } from 'node:fs/promises';
import { assertBefore, assertIncludes, readDist } from './assertions.mjs';

const home = await readDist('index.html');
const firstPost = await readDist('posts/primeiro-post/index.html');

assertIncludes(home, 'Felipe Schaf');
assertIncludes(home, 'Primeiro post da V1');
assertIncludes(home, 'Organizacao cronologica');
assertIncludes(home, 'Escrevendo com Markdown');
assertBefore(home, 'Primeiro post da V1', 'Organizacao cronologica');
assertBefore(home, 'Organizacao cronologica', 'Escrevendo com Markdown');
assertIncludes(home, 'href="/posts/primeiro-post/"');

assertIncludes(firstPost, '<h1>Primeiro post da V1</h1>');
assertIncludes(firstPost, 'Markdown como fonte de verdade.');
assertIncludes(firstPost, '<main class="site-main">');

await readFile('dist/posts/organizacao-cronologica/index.html', 'utf8');
await readFile('dist/posts/escrevendo-com-markdown/index.html', 'utf8');

console.log('Home and Post render assertions passed.');
