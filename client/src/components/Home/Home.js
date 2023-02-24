import React, { useEffect, useState } from "react";
import { Grow, Box, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../../components/Form/Form";
import { getPosts } from "../../actions/posts";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
// import { Context } from "../../App";

const Home = () => {
  // const { loggedIn } = useContext(Context);
  const [newPost, setNewPost] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = React.useState(false);
  // const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  // console.log("home");
  return (
    <Box>
      <Navbar setNewPost={setNewPost} setOpen={setOpen} open={open} />
      <Grow in>
        <Box display="flex">
          <Form
            currentId={currentId}
            setCurrentId={setCurrentId}
            newPost={newPost}
            setNewPost={setNewPost}
          />
          <Sidebar open={open} setOpen={setOpen} />
          <Box sx={{ p: 1 }}>
            {false ? (
              <CircularProgress />
            ) : (
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
            )}
          </Box>
        </Box>
      </Grow>
    </Box>
  );
};

export default Home;
