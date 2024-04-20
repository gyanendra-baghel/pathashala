import React, { useContext, useState } from 'react'
import Assignment from './Assignment'
import JoinStudent from './JoinStudent'
import ClassRoomAssignment from './CreateAssignment'
import { UserContext } from '../context/UserContext'


function ClassRoom({ name }) {
  const {user} = useContext(UserContext);
  const [assignments, setAssignments] = useState([]);

  return (
    <>
        <div className='main-side'>
          <h2>{name}</h2>
          <div className='assignments'>
            <Assignment title="Assignment1" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit dolores nemo ducimus, cupiditate libero aperiam recusandae debitis animi sunt nisi est exercitationem earum, a eos molestiae consequuntur ex laboriosam iure quo quibusdam eligendi adipisci beatae?" time="09:30am" date="09-Jan-2024"/>
          </div>
        </div>
        {user && user.role == "Teacher" && (
          <div className='scroll-y relative'>
            <JoinStudent/>
            <ClassRoomAssignment/>
          </div>
        )};
    </>
  )
}

export default ClassRoom