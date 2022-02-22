import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { deletePost, editPostReducer } from "../redux/postsSlice";
import { IPost } from "../types.d";

type Props = {
    post: IPost;
};

const Post: FC<Props> = ({ post }) => {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useDispatch();
    const handleDelete = (): void => {
        dispatch(deletePost(post.id));
    };
    const handleEdit = (): void => {
        dispatch(editPostReducer(post.id));
        navigate(`${post.id}/update`);
    };
    return (
        <div className="post-container">
            <div className="main-title">
                <h2>{post.title}</h2>
                <div className="actions">
                    <button className="btn btn-edit" onClick={handleEdit}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="btn btn-delete" onClick={handleDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <hr />
            <p>{post.description}</p>
            <h3 className="text-muted">
                - <span>{post.author} at </span>
                {new Date(post.created_at).toLocaleString("en-IN")}
            </h3>
        </div>
    );
};

export default Post;
