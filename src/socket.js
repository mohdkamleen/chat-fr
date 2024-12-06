// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://chat-bk.onrender.com"); // Backend URL
export default socket;
