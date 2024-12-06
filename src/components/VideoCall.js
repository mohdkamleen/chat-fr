import React, { useRef, useEffect } from "react";

const VideoCall = () => {
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const peerConnectionRef = useRef(null);

    useEffect(() => {
        const peerConnection = new RTCPeerConnection();
        peerConnectionRef.current = peerConnection;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                // Add tracks only if peer connection is open
                if (peerConnection.signalingState !== 'closed') {
                    localVideoRef.current.srcObject = stream;
                    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
                }
            });

        peerConnection.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        // Cleanup the peer connection when the component unmounts
        return () => {
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
        };
    }, []); // Only run once on mount

    return (
        <div style={{ padding: "20px" }}>
            <h2>
                <button onClick={() => window.history.back()}>back</button> 
                Welcome {localStorage.getItem("chatName")} 
                <button onClick={() => {
                    localStorage.removeItem("chatName");
                    window.history.back();
                }}>logout</button>
            </h2>
            <video ref={localVideoRef} autoPlay muted></video>
            <video ref={remoteVideoRef} autoPlay></video>
        </div>
    );
};

export default VideoCall;
