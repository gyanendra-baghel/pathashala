import React, { createContext, useContext, useEffect, useState } from 'react';
import io from "socket.io-client"
import { UserContext } from './UserContext';
import { Outlet } from 'react-router-dom';

const BoardContext = createContext(null);

function BoardProvider() {
  const { userName } = useContext(UserContext);
  const [socket, setSocket] = useState();

  useEffect(()=> {
    const newSocket = io("//localhost:8080/board", {
      withCredentials: true,
      reconnectionDelay: 10000, // defaults to 1000
      reconnectionDelayMax: 10000, // defaults to 5000
    });
  
    newSocket.on("connect", () => {
      setSocket(socketConn);
      console.log("Socket Connected");
    })

    return () =>  {
      newSocket.disconnect();
    }
  },[]);

  return (
    <BoardContext.Provider value={socket}>
      <Outlet/>
    </BoardContext.Provider>
  )
}

export const useSocket = () => {
  const socket = useContext(BoardContext);
  return socket;
}

export default BoardProvider