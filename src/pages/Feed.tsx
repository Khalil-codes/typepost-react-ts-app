import React, { FC, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import Post from "../components/Post";
import { fetchPosts, usePosts } from "../redux/postsSlice";
import { IPost } from "../types.d";

const Feed: FC = () => {
    const { posts, loading, error } = usePosts();
    const dispatch = useDispatch();
    useEffect(() => {
        const unsub = (): void => {
            dispatch(fetchPosts());
        };
        unsub();
    }, [dispatch]);

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Some Error Occurred</div>;
    return (
        <div className="feed-container">
            <div className="feed">
                {posts?.map(
                    (post: IPost): ReactNode => (
                        <Post post={post} key={post.id} />
                    )
                )}
            </div>
        </div>
    );
};

export default Feed;
