import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { addPost, updatePost, usePosts } from "../redux/postsSlice";

const PostForm: FC = () => {
    const { loading, error, editPost } = usePosts();
    const action: string = editPost.title.length === 0 ? "Add" : "Update";
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        if (editPost) {
            setTitle(editPost.title);
            setDescription(editPost.description);
        }
    }, [editPost]);

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>): void =>
        setTitle(e.target.value);
    const handleChangeDescription = (
        e: ChangeEvent<HTMLTextAreaElement>
    ): void => setDescription(e.target.value);
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        if (title.length === 0 || description.length === 0) return;
        try {
            if (editPost.title.length !== 0)
                dispatch(updatePost({ ...editPost, title, description }));
            else dispatch(addPost({ title, description }));
            navigate("/");
        } catch {
            console.error("Somthing Happened");
        }
    };
    return (
        <div className="container">
            <h2 className="form-title">{action} Post:</h2>
            {error ? <h4 className="error-txt">Somthing Went wrong</h4> : null}
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>Title:</label>
                    <input
                        type="text"
                        placeholder="Enter Title..."
                        value={title}
                        onChange={handleChangeTitle}
                    />
                </div>
                <div className="form-control">
                    <label>Description:</label>
                    <textarea
                        rows={7}
                        placeholder="Enter Description"
                        value={description}
                        onChange={handleChangeDescription}></textarea>
                </div>
                <div className="form-control">
                    <button className="form-btn" disabled={loading}>
                        {action} Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
