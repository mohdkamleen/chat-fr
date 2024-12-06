// src/socket.js
import { io } from "socket.io-client";

var url = "https://chat-bk.onrender.com"; // Backend URL
//url = "http://localhost:5000"; // Backend URL

const socket = io(url, {
    transports: ['websocket', 'polling'],
    withCredentials: true
});


export default socket;
