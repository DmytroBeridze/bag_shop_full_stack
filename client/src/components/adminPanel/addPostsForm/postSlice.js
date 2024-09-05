import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useHttp from "../../../hooks/http.hooks";

const initialState = {
  posts: [],
  postStatus: null,
  isloading: false,
};

// create
export const addPosts = createAsyncThunk("posts/addPosts", async (body) => {
  const { adminRequest } = useHttp();
  const { data } = await adminRequest(
    "http://localhost:3002/api/blog/posts",
    "post",
    body,
    { "Content-type": "multipart/form-data" }
  );
  return data;
});

// getAll
export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  const { adminRequest } = useHttp();
  const { data } = await adminRequest("http://localhost:3002/api/blog/posts");
  return data;
});

// delete
export const deletePost = createAsyncThunk("posts/deletePost", async (body) => {
  const { id } = body;

  const { adminRequest } = useHttp();
  const { data } = await adminRequest(
    `http://localhost:3002/api/blog/posts/${id}`,
    "delete",
    body
  );

  return data;
});

// ...edit
export const editPost = createAsyncThunk("posts/editPost", async (formData) => {
  const { adminRequest } = useHttp();
  const { _id } = Object.fromEntries(formData);

  const { data } = await adminRequest(
    `http://localhost:3002/api/blog/posts/${_id}`,
    "put",
    formData,
    { "Content-type": "multipart/form-data" }
  );

  return data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //... post
      .addCase(addPosts.pending, (state) => {
        return {
          ...state,
          isloading: true,
          postStatus: null,
        };
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        return {
          ...state,
          //   posts: [...state.posts, action.payload.post],
          isLoading: false,
          postStatus: action.payload.message,
        };
      })
      .addCase(addPosts.rejected, (state, action) => {
        return {
          ...state,
          postStatus: action.payload,
          isloading: false,
        };
      });

    //   get all
    builder
      .addCase(getAllPosts.pending, (state) => {
        return {
          ...state,
          isloading: true,
          postStatus: null,
        };
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        return {
          ...state,
          posts: action.payload,
          isLoading: false,
          postStatus: null,
        };
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        return {
          ...state,
          postStatus: action.payload,
          isloading: false,
        };
      });
    //... delete
    builder
      .addCase(deletePost.pending, (state) => {
        return { ...state, postStatus: null, isloading: true };
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log();

        return {
          ...state,
          isloading: false,
          // posts: action.payload.post,
          postStatus: action.payload.message,
        };
      })
      .addCase(deletePost.rejected, (state, action) => {
        return {
          ...state,
          isloading: false,
          postStatus: action.payload,
        };
      });

    // ...edit
    builder
      .addCase(editPost.pending, (state) => {
        return { ...state, postStatus: null, isloading: true };
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (elem) => elem._id === action.payload.updatedPost._id
        );

        state.isloading = false;
        state.postStatus = action.payload.message;
        state.posts[index] = action.payload.updatedPost;

        // !---можна робити і так, але буде смикатись при перерендингу таблиця з постами
        // return {
        //   ...state,
        //   isloading: false,
        //   posts: action.payload.updatedPost,
        //   postStatus: action.payload.message,
        // };
      })
      .addCase(editPost.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          status: action.payload,
        };
      });
  },
});

const { actions, reducer } = postsSlice;
// const {}=actions
export default reducer;
