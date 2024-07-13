import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { NextPage } from 'next';
import React from 'react';
import Post from '../../components/Blog/Post';
import Banner from '../../components/Blog/BlogBanner';
import Footer from '../../components/common/footer';
import { getAllPosts } from '../../lib/blog';

const Blog: NextPage<{ posts: any[] }> = ({ posts }) => {
  console.log(posts);

  return (
    <>
      <Banner />
      <Box m={4}>
        <Container maxWidth='lg'>
          <Grid container spacing={4}>
            {posts?.map(({ fields }) => (
              <Grid item key={fields.slug} xs={12} sm={6} md={4}>
                <Grid container>
                  <Post
                    title={fields.title}
                    subtitle={fields.subTitle}
                    authorName={fields.author.fields.name}
                    authorImage={fields.author.fields.image.fields.file.url}
                    slug={fields.slug}
                    date={fields.date}
                    coverImage={fields.coverImage.fields.file.url}
                  />
                  <br />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const posts = await getAllPosts();
  return { revalidate: 1, props: { posts } };
}
