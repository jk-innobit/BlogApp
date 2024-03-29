import axios from "axios";
import { getItem } from "../utils";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  let token = getItem(process.env.REACT_APP_USERDATA_KEY);
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, post) => API.patch(`${"/posts"}/${id}`, post);

export const deletePost = (id) => API.delete(`${"/posts"}/${id}`);

export const likePost = (id) => API.patch(`${"/posts"}/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData) => API.post("/user/signup", formData);
