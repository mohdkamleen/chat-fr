// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import VideoCall from "./components/VideoCall";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/chat" element={<Chat />} />
                <Route path="/video-call" element={<VideoCall />} />
            </Routes>
        </Router>
    );
}

export default App;
