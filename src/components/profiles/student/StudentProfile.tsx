import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import ButtonComp from "../../../General/Buttons/ButtonComp"
import { useNavigate } from "react-router-dom"

function StudentProfile() {
  const studentData = useSelector(
    (state: RootState) => state.settings.studentData,
  )

  const navigate = useNavigate()

  const handleNext = () => {
    console.log("clicked next on Teachers")
    navigate("/details")
  }

  const handleEditResult = () => {
    console.log("clicked handleEditResult")
    // navigate("/")
  }

  return (
    <div className="space-y-20">
      <div className="w-50% mx-auto space-y-5 bg-blue-950 p-7">
        {studentData.name && (
          <>
            <div className="flex justify-center items-center space-x-5">
              <p className="py-3 px-5 rounded-full bg-blue-900 text-2xl">
                {studentData.name.at(0)}
              </p>
              {/* <p
                className="text-gray-400 cursor-pointer hover:text-white"
                onClick={handleEditResult}
              >
                Edit
              </p> */}
            </div>
            <div className="flex justify-center">
              <p className="text-2xl">{studentData.name}</p>
            </div>
          </>
        )}
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500 text-xs">Student Id</p>
          <p className="text-sm text-gray-700">{studentData.id || " -"}</p>
        </div>
        {/* <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500  text-xs">Name</p>
          <p className="text-sm">{studentData.name || " -"}</p>
        </div> */}
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500  text-xs">Class</p>
          <p className="text-sm">{studentData.class || " -"}</p>
        </div>

        <p className="text-lg text-gray-400 text-center">Cognitive Skills</p>

        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500  text-xs">Auditory Processing</p>
          <p className="text-sm">
            {studentData.cognitiveSkills?.AuditoryProcessing || " -"}
          </p>
        </div>
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500  text-xs">Visual Processing</p>
          <p className="text-sm">
            {studentData.cognitiveSkills?.VisualProcessing || " -"}
          </p>
        </div>

        <p className="text-lg text-gray-400 text-center">Affective Skills</p>

        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500  text-xs">Appreciation</p>
          <p className="text-sm">
            {studentData.affectiveSkills?.appreciation || " -"}
          </p>
        </div>
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500  text-xs">Motivation</p>
          <p className="text-sm">
            {studentData.affectiveSkills?.motivation || " -"}
          </p>
        </div>

        <p className="text-lg text-gray-400 text-center">Psychometric Skills</p>

        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500  text-xs">Mechanical Reasoning</p>
          <p className="text-sm">
            {studentData.psychometricSkills?.mechanicalReasoning || " -"}
          </p>
        </div>
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-gray-500  text-xs">Data Checking</p>
          <p className="text-sm">
            {studentData.psychometricSkills?.dataChecking || " -"}
          </p>
        </div>
      </div>

      {/* <div className="flex justify-center">
        <ButtonComp buttonType="primary" color={"blue"} func={handleNext}>
          Next
        </ButtonComp>
      </div> */}
    </div>
  )
}

export default StudentProfile
