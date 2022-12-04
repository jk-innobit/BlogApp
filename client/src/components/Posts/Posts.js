import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId, setNewPost }) => {
  const posts = useSelector((state) => state.posts);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3} mt={2}>
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={4}>
          <Post
            post={post}
            setCurrentId={setCurrentId}
            setNewPost={setNewPost}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
