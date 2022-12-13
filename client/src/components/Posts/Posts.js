import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import Masonry from "@mui/lab/Masonry";

const Posts = ({ setCurrentId, setNewPost }) => {
  const posts = useSelector((state) => state.posts);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Masonry
      columns={3}
      spacing={1}
      defaultHeight={450}
      defaultColumns={3}
      defaultSpacing={1}
    >
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={4}>
          <Post
            post={post}
            setCurrentId={setCurrentId}
            setNewPost={setNewPost}
          />
        </Grid>
      ))}
    </Masonry>
  );
};

export default Posts;
