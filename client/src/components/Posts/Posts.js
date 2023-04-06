import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Masonry from "@mui/lab/Masonry";

import Post from "./Post/Post";
import { useParams } from "react-router-dom";

const Posts = ({ setCurrentId, setNewPost }) => {
  let data = useSelector((state) => state.posts);
  const category = useParams();
  let posts = data.posts || [];
  if (category.categoryId) {
    posts = data.posts.filter((item) => item.category === category.categoryId);
  } else if (category.userId) {
    posts = data.posts.filter((item) => item.creatorId === category.userId);
  }
  return data.loading ? (
    <CircularProgress />
  ) : posts.length !== 0 ? (
    <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          setCurrentId={setCurrentId}
          setNewPost={setNewPost}
        />
      ))}
    </Masonry>
  ) : (
    <Typography>No Items</Typography>
  );
};

export default Posts;
