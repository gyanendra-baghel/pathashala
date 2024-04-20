import React, {useState} from 'react'

function JoinStudent() {
    const [studentID, setStudentID] = useState("");
    const [loading, setLoading] = useState(false);
  return (
    <div className='pt-7'>
        <div className='login'>
                <form action="" >
                <h1>Add Student</h1>
                <label htmlFor="">Student ID</label>
                <input type="text" value={studentID} onChange={(e)=>{ setStudentID(e.target.value) }}/>
                <button className='button'>
                    {loading ? 'Creating...' : 'Join'}
                </button>
                </form>
        </div>
    </div>
  )
}

export default JoinStudent