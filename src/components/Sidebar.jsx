import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function SideBar() {
  const [userId, setUserId] = useState("");
  const [classes, setClasses] = useState([]);

  const  {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchData = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      setUserId(user._id);
    
      try {
        console.log(userId);
        const response = await axios.post("/api/v1/classroom/all", { userId });
        if(response.data.statusCode == 200) {
          setClasses(response.data.classrooms);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching classroom data:", error);
      }
    };

    fetchData();
  },[])
  return (
    <div className='sidebar'>
      <h2>Classrooms</h2>
        <ul>
          {classes.length == 0 && (<h3 className="text-center mt-2">No Classes</h3>)}
        {classes.map((cl, i) => (
          <li key={i}><Link to={`/class/${cl._id}`}>{cl.name}</Link></li>
        ))}
        </ul>
    </div>
  )
}

export default SideBar;