import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@mui/material";
import Posts from "../../components/Posts/Posts";
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
      {/* <AppBar position="static" color="inherit">
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" align="center">
            Blog App
          </Typography>
        </Box>
      </AppBar> */}
      <Navbar setNewPost={setNewPost} />
      <Grow in>
        <Container>
          <Grid container>
            <Grid item>
              <Posts setCurrentId={setCurrentId} setNewPost={setNewPost} />
            </Grid>
            {/* <Grid item xs={12} sm={4}> */}

            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              newPost={newPost}
              setNewPost={setNewPost}
            />

            {/* </Grid> */}
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default Home;
