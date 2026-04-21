import rss from '@astrojs/rss';
import { site } from '../data/site';
import { getPostPath, getPublicPosts } from '../data/posts';

export async function GET(context) {
  const posts = await getPublicPosts();

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    customData: '<language>pt-BR</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: getPostPath(post),
    })),
  });
}
