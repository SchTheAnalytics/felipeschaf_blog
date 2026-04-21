import { readFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

export async function readDist(relativePath) {
  return readFile(path.join(process.cwd(), 'dist', relativePath), 'utf8');
}

export function assertIncludes(source, value, message = `Expected output to include ${value}`) {
  assert.ok(source.includes(value), message);
}

export function assertBefore(source, first, second) {
  const firstIndex = source.indexOf(first);
  const secondIndex = source.indexOf(second);

  assert.notEqual(firstIndex, -1, `Missing ${first}`);
  assert.notEqual(secondIndex, -1, `Missing ${second}`);
  assert.ok(firstIndex < secondIndex, `${first} should appear before ${second}`);
}
