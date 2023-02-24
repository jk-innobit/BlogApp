import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Button,
  Dialog,
  IconButton,
  Box,
  Select,
  MenuItem,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { Clear, Close } from "@mui/icons-material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createPost, updatePost } from "../../actions/posts";

const categories = [
  { key: 1, name: "Technology", value: "technology" },
  { key: 2, name: "Cars", value: "cars" },
  { key: 3, name: "Nature", value: "nature" },
  { key: 4, name: "Business", value: "business" },
  { key: 5, name: "Animals", value: "animals" },
];

const initialValues = {
  title: "",
  message: "",
  tags: [],
  category: "",
  selectedFile: "",
};
const errorValues = {
  title: false,
  tags: false,
  message: false,
  category: false,
  selectedFile: false,
};

const Form = ({ currentId, setCurrentId, newPost, setNewPost }) => {
  const [postData, setPostData] = useState(initialValues);
  const [msg, setMsg] = useState(errorValues);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    if (postData.title === "") {
      setMsg({ ...msg, title: true });
    } else if (postData.message === "") {
      setMsg({ ...msg, message: true });
    } else if (postData.tags.length === 0) {
      setMsg({ ...msg, tags: true });
    } else if (postData.category === "") {
      setMsg({ ...msg, category: true });
    } else if (postData.selectedFile === "") {
      setMsg({ ...msg, selectedFile: true });
    } else {
      e.preventDefault();
      setNewPost(false);
      if (currentId) {
        dispatch(updatePost(currentId, postData, navigate));
      } else {
        dispatch(createPost(postData, navigate));
      }
      clear();
    }
  };

  const handleClose = () => {
    setMsg(errorValues);
    setNewPost(false);
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData(initialValues);
  };

  return (
    <Dialog
      open={newPost}
      onClose={() => {
        setNewPost(false);
        clear();
      }}
      fullWidth
      scroll="paper"
    >
      <Box
        component={"form"}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        style={{ textAlign: "center" }}
        m={2}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ width: "100%", textAlign: "center" }}>
            {currentId ? "Editing" : "Creating"} a Blog
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              sx={{ marginTop: "10px" }}
              error={msg.title}
              autoFocus
              helperText={msg.title ? "*required" : null}
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={postData.title}
              onChange={(e) => {
                setMsg({ ...msg, title: false });
                setPostData({ ...postData, title: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ marginTop: "10px" }}
              name="message"
              variant="outlined"
              label="Message"
              error={msg.message}
              helperText={msg.message ? "*required" : null}
              fullWidth
              value={postData.message}
              onChange={(e) => {
                setMsg({ ...msg, message: false });
                setPostData({ ...postData, message: e.target.value });
              }}
            />
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ marginTop: "10px" }}
                name="tags"
                error={msg.tags}
                helperText={msg.tags ? "*required" : null}
                variant="outlined"
                label="Tags"
                fullWidth
                value={postData.tags}
                onChange={(e) => {
                  setMsg({ ...msg, tags: false });
                  setPostData({ ...postData, tags: e.target.value.split(",") });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={msg.category}
                sx={{ marginTop: "10px" }}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={postData.category}
                  label="Category"
                  onChange={(e) => {
                    setMsg({ ...msg, category: false });
                    setPostData({ ...postData, category: e.target.value });
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem value={category.value} key={category.key}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {msg.category ? "*required" : null}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={12} pt={2}>
            <Box
              sx={{
                border: `${msg.selectedFile ? "1px solid red" : "none"}`,
                p: "3px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {postData.selectedFile === "" ? (
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => {
                    setMsg({ ...msg, selectedFile: false });
                    setPostData({ ...postData, selectedFile: base64 });
                  }}
                />
              ) : (
                <>
                  <img
                    src={postData.selectedFile}
                    alt="selected"
                    height="100vh"
                  />
                  <IconButton
                    onClick={() =>
                      setPostData({ ...postData, selectedFile: "" })
                    }
                  >
                    <Clear />
                  </IconButton>
                </>
              )}
            </Box>
            {msg.selectedFile && <div style={{ color: "red" }}>*required</div>}
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ marginTop: "5px" }}
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ marginTop: "5px" }}
              variant="contained"
              fullWidth
              color="secondary"
              size="small"
              onClick={clear}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default Form;
