import React, { useRef, useState, useEffect } from "react";

// Placeholder for signaling server logic
const signalingServer = {
    // Mock function to simulate signaling exchange (You would replace this with actual signaling logic)
    sendOffer: (offer) => { console.log("Send offer: ", offer); },
    sendAnswer: (answer) => { console.log("Send answer: ", answer); },
    sendCandidate: (candidate) => { console.log("Send candidate: ", candidate); },
    onOfferReceived: (callback) => { /* Implement your server logic */ },
    onAnswerReceived: (callback) => { /* Implement your server logic */ },
    onCandidateReceived: (callback) => { /* Implement your server logic */ }
};

const VideoCall = () => {
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const [peerConnection, setPeerConnection] = useState(null);

    useEffect(() => {
        const pc = new RTCPeerConnection();

        // Handle local media stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localVideoRef.current.srcObject = stream;
                stream.getTracks().forEach((track) => pc.addTrack(track, stream));
            })
            .catch((err) => console.error('Error accessing media devices:', err));

        // Handle incoming remote stream
        pc.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        // ICE candidate handling
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                signalingServer.sendCandidate(event.candidate);
            }
        };

        // Store peer connection in state for later use (e.g., for sending an offer)
        setPeerConnection(pc);

        // Signaling logic (handling offers, answers, and candidates)
        signalingServer.onOfferReceived(handleOffer);
        signalingServer.onAnswerReceived(handleAnswer);
        signalingServer.onCandidateReceived(handleCandidate);

        // Cleanup
        return () => {
            pc.close();
        };
    }, []);

    // Handle the received offer
    const handleOffer = async (offer) => {
        if (peerConnection) {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

            // Create an answer and send it back
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            signalingServer.sendAnswer(answer);
        }
    };

    // Handle the received answer
    const handleAnswer = (answer) => {
        if (peerConnection) {
            peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        }
    };

    // Handle the received ICE candidate
    const handleCandidate = (candidate) => {
        if (peerConnection) {
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
    };

    // Start the call by creating an offer
    const startCall = async () => {
        if (peerConnection) {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            signalingServer.sendOffer(offer); // Send offer to remote peer via signaling
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>
                <button onClick={() => window.history.back()}>Back</button>
                Welcome {localStorage.getItem("chatName")}
                <button
                    onClick={() => {
                        localStorage.removeItem("chatName");
                        window.history.back();
                    }}
                >
                    Logout
                </button>
            </h2>
            <div>
                <video ref={localVideoRef} autoPlay muted></video>
                <video ref={remoteVideoRef} autoPlay></video>
            </div>
            <div>
                <button onClick={startCall}>Start Call</button>
            </div>
        </div>
    );
};

export default VideoCall;
