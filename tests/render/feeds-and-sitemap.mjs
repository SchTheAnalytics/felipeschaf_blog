import { readdir } from 'node:fs/promises';
import { assertIncludes, readDist } from './assertions.mjs';

const rss = await readDist('rss.xml');
const robots = await readDist('robots.txt');
const sitemapIndex = await readDist('sitemap-index.xml');
const distFiles = await readdir('dist');

assertIncludes(rss, '<language>pt-BR</language>');
assertIncludes(rss, 'Primeiro post da V1');
assertIncludes(rss, 'Organizacao cronologica');
assertIncludes(rss, 'Escrevendo com Markdown');
assertIncludes(robots, 'Sitemap: https://felipeschaf.dev/sitemap-index.xml');
assertIncludes(sitemapIndex, '<sitemap>');

if (!distFiles.some((file) => file.startsWith('sitemap-') && file.endsWith('.xml'))) {
  throw new Error('Expected generated sitemap XML file.');
}

console.log('Feed, sitemap, and robots assertions passed.');
