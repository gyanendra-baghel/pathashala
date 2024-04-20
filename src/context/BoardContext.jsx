import React, { createContext, useMemo, useContext, useEffect, useState } from 'react'
import io from "socket.io-client"
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const BoardContext = createContext(null);

function BoardProvider(props) {
  const { userName } = useContext(UserContext);

  const socket = io("//localhost:8080/board",{
    withCredentials: true,
    reconnectionDelay: 10000, // defaults to 1000
    reconnectionDelayMax: 10000, // defaults to 5000
  });
  
  socket.on("connect", () => {
    console.log("Socket Connected");
  })


  return (
    <BoardContext.Provider value={socket}>
        {props.children}
    </BoardContext.Provider>
  )
}

export const useSocket = () => {
  const socket = useContext(BoardContext);
  return socket;
}

export default BoardProvider