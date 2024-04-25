import React, { useState } from 'react'
import axios from 'axios';

function JoinStudent({ classId }) {
  const [emailId, setEmailId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`/api/v1/classroom/${classId}/enroll`, { emailId });
      if (response.data.statusCode == 200) {
        console.log(response.data);
        setEmailId("");
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
          <label htmlFor="email">Email ID</label>
          <input id='email' type="email" value={emailId} onChange={(e) => { setEmailId(e.target.value) }} />
          <button className='button'>{loading ? 'Creating...' : 'Join'}</button>
        </form>
      </div>
    </div>
  )
}

export default JoinStudent