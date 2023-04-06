import * as api from "../api/index.js";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", data: data, loading: false });
  } catch (error) {
    dispatch({ type: "FETCH_ALL", loading: false });
    console.log(error.message);
    const { response } = error;
    alert(response.data.message);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE", data: data });
  } catch (error) {
    console.log(error.message);
    const { response } = error;
    alert(response.data.message);
    if (error.response.status === 401) navigate("/auth");
  }
};

export const updatePost = (id, post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: "UPDATE", data: data });
  } catch (error) {
    console.log(error.message);
    const { response } = error;
    alert(response.data.message);
    if (error.response.status === 401) navigate("/auth");
  }
};

export const deletePost = (id, navigate) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE", data: id });
  } catch (error) {
    console.log(error.message);
    const { response } = error;
    alert(response.data.message);
    if (error.response.status === 401) navigate("/auth");
  }
};

export const likePost = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: "UPDATE", data: data });
  } catch (error) {
    dispatch({ type: "auth", loggedIn: false });
    console.log(error.message);
    const { response } = error;
    alert(response.data.message);
  }
};
