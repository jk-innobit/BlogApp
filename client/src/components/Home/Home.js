import React, { useEffect, useState } from "react";
import { Grow, Grid, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../../components/Form/Form";
import { getPosts } from "../../actions/posts";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const [newPost, setNewPost] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Box>
      <Navbar setNewPost={setNewPost} />
      <Grow in>
        <Box>
          <Form
            currentId={currentId}
            setCurrentId={setCurrentId}
            newPost={newPost}
            setNewPost={setNewPost}
          />
          <Grid container>
            <Grid
              item
              sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            >
              sidebar
            </Grid>
            <Grid item>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Posts
                      setCurrentId={setCurrentId}
                      setNewPost={setNewPost}
                    />
                  }
                />
                <Route
                  path="category/:categoryId"
                  element={
                    <Posts
                      setCurrentId={setCurrentId}
                      setNewPost={setNewPost}
                    />
                  }
                />
                <Route
                  path="myposts/:userId"
                  element={
                    <Posts
                      setCurrentId={setCurrentId}
                      setNewPost={setNewPost}
                    />
                  }
                />
              </Routes>
            </Grid>
          </Grid>
        </Box>
      </Grow>
    </Box>
  );
};

export default Home;
