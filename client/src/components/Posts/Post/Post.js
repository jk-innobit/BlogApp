import React from "react";
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
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId, setNewPost }) => {
  const dispatch = useDispatch();
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {post.creator.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={() => {
              setCurrentId(post._id);
              setNewPost(true);
            }}
          >
            <MoreHoriz />
          </IconButton>
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
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAlt fontSize="small" />
          Like &nbsp;
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <Delete fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
