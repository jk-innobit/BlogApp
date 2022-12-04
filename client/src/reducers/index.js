import { combineReducers } from "@reduxjs/toolkit";
import { auth } from "./auth";
import { posts } from "./posts";

export const reducer = combineReducers({
  posts: posts,
  auth: auth,
});
