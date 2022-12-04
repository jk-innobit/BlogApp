import React, { useState, useEffect } from "react";
import { TextField, Typography, Button, Paper, Dialog } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
// import { Context } from "../../App";

const initialValues = {
  creator: "",
  title: "",
  message: "",
  tags: [],
  selectedFile: "",
};

const Form = ({ currentId, setCurrentId, newPost, setNewPost }) => {
  // const { newPost, setNewPost } = useContext(Context);
  const [postData, setPostData] = useState(initialValues);
  const user = localStorage.getItem("profile");

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };
  // useEffect(() => {
  //   setPostData({
  //     creator: "",
  //     title: "",
  //     message: "",
  //     tags: [],
  //     selectedFile: "",
  //   });
  // }, []);

  return (
    <Dialog
      open={newPost}
      onClose={() => {
        setPostData(initialValues);
        setNewPost(false);
      }}
    >
      <Paper sx={{ marginTop: "10px", padding: "10px" }}>
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          style={{ textAlign: "center" }}
        >
          <Typography variant="h6">
            {currentId ? "Editing" : "Creating"} a Post
          </Typography>
          <TextField
            sx={{ marginTop: "5px" }}
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          />
          <TextField
            sx={{ marginTop: "5px" }}
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            sx={{ marginTop: "5px" }}
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            sx={{ marginTop: "5px" }}
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div style={{ marginTop: "5px" }}>
            {postData.selectedFile === "" || currentId ? (
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            ) : (
              <Typography color="text.secondary" fontSize="small">
                File Uploaded
              </Typography>
            )}
          </div>
          <Button
            sx={{ marginTop: "5px" }}
            variant="contained"
            fullWidth
            type="submit"
            color="primary"
            size="large"
          >
            Submit
          </Button>
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
        </form>
      </Paper>
    </Dialog>
  );
};

export default Form;
