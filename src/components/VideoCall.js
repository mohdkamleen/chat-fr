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
        <div>
            <h2>Video Call</h2>
            <video ref={localVideoRef} autoPlay muted></video>
            <video ref={remoteVideoRef} autoPlay></video>
        </div>
    );
};

export default VideoCall;
