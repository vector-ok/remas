import React, { ChangeEvent } from "react"
import { StudentType } from "../../../features/settings/settingsSliceType"
import ButtonComp from "../../../General/Buttons/ButtonComp"
import Input from "../../../General/Inputs/Input"

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
            <p className="text-xs text-black">Affective Skills</p>
            <div>
              <Input
                placeholder="Appreciation"
                type="text"
                value={inputs.affectiveSkills?.appreciation}
                onChange={(_value) => handleChange("appreciation", _value)}
              />
            </div>

            <div>
              <Input
                placeholder="Motivation"
                type="text"
                value={inputs.affectiveSkills?.motivation}
                onChange={(_value) => handleChange("motivation", _value)}
              />
            </div>
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
