import React, {useContext, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import Header from '../components/Header'
import Footer from '../components/Footer'
import SideBar from '../components/Sidebar'
import Assignment from '../components/Assignment'
import { UserContext } from '../context/UserContext'
import JoinStudent from '../components/JoinStudent'
import ClassRoom from '../components/ClassRoom'

function Home() {

  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);
  const { classId } = useParams();

  useEffect(() => {
    if(!user) {
        navigate("/signup");
    }
    console.log(classId);
  })
  return (
    <div>
      <Header/>
      <main className='screen-main'>
        <SideBar/>
        { classId && (<ClassRoom name={classId}/>) }
        {classId}
      </main>
      <Footer/>
    </div>
  )
}

export default Home