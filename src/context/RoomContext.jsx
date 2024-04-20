import React, { createContext, useMemo, useContext, useEffect, useState } from 'react'
import io from "socket.io-client"
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const RoomContext = createContext(null);

function RoomProvider(props) {
  const navigate = useNavigate();
  const { userName, roomName } = useContext(UserContext);

  useEffect(() => {
    if(!userName || !roomName) {
      navigate("/");
    }
  }, []);

  const socket = io("//localhost:8080",{
    withCredentials: true,
    reconnectionDelay: 10000, // defaults to 1000
    reconnectionDelayMax: 10000, // defaults to 5000
    query: { userName, roomName }
  });
  
  socket.on("connect", () => {
    console.log("Socket Connected");
  })


  return (
    <RoomContext.Provider value={socket}>
        {props.children}
    </RoomContext.Provider>
  )
}

export const useSocket = () => {
  const socket = useContext(RoomContext);
  return socket;
}

export default RoomProvider