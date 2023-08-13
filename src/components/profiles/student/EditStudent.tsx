import React, { ChangeEvent } from "react"
import { StudentType } from "../../../features/settings/settingsSliceType"
import ButtonComp from "../../../General/Buttons/ButtonComp"
import Input from "../../../General/Inputs/Input"
import InputSelect from "../../reusables/InputSelect"

interface IStudentProps {
  inputs: StudentType
  handleChange: (
    name: string,
    inputValue: string | ChangeEvent<HTMLInputElement> | undefined,
  ) => void
  handleSave: () => void
}

function EditStudent({ inputs, handleChange, handleSave }: IStudentProps) {
  return (
    <>
      <div>
        <p className="text-2xl tect-black text-center">{inputs.name}</p>
        <p className="text-xs tect-black text-center mb-10">{inputs.id}</p>
      </div>

      <div className="m-5 space-y-10">
        <div className="w-1/2 m-auto space-y-5 mb-10">
          <div className="space-y-3">
            <p className="text-xs text-black">Personal Details</p>
            <div>
              <Input
                placeholder="Name"
                type="text"
                value={inputs.name}
                onChange={(_value) => handleChange("name", _value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-black">Cognitive Skills</p>
            <div>
              <Input
                placeholder="Auditory Processing"
                type="text"
                value={inputs.cognitiveSkills?.AuditoryProcessing}
                onChange={(_value) =>
                  handleChange("AuditoryProcessing", _value)
                }
              />
            </div>

            <div>
              <Input
                placeholder="Visual Processing"
                type="text"
                value={inputs.cognitiveSkills?.VisualProcessing}
                onChange={(_value) => handleChange("VisualProcessing", _value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            {/* check bnack on affective skills. Rename it to Affective domain */}
            <div className="flex justify-between items-center pt-5">
              <p className="text-xs text-black">Affective Skills</p>
              <p className="text-xs text-black-secondary">Creativity</p>
            </div>

            <InputSelect
              defaultValue="Does he/she ask questions and challenge answers?"
              handleSelect={(_value) => handleChange("ask", _value)}
            />
            <InputSelect
              defaultValue="Does the student make connections and see relationships in ideas?"
              handleSelect={(_value) => handleChange("connections", _value)}
            />
            <InputSelect
              defaultValue="Does he/she explore ideas?"
              handleSelect={(_value) => handleChange("explore", _value)}
            />

            <InputSelect
              defaultValue="Does he/she reflect critically on ideas and actions?"
              handleSelect={(_value) => handleChange("reflect", _value)}
            />

            <div className="flex justify-between items-center pt-5">
              <p className="text-xs text-black">Affective Skills</p>
              <p className="text-xs text-black-secondary">
                Aesthetics Appreciation
              </p>
            </div>

            <InputSelect
              defaultValue="Does the student focus his/her five senses on an object"
              handleSelect={(_value) => handleChange("focus", _value)}
            />
            <InputSelect
              defaultValue="Does the student share inspiration of his/her experience about the object of interest?"
              handleSelect={(_value) => handleChange("inspiration", _value)}
            />

            <div className="flex justify-between items-center pt-5">
              <p className="text-xs text-black">Affective Skills</p>
              <p className="text-xs text-black-secondary">Initiative</p>
            </div>
            <InputSelect
              defaultValue="Does the student express his/her opinion?"
              handleSelect={(_value) => handleChange("communication", _value)}
            />
            <InputSelect
              defaultValue="Is the student involved in the teaching process?"
              handleSelect={(_value) => handleChange("leadership", _value)}
            />

            {/* 
           <div>
              <Input
                placeholder="Appreciation"
                type="text"
                value={inputs.affectiveSkills?.appreciation}
                onChange={(_value) => handleChange("appreciation", _value)}
              />

              <Input
                placeholder="Interpersonal Communication"
                type="text"
                value={inputs.affectiveSkills?.creativity?.ask}
                onChange={(_value) => handleChange("ask", _value)}
              />
            </div>
             
            <div>
              <Input
                placeholder="Problem Solving"
                type="text"
                value={inputs.affectiveSkills?.creativity?.connections}
                onChange={(_value) => handleChange("connections", _value)}
              />
            </div>

            <div>
              <Input
                placeholder="Creativity and Innovation"
                type="text"
                value={inputs.affectiveSkills?.creativity?.explore}
                onChange={(_value) => handleChange("explore", _value)}
              />
            </div>
            <div>
              <Input
                placeholder="Critical Thinking"
                type="text"
                value={inputs.affectiveSkills?.creativity?.reflect}
                onChange={(_value) => handleChange("reflect", _value)}
              />
            </div> */}
          </div>

          <div className="space-y-3">
            <p className="text-xs text-black">Psychometric Skills</p>
            <div>
              <Input
                placeholder="mechanical Reasoning"
                type="text"
                value={inputs.psychometricSkills?.mechanicalReasoning}
                onChange={(_value) =>
                  handleChange("mechanicalReasoning", _value)
                }
              />
            </div>
            <div>
              <Input
                placeholder="Data Checking"
                type="text"
                value={inputs.psychometricSkills?.dataChecking}
                onChange={(_value) => handleChange("dataChecking", _value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <ButtonComp buttonType="primary" color={"blue"} func={handleSave}>
            Save
          </ButtonComp>
        </div>
      </div>
    </>
  )
}

export default EditStudent
