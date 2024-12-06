// src/components/VideoCall.js
import React, { useRef, useEffect } from "react";

const VideoCall = () => {
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    useEffect(() => {
        // Setup WebRTC
        const peerConnection = new RTCPeerConnection();
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localVideoRef.current.srcObject = stream;
                stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
            });

        peerConnection.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };
    }, []);

    return (
        <div style={{padding:"20px"}}>
                    <h2> <button onClick={() => window.history.back()}>back</button> Welcome {localStorage.getItem("chatName")} <button onClick={() => localStorage.removeItem("chatName") || window.history.back()}> logout </button></h2>
            <video ref={localVideoRef} autoPlay muted></video>
            <video ref={remoteVideoRef} autoPlay></video>
        </div>
    );
};

export default VideoCall;
