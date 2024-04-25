import React, {useState} from 'react'
import axios from 'axios';

function CreateAssignment({classId}) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [dueDate, setDueDate] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        console.log(`/api/v1/classroom/${classId}/assignment/create`);
        const response = await axios.post(`/api/v1/classroom/${classId}/assignment/create`,{title, desc, dueDate});
        console.log(response.data);
        if (response.data.statusCode == 200) {
          setError(response.data.message);
        }
      } catch(e) {
        setError("Something not working properly.");
        console.error(e)
      }
    }

  return (
    <div className='mt-5'>
        <div className='form'>
                <form action="" onSubmit={handleSubmit}>
                <h1>Create Assignment</h1>
                <label htmlFor="">Title</label>
                <input type="text" value={title} onChange={(e)=>{ setTitle(e.target.value) }}/>
                <label htmlFor="">Description</label>
                <input type="text" value={desc} onChange={(e)=>{ setDesc(e.target.value) }}/>
                <label htmlFor="">Due Date</label>
                <input type="date" value={dueDate} onChange={(e)=>{ setDueDate(e.target.value) }}/>
                <button className='button' type='submit'>
                    {loading ? 'Creating...' : 'Create'}
                </button>
                <p>{error}</p>
                </form>
        </div>
    </div>
  )
}

export default CreateAssignment