import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../app/store"
import StudentProfile from "../profiles/student/StudentProfile"
import EditStudent from "../profiles/student/EditStudent"

function Details() {
  const studentData = useSelector(
    (state: RootState) => state.settings.studentData,
  )

  const navigate = useNavigate()

  const handleBack = () => {
    navigate("/teacher")
  }

  return (
    <>
      <div className="flex justify-between items-center mb-20 w-full">
        <p className="text-3xl">S Details</p>
        <p
          className="text-sm cursor-pointer hover:text-gray-300"
          onClick={handleBack}
        >
          Back
        </p>
      </div>
      <div>
        <StudentProfile />
        {/* <EditStudent /> */}
      </div>

      {/* <div className="w-50% mx-auto space-y-5 bg-blue-950 p-10 flex items-center justify-center h-full">
        <div className="">
          <p>frf7t687y98po;mk. ,mbvhftu679y8upij;kn.m</p>
        </div>
      </div> */}
    </>
  )
}

export default Details
