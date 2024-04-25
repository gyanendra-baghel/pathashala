import React, { useEffect, useState, useContext } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from "axios"
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function CreateClassroom() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [error, setError] = useState("");

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signup");
        }
        setTeacherID(user._id);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post("/api/v1/classroom/create", { name: title, description: desc, teacherId: teacherID });
            if (response.data.statusCode == 200) {
                setError(response.data.message);
                navigate("/");
            }
        } catch (err) {
            setError("Not created");
        }
    }

    return (
        <main className='wh-full center'>
            <div className='form'>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Create Classroom</h1>
                    <label htmlFor="">Title</label>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <label htmlFor="">Description</label>
                    <textarea className='desc-textarea' value={desc} onChange={(e) => { setDesc(e.target.value) }}></textarea>
                    <button type='submit' className='button'>
                        Create
                    </button>
                    <div>{error}</div>
                </form>
            </div>
        </main>
    )
}

export default CreateClassroom