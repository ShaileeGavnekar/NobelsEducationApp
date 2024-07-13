const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const getAllPosts = async () => {
  const entries = await client.getEntries({
    content_type: 'post',
    order: '-fields.date',
  });
  if (entries.items) {
    return entries.items;
  }
  console.log(`Error getting Entries.`);
};

export const getPostBySlug = async (slug: string) => {
  const entries = await client.getEntries({
    content_type: 'post',
    limit: 1,
    'fields.slug[in]': slug,
  });
  if (entries.items) {
    return entries.items[0];
  }
  console.log(`Error getting Entries for.`);
};

const parsePostSlug = ({ fields }: { fields: any }) => {
  return {
    slug: fields.slug,
  };
};

const parsePostSlugEntries = (entries: any, cb = parsePostSlug) => {
  return entries?.items?.map(cb);
};

export const getAllPostsWithSlug = async () => {
  const entries = await client.getEntries({
    content_type: 'post',
    select: 'fields.slug',
  });
  return parsePostSlugEntries(entries, (post) => post.fields);
};
