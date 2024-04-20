import React, {useState} from 'react'

function CreateAssignment() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);
  return (
    <div className='mt-2'>
        <div className='login'>
                <form action="" >
                <h1>Create Assignment</h1>
                <label htmlFor="">Title</label>
                <input type="text" value={title} onChange={(e)=>{ setTitle(e.target.value) }}/>
                <label htmlFor="">Description</label>
                <input type="text" value={desc} onChange={(e)=>{ setDesc(e.target.value) }}/>
                <button className='button'>
                    {loading ? 'Creating...' : 'Create'}
                </button>
                </form>
        </div>
    </div>
  )
}

export default CreateAssignment