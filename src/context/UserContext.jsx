import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [classRooms, setClassRooms] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, classRooms, setClassRooms }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;