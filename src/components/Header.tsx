import React from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { resetEditPostState } from "../redux/postsSlice";
import "./Header.css";
type Props = {};

const Header = (props: Props) => {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useDispatch();
    const handleNavigate = (route: string): void => {
        dispatch(resetEditPostState());
        navigate(route);
    };
    return (
        <div className="header">
            <div
                className="logo"
                onClick={() => {
                    handleNavigate("/");
                }}>
                TypePost
            </div>
            <div className="links">
                <div
                    className="link"
                    onClick={() => {
                        handleNavigate("/");
                    }}>
                    Home
                </div>
                <div
                    className="link"
                    onClick={() => {
                        handleNavigate("/new");
                    }}>
                    Add Post
                </div>
                <div
                    className="link"
                    onClick={() => {
                        handleNavigate("/todos");
                    }}>
                    Todos (External)
                </div>
            </div>
        </div>
    );
};

export default Header;
