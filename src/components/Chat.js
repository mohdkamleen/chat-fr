// src/components/Chat.js
import React, { useState, useEffect } from "react";
import socket from "../socket";

const Chat = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isNameSet, setIsNameSet] = useState(false);

    useEffect(() => {
        // Listen for incoming messages
        socket.on("receiveMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => socket.off("receiveMessage");
    }, []);

    useEffect(() => {
        const savedName = localStorage.getItem("chatName");
        if (savedName) {
            setName(savedName);
            setIsNameSet(true);
        }
    }, []);
    
    const handleSetName = () => {
        if (name.trim()) {
            localStorage.setItem("chatName", name);
            setIsNameSet(true);
        }
    };
     
    const sendMessage = () => {
        if (message.trim() && name.trim()) {
            // Emit message with name
            socket.emit("sendMessage", { name, message });
            setMessage("");
        }
    };
    const handleInputChange = (e) => {
        setMessage(e.target.value);  // Update the message as user types
    };
    
    const handleInputKeyUp = (e) => {   
        if (e.keyCode === 13 && message.trim()) {
            sendMessage(); // Send message on Enter key press
        }
    };
    
    return (
        <div>
            {!isNameSet ? (
                <div>
                    <h2>Enter Your Name</h2>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                    />
                    <button onClick={handleSetName}>Join Chat</button>
                </div>
            ) : (
                <div>
                    <h2>Welcome {localStorage.getItem("chatName")}</h2>
                    <div>
                        {messages.map((msg, index) => (
                            <p key={index}>
                                <strong>{msg.name}:</strong> {msg.message}
                            </p>
                        ))}
                    </div>
                    <input
                        style={{width:"90%",maxWidth:"500px",fontSize:"17px",margin:"10px 20px", padding:"5px 10px"}}
                        type="text"
                        value={message}  // Value linked to state
                        placeholder="Type a message" 
                        onChange={handleInputChange}  // Update state on each keystroke
                        onKeyUp={handleInputKeyUp}   // Send message on Enter
                    />
                    {/* <button onClick={sendMessage}>Send</button> */}
                </div>
            )}
        </div>
    );
    
     
};

export default Chat;
