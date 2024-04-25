import React, {useState} from 'react'
import axios from 'axios';

function JoinStudent({classId}) {
    const [studentId, setStudentId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await axios.post(`/api/v1/classroom/${classId}/enroll`, {studentId});
        if(response.data.statusCode == 200) {
          console.log(response.data);
          setStudentId("");
        }
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }
  return (
    <div className='mt-2'>
        <div className='form'>
                <form action="" onSubmit={handleSubmit}>
                <h1>Add Student</h1>
                <label htmlFor="">Student ID</label>
                <input type="text" value={studentId} onChange={(e)=>{ setStudentId(e.target.value) }}/>
                <button className='button'>
                    {loading ? 'Creating...' : 'Join'}
                </button>
                </form>
        </div>
    </div>
  )
}

export default JoinStudent