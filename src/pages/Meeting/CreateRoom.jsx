import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider"


const CreateRoom = (props) => {
    const navigate = useNavigate();
    const {userName, setUserName, roomName, setRoomName} = useContext(UserContext)


    function create() {
        navigate(`/room/${roomName}?user=${userName}`);
    }

    return (
        <div>
            <input type="text" value={userName} placeholder="userID"  onChange={(e)=> { setUserName(e.target.value)} }/>
            <input type="text" value={roomName} placeholder="roomID" onChange={(e)=> { setRoomName(e.target.value)} }/>
            <button onClick={create}>Create room</button>
        </div>
    );
};

export default CreateRoom;