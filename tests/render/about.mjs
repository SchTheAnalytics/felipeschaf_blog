import { assertIncludes, readDist } from './assertions.mjs';

const home = await readDist('index.html');
const about = await readDist('about/index.html');

assertIncludes(home, 'href="/about/"');
assertIncludes(about, '<html lang="pt-BR">');
assertIncludes(about, '<h1 id="about-title">About</h1>');
assertIncludes(about, 'blog pessoal em pt-BR');
assertIncludes(about, '<link rel="canonical" href="https://felipeschaf.dev/about/"');

console.log('About render assertions passed.');
