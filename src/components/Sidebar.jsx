import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function SideBar() {
  const [userID, setUserID] = useState("");
  const [classes, setClasses] = useState([]);
  const  {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchData = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      setUserID(user._id);

      if (user.role === "Teacher") {
        try {
          const response = await axios.post("/api/v1/classroom/", { teacherId: userID });
          const data = response.data;
          setClasses(data);
        } catch (error) {
          console.error("Error fetching classroom data:", error);
        }
      }
    };

    fetchData();
  })
  return (
    <div className='sidebar'>
      <h2>Classrooms</h2>
        <ul>
        {classes.map((cl, i) => (
          <li key={i}><Link to={`/class/${cl.name}`}>{cl.name}</Link></li>
        ))}
        </ul>
    </div>
  )
}

export default SideBar;