import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import VideoCard from "../component/Video";
import { useSocket } from "../context/SocketProvider";
import { UserContext } from "../context/UserProvider";


const videoConstraints = {
    height: 320,
    width: 280
};

const Room = () => {
    const { userName, roomName } = useContext(UserContext);
    const socket = useSocket();
    const userVideo = useRef();
    const [stream, setStream] = useState();
    const [callAccepted, setCallAccepted] = useState();
    const [peer, setPeer] = useState();

    const handleAllUser = useCallback((users) => {
        setUsers(users);
    });
    const handleHey = useCallback((data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);
    });
    const handleCallAccepted = useCallback((signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      })

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            setStream(stream);
            userVideo.current.srcObject = stream;
        });
        socket.on("yourID", setYourID);
        socket.on("allUsers", handleAllUser);
        socket.on("hey", handleHey)
        socket.on("callAccepted", handleCallAccepted)
        return () => {
            socket.off("yourID", setYourID);
            socket.off("allUsers", handleAllUser);
            socket.off("hey", handleHey);
        }
    }, [socket]);

    function callPeer(id) {
        const peer = new Peer({ initiator: true, trickle: false, stream: stream });
    
        peer.on("signal", data => {
          socket.emit("callUser", { userToCall: id, signalData: data, from: yourID })
        });
      }
    
      function acceptCall() {
        setCallAccepted(true);
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });

        peer.on("signal", data => {
          socket.current.emit("acceptCall", { signal: data, to: caller })
        });
    
        peer.on("stream", stream => {
          partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
      }


    return (
        <div className="room-container">
            <div className="user-list">
                <div className="video-container">
                    <VideoCard peer={peer} />
                    <video className="user-video" muted ref={userVideo} autoPlay playsInline />
                </div>
                <div className="room-btns">
                    <button>Mic</button>
                    <button>Video</button>
                    <button>Present</button>
                </div>
            </div>
        </div>
    );
};

export default Room;

{/* <div className="user-list">
    <h2>Connected Users</h2>
    <h4>
        {remoteUsers.length > 0 ? `${remoteUsers.length} Connected`: "No one in room"}
    </h4>
    {remoteUsers.length > 0 && (
        <button onClick={handleCallUser}>Start Call</button>
    )};
</div> */}