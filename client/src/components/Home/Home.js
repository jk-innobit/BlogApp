import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../../components/Form/Form";
import { useDispatch } from "react-redux";
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
    <Container maxWidth="xl">
      <Navbar setNewPost={setNewPost} />
      <Grow in>
        <Container>
          <Grid container>
            <Grid item mt={6}>
              <Posts setCurrentId={setCurrentId} setNewPost={setNewPost} />
            </Grid>
            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              newPost={newPost}
              setNewPost={setNewPost}
            />
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default Home;
