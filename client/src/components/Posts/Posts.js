import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Masonry from "@mui/lab/Masonry";

import Post from "./Post/Post";
import { useParams } from "react-router-dom";

const Posts = ({ setCurrentId, setNewPost }) => {
  let posts = useSelector((state) => state.posts);
  const category = useParams();
  if (category.categoryId) {
    posts = posts.filter((item) => item.category === category.categoryId);
  } else if (category.userId) {
    posts = posts.filter((item) => item.creatorId === category.userId);
  }
  return !posts.length ? (
    <Typography>No Items</Typography>
  ) : (
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
  );
};

export default Posts;
