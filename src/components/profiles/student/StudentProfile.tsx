import React, { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import ButtonComp from "../../../General/Buttons/ButtonComp"
import { useNavigate } from "react-router-dom"
import Panel from "../../reusables/Panel"

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
          <p className="text-black text-xs">Student Id</p>
          <p className="text-sm text-gray-700">{studentData.id || " -"}</p>
        </div>
        {/* <div className="space-x-20 flex items-center justify-between">
          <p className="text-black  text-xs">Name</p>
          <p className="text-sm">{studentData.name || " -"}</p>
        </div> */}
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-black  text-xs">Class</p>
          <p className="text-sm">{studentData.class || " -"}</p>
        </div>

        <p className="text-lg text-black text-center">Cognitive Skills</p>
        {/* <p className="text-lg text-gray-400 text-center">Cognitive Skills</p> */}

        <div className="space-x-20 flex items-center justify-between">
          <p className="text-black  text-xs">Auditory Processing</p>
          <p className="text-sm">
            {studentData.cognitiveSkills?.AuditoryProcessing || " -"}
          </p>
        </div>
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-black  text-xs">Visual Processing</p>
          <p className="text-sm">
            {studentData.cognitiveSkills?.VisualProcessing || " -"}
          </p>
        </div>

        <p className="text-lg text-black text-center">Affective Skills</p>

        <div>
          <div className="cursor-pointer" onClick={() => setActiveIndex(0)}>
            <Panel
              title="Creativity"
              isActive={activeIndex === 0}
              onShow={() => setActiveIndex(0)}
            >
              <div className="border-b my-2 border-black-quin" />
              <div className="space-y-4">
                <div className="space-x-20 flex items-center justify-between">
                  <p className="text-black  text-xs">
                    Interpersonal Communication
                  </p>
                  <p className="text-sm">
                    {studentData.affectiveSkills?.creativity
                      ? studentData.affectiveSkills?.creativity.ask
                      : " -"}
                  </p>
                </div>
                <div className="space-x-20 flex items-center justify-between">
                  <p className="text-black  text-xs">Problem Solving</p>
                  <p className="text-sm">
                    {studentData.affectiveSkills?.creativity?.connections
                      ? studentData.affectiveSkills?.creativity?.connections
                      : " -"}
                  </p>
                </div>
                <div className="space-x-20 flex items-center justify-between">
                  <p className="text-black  text-xs">
                    Creativity and Innovation
                  </p>
                  <p className="text-sm">
                    {studentData.affectiveSkills?.creativity?.explore
                      ? studentData.affectiveSkills?.creativity?.explore
                      : " -"}
                  </p>
                </div>
                <div className="space-x-20 flex items-center justify-between">
                  <p className="text-black  text-xs">Critical Thinking</p>
                  <p className="text-sm">
                    {studentData.affectiveSkills?.creativity?.reflect
                      ? studentData.affectiveSkills?.creativity?.reflect
                      : " -"}
                  </p>
                </div>
              </div>
            </Panel>
          </div>

          <div className="cursor-pointer" onClick={() => setActiveIndex(1)}>
            <Panel
              title="Aesthetics Appreciation"
              isActive={activeIndex === 1}
              onShow={() => setActiveIndex(1)}
            >
              <div className="border-b my-2 border-black-quin" />

              <div className="space-y-4">
                <div className="space-x-20 flex items-center justify-between">
                  <p className="text-black  text-xs">Observation</p>
                  <p className="text-sm">
                    {studentData.affectiveSkills?.aestheticsAppreciation
                      ? studentData.affectiveSkills?.aestheticsAppreciation
                          .focus
                      : " -"}
                  </p>
                </div>
                <div className="space-x-20 flex items-center justify-between">
                  <p className="text-black  text-xs">Inspiration</p>
                  <p className="text-sm">
                    {studentData.affectiveSkills?.aestheticsAppreciation
                      ? studentData.affectiveSkills?.aestheticsAppreciation
                          .inspiration
                      : " -"}
                  </p>
                </div>
              </div>
            </Panel>
          </div>

          <div className="cursor-pointer" onClick={() => setActiveIndex(2)}>
            <Panel
              title="Initiative"
              isActive={activeIndex === 2}
              onShow={() => setActiveIndex(2)}
            >
              <div className="border-b my-2 border-black-quin" />

              <div className="space-y-4">
                <div className="space-x-20 flex items-center justify-between">
                  <p className="text-black  text-xs">Communication</p>
                  <p className="text-sm">
                    {studentData.affectiveSkills?.initiative
                      ? studentData.affectiveSkills?.initiative?.communication
                      : " -"}
                  </p>
                </div>
                <div className="space-x-20 flex items-center justify-between">
                  <p className="text-black  text-xs">Leadership</p>
                  <p className="text-sm">
                    {studentData.affectiveSkills?.initiative
                      ? studentData.affectiveSkills?.initiative.leadership
                      : " -"}
                  </p>
                </div>
              </div>
            </Panel>
          </div>

          {/* <p className="text-sm text-black-secondary pb-1">Creativity</p>
          <div className="border-b my-2" />
          <div className="space-x-20 flex items-center justify-between">
            <p className="text-black  text-xs">Interpersonal Communication</p>
            <p className="text-sm">
              {studentData.affectiveSkills?.creativity
                ? studentData.affectiveSkills?.creativity.ask
                : " -"}
            </p>
          </div> */}
        </div>

        <p className="text-lg text-black text-center">Psychometric Skills</p>

        <div className="space-x-20 flex items-center justify-between">
          <p className="text-black  text-xs">Mechanical Reasoning</p>
          <p className="text-sm">
            {studentData.psychometricSkills?.mechanicalReasoning || " -"}
          </p>
        </div>
        <div className="space-x-20 flex items-center justify-between">
          <p className="text-black  text-xs">Data Checking</p>
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
