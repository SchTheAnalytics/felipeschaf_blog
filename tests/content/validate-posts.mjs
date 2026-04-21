import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const postsDir = path.join(process.cwd(), 'src', 'content', 'posts');
const requiredFields = ['title', 'slug', 'date', 'description'];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const files = (await readdir(postsDir)).filter((file) => file.endsWith('.md'));
const slugs = new Map();
const errors = [];

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const source = await readFile(filePath, 'utf8');
  const frontmatter = parseFrontmatter(source);

  if (!frontmatter) {
    errors.push(`${file}: missing frontmatter`);
    continue;
  }

  for (const field of requiredFields) {
    if (!frontmatter[field]) {
      errors.push(`${file}: missing ${field}`);
    }
  }

  if (frontmatter.slug && !slugPattern.test(frontmatter.slug)) {
    errors.push(`${file}: invalid slug "${frontmatter.slug}"`);
  }

  if (frontmatter.date && Number.isNaN(Date.parse(frontmatter.date))) {
    errors.push(`${file}: invalid date "${frontmatter.date}"`);
  }

  if (frontmatter.slug) {
    const existing = slugs.get(frontmatter.slug);
    if (existing) {
      errors.push(`${file}: duplicate slug "${frontmatter.slug}" already used by ${existing}`);
    }
    slugs.set(frontmatter.slug, file);
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${files.length} Markdown posts.`);

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  return Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*"?([^"]*)"?\s*$/))
      .filter(Boolean)
      .map((lineMatch) => [lineMatch[1], lineMatch[2]]),
  );
}
