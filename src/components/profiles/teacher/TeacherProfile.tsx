import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import ButtonComp from "../../../General/Buttons/ButtonComp"
import { useNavigate } from "react-router-dom"

function TeacherProfile() {
  const teacherData = useSelector(
    (state: RootState) => state.settings.teacherData,
  )

  const navigate = useNavigate()

  const handleNext = () => {
    navigate("/selection")
  }

  return (
    <div className="space-y-20">
      <div className="w-50% mx-auto space-y-5 border rounded-lg bg-gray-200 p-10">
        {/* <div className="w-50% mx-auto space-y-5 bg-blue-950 p-10"> */}
        {teacherData.name && (
          <div className="flex justify-center">
            <p className="py-3 px-5 rounded-full bg-blue-700 text-2xl text-white">
              {/* <p className="py-3 px-5 rounded-full bg-blue-900 text-2xl"> */}
              {teacherData.name.at(0)}
            </p>
          </div>
        )}
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500">Teacher Id</p>
          <p className="">{teacherData.id || " -"}</p>
        </div>
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500">Name</p>
          <p className="">{teacherData.name || " -"}</p>
        </div>
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500">Subject</p>
          <p className="">{teacherData.subject || " -"}</p>
        </div>

        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500">Phone</p>
          <p className="">{teacherData.phoneNumber || " -"}</p>
        </div>

        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500">DoB</p>
          <p className="">{teacherData.dob || " -"}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <ButtonComp buttonType="primary" color={"blue"} func={handleNext}>
          Next
        </ButtonComp>
      </div>
    </div>
  )
}

export default TeacherProfile
