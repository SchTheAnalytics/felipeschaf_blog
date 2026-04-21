import { getCollection, type CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;

export interface ArchiveMonth {
  year: number;
  month: number;
  label: string;
  id: string;
  posts: PostEntry[];
}

export interface ArchiveYear {
  year: number;
  months: ArchiveMonth[];
  postCount: number;
}

const monthFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'long',
  timeZone: 'UTC',
});
const titleCollator = new Intl.Collator('pt-BR');

export function getPostPath(post: PostEntry) {
  return `/posts/${post.data.slug}/`;
}

export function getArchiveId(year: number, month: number) {
  return `arquivo-${year}-${String(month).padStart(2, '0')}`;
}

export function getArchiveLabel(year: number, monthLabel: string) {
  const normalizedMonth = `${monthLabel.charAt(0).toLocaleUpperCase('pt-BR')}${monthLabel.slice(1)}`;
  return `${year} - ${normalizedMonth}`;
}

export async function getPublicPosts() {
  const posts = await getCollection('posts');
  assertUniqueSlugs(posts);

  return posts.toSorted((a, b) => {
    const byDate = b.data.date.getTime() - a.data.date.getTime();
    return byDate || titleCollator.compare(a.data.title, b.data.title);
  });
}

export function groupPostsByArchive(posts: PostEntry[]) {
  const years = new Map<number, Map<number, PostEntry[]>>();

  for (const post of posts) {
    const year = post.data.date.getUTCFullYear();
    const month = post.data.date.getUTCMonth() + 1;
    const months = years.get(year) ?? new Map<number, PostEntry[]>();
    const monthPosts = months.get(month) ?? [];

    monthPosts.push(post);
    months.set(month, monthPosts);
    years.set(year, months);
  }

  return [...years.entries()]
    .toSorted(([yearA], [yearB]) => yearB - yearA)
    .map(([year, months]): ArchiveYear => {
      const archiveMonths = [...months.entries()]
        .toSorted(([monthA], [monthB]) => monthB - monthA)
        .map(([month, monthPosts]) => ({
          year,
          month,
          label: monthFormatter.format(new Date(Date.UTC(year, month - 1, 1))),
          id: getArchiveId(year, month),
          posts: monthPosts,
        }));

      return {
        year,
        months: archiveMonths,
        postCount: archiveMonths.reduce((count, item) => count + item.posts.length, 0),
      };
    });
}

function assertUniqueSlugs(posts: PostEntry[]) {
  const seen = new Map<string, string>();

  for (const post of posts) {
    const existing = seen.get(post.data.slug);
    if (existing) {
      throw new Error(`Duplicate post slug "${post.data.slug}" in ${existing} and ${post.id}`);
    }
    seen.set(post.data.slug, post.id);
  }
}
