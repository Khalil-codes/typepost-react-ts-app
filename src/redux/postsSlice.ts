import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { IPost } from "../types.d";
import { RootState } from "./store";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-type": "application/json",
    },
});

const defaultEditPost: IPost = {
    id: 0,
    title: "",
    description: "",
    created_at: "",
    updated_at: "",
    author: "",
};

export interface IReduxInitialState {
    posts?: IPost[];
    loading: boolean;
    error: boolean;
    editPost: IPost;
}

const initialState: IReduxInitialState = {
    posts: [],
    loading: false,
    error: false,
    editPost: defaultEditPost,
};

export const fetchPosts = createAsyncThunk("posts", async () => {
    const response = await api.get("posts");
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error("Error Occurred");
    }
});

export const addPost = createAsyncThunk(
    "addPost",
    async (postData: { title?: string; description?: string }) => {
        const data = { ...postData, author: "khalil" };
        const response = await api.post("posts/create", data);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Error Occurred");
        }
    }
);

export const updatePost = createAsyncThunk(
    "editPost",
    async (updatedPost: IPost) => {
        const response = await api.patch(
            `posts/${updatedPost.id}/update`,
            updatedPost
        );
        if (response.status === 201) {
            return response.data;
        }
    }
);

export const deletePost = createAsyncThunk(
    "deletePost",
    async (postId: number) => {
        const response = await api.delete(`/posts/${postId}/delete`);
        if (response.status === 200) {
            return postId;
        } else {
            throw new Error("Error Occurred");
        }
    }
);

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        editPostReducer: (state, action) => {
            const post = state.posts?.find(
                (post) => post.id === action.payload
            );
            if (post) state.editPost = post;
        },
        resetEditPostState: (state) => {
            state.editPost = defaultEditPost;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(
            fetchPosts.fulfilled,
            (state, action: PayloadAction<IPost[]>) => {
                state.posts = action.payload;
                state.loading = false;
            }
        );
        builder.addCase(fetchPosts.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(
            deletePost.fulfilled,
            (state, action: PayloadAction<number>) => {
                const idx = state.posts?.findIndex(
                    (post) => post?.id === action.payload
                );
                console.log(idx, action.payload);
                if (idx !== undefined) state.posts?.splice(idx, 1);
            }
        );
        builder.addCase(addPost.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(
            addPost.fulfilled,
            (state, action: PayloadAction<IPost>) => {
                state.posts?.unshift(action.payload);
                state.loading = false;
            }
        );
        builder.addCase(addPost.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(updatePost.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(updatePost.fulfilled, (state) => {
            state.editPost = defaultEditPost;
            state.loading = false;
        });
        builder.addCase(updatePost.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    },
});

export const { editPostReducer, resetEditPostState } = postsSlice.actions;
export const usePosts = () => useSelector((state: RootState) => state.posts);
export default postsSlice.reducer;
