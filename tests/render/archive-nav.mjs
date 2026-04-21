import { assertIncludes, readDist } from './assertions.mjs';

const home = await readDist('index.html');

assertIncludes(home, 'Arquivo');
assertIncludes(home, 'href="#arquivo-2026-04"');
assertIncludes(home, 'href="#arquivo-2025-11"');
assertIncludes(home, 'href="#arquivo-2024-02"');
assertIncludes(home, 'id="arquivo-2026-04-title"');
assertIncludes(home, 'id="arquivo-2025-11-title"');
assertIncludes(home, 'id="arquivo-2024-02-title"');
assertIncludes(home, 'abril de 2026');
assertIncludes(home, 'novembro de 2025');
assertIncludes(home, 'fevereiro de 2024');

if (home.includes('href="/arquivo/')) {
  throw new Error('Archive navigation must not create archive pages in V1.');
}

console.log('Archive navigation assertions passed.');
