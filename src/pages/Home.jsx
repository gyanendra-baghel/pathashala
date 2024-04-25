import React, {useContext, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import Header from '../components/Header'
import Footer from '../components/Footer'
import SideBar from '../components/Sidebar'
import { UserContext } from '../context/UserContext'
import ClassRoom from '../components/ClassRoom'
import CreateClassroom from './Classroom/CreateClassroom'

function Home() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { classId } = useParams();

  useEffect(() => {
    if(!user) {
        navigate("/signup");
    }
  },[]);


  return (
    <div>
      <Header/>
      <main className='screen-main'>
        <SideBar/>
        { user?.role == "Teacher" && (classId ? (<ClassRoom classId={classId}/>) : <CreateClassroom />) }
      </main>
      <Footer/>
    </div>
  )
}

export default Home