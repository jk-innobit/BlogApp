import React, { useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardHeader,
  Avatar,
  IconButton,
} from "@mui/material";
import { ThumbUpAlt, Delete, MoreHoriz } from "@mui/icons-material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts";
import { Context } from "../../../App";

const Post = ({ post, setCurrentId, setNewPost }) => {
  const { loggedIn } = useContext(Context);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile")).result._id
    : "";

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {post?.creatorName[0]}
          </Avatar>
        }
        action={
          loggedIn &&
          post.creatorId === userId && (
            <IconButton
              title="Edit"
              aria-label="settings"
              onClick={() => {
                setCurrentId(post._id);
                setNewPost(true);
              }}
            >
              <MoreHoriz />
            </IconButton>
          )
        }
        title={post.title}
        subheader={moment(post.createdAt).fromNow()}
      />
      <CardMedia component="img" alt="post" image={post.selectedFile} />
      <CardContent>
        <Typography color="text.secondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {post.message}
        </Typography>
      </CardContent>
      {loggedIn && (
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(post._id, navigate))}
          >
            <ThumbUpAlt fontSize="small" />
            Like &nbsp;
            {post.likes.length}
          </Button>
          {post.creatorId === userId && (
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(post._id, navigate))}
            >
              <Delete fontSize="small" />
              Delete
            </Button>
          )}
          {/* 
        download functionality #############
        <Button>
          <a
            href={`${post.selectedFile}`}
            download
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DownloadForOffline />
          </a>
        </Button>
        */}
        </CardActions>
      )}
    </Card>
  );
};

export default Post;
