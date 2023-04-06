export const posts = (state = { posts: [], loading: true }, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return { posts: action.data, loading: action.loading };
    case "CREATE":
      return { posts: [...state.posts, action.data] };
    case "UPDATE":
      return {
        posts: state.posts.map((post) =>
          post._id === action.data._id ? action.data : post
        ),
      };
    case "DELETE":
      return { posts: state.posts.filter((post) => post._id !== action.data) };
    default:
      return state;
  }
};
