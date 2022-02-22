import React from "react";
import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import PostForm from "./pages/PostForm";
import Todos from "./pages/Todos";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="main-container">
            <Header />
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="new" element={<PostForm />} />
                <Route path=":id/update" element={<PostForm />} />
                <Route path="todos" element={<Todos />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
