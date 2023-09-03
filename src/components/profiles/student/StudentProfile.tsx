import React, { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import ButtonComp from "../../../General/Buttons/ButtonComp"
import { useNavigate } from "react-router-dom"
import Panel from "../../reusables/Panel"
import CognitiveSkillsTable from "../../result/skillsTable/CognitiveSkillsTable"
import AffectiveSkillsTable from "../../result/skillsTable/AffectiveSkillsTable"
import PsychometricSkillsTable from "../../result/skillsTable/PsychometricSkillsTable"

function StudentProfile() {
  const studentData = useSelector(
    (state: RootState) => state.settings.studentData,
  )

  const [activeIndex, setActiveIndex] = useState(0)

  const navigate = useNavigate()

  const handleNext = () => {
    console.log("clicked next on Teachers")
    navigate("/details")
  }

  const handleEditResult = () => {
    console.log("clicked handleEditResult")
    // navigate("/")
  }

  // console.log("studentData is ", studentData)

  return (
    <div className="space-y-20">
      <div className="w-50% mx-auto space-y-5  border rounded-lg bg-gray-200 p-7">
        {/* <div className="w-50% mx-auto space-y-5 bg-blue-950 p-7"> */}
        {studentData.name && (
          <>
            <div className="flex justify-center items-center space-x-5">
              <p className="py-3 px-5 rounded-full bg-blue-700 text-white text-2xl">
                {studentData.name.at(0)}
              </p>
            </div>
            <div className="flex justify-center">
              <p className="text-2xl">{studentData.name}</p>
            </div>
          </>
        )}
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-black text-xs">Student Id</p>
          <p className="text-sm text-gray-700">{studentData.id || " -"}</p>
        </div>
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-black  text-xs">Class</p>
          <p className="text-sm">{studentData.class || " -"}</p>
        </div>
      </div>

      {/* table section */}
      <div className="space-y-10">
        <CognitiveSkillsTable />
        <div className="flex justify-between">
          <AffectiveSkillsTable />
          <PsychometricSkillsTable />
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
