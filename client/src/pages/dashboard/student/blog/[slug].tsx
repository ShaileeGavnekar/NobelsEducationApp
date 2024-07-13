import { useRouter } from "next/router";
import ErrorPage from "next/error";
import BlogHeader from "../../../../components/Blog/BlogHeader";
import BlogBody from "../../../../components/Blog/BlogBody";
import Like from "../../../../components/Blog/Icon";
import { NextPage } from "next";
import { getAllPostsWithSlug, getPostBySlug } from "../../../../lib/blog";

interface Props {
  post: any;
}

const Blog: NextPage<Props> = ({ post }) => {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {/* <BlogBanner title={post?.fields.title} /> */}
      <BlogHeader
        title={post?.fields.title}
        subtitle={post?.fields.subTitle}
        authorName={post?.fields.author.fields.name}
        authorImage={post?.fields.author.fields.image.fields.file.url}
        slug={post?.fields.slug}
        date={post?.fields.date}
        coverImage={post?.fields.coverImage.fields.file.url}
      />

      <BlogBody content={post?.fields.content} />

      <Like />
      <br />
    </>
  );
};

export default Blog;

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths:
      allPosts?.map(
        ({ slug }: { slug: any }) => `/dashboard/student/blog/${slug}`
      ) ?? [],
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const post = await getPostBySlug(params.slug);
  return {
    props: {
      post: post ? post : null,
    },
    revalidate: 1,
  };
}
