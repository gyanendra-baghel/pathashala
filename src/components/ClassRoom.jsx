import React, { useContext, useEffect, useState } from "react";
import Assignment from "./Assignment";
import JoinStudent from "./JoinStudent";
import CreateAssignment from "./CreateAssignment";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function ClassRoom({ classId }) {
  const { user } = useContext(UserContext);
  const [classname, setClassName] = useState("");
  const [classRoom, setClassRoom] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.post("/api/v1/classroom", { classId });
      console.log(response.data);
      if (response.data.statusCode == 200) {
        console.log(response.data);
        setClassRoom(response.data.classRoom);
        setClassName(response.data.classRoom.name);
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const response = await axios.post(`/api/v1/classroom/${classId}/assignments`, { classId });
      console.log(response.data);
      if (response.data.statusCode == 200) {
        setAssignments(response.data.assignments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="main-side">
        <h1 className="text-center">{classname || classId}</h1>
        <div className="assignments">
          {assignments.length == 0 && (<h2>Assignment not available.</h2>)}
          {assignments.map(({ title, description, created_at }) =>
          (
            <Assignment title={title} key={title} desc={description} time={created_at} date="09-Jan-2024" />
          )
          )}
        </div>
      </div>
      {user && user.role == "Teacher" && (
        <div className="scroll-y relative mh-100">
          <CreateAssignment classId={classId} />
          <JoinStudent classId={classId} />
        </div>
      )}
    </>
  );
}

export default ClassRoom;
