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
    traitToUpdate?: string | number,
  ) => void
  handleChangeAffective: (
    name: string,
    inputValue: string | ChangeEvent<HTMLInputElement> | undefined,
    traitToUpdate?: string | number,
  ) => void
  handleSave: () => void
}

function EditStudent({
  inputs,
  handleChange,
  handleSave,
  handleChangeAffective,
}: IStudentProps) {
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
              // handleSelect={(_value) => modifyAffective("creativity", "ask", 7)}
              handleSelect={(_value) =>
                handleChangeAffective("ask", _value, "creativity")
              }
            />
            <InputSelect
              defaultValue="Does the student make connections and see relationships in ideas?"
              // handleSelect={(_value) =>
              //   modifyAffective("creativity", "connections", _value)
              // }
              handleSelect={(_value) =>
                handleChangeAffective("connections", _value, "creativity")
              }
            />
            <InputSelect
              defaultValue="Does he/she explore ideas?"
              handleSelect={(_value) =>
                handleChangeAffective("explore", _value, "creativity")
              }
            />

            <InputSelect
              defaultValue="Does he/she reflect critically on ideas and actions?"
              handleSelect={(_value) =>
                handleChangeAffective("reflect", _value, "creativity")
              }
            />

            <div className="flex justify-between items-center pt-5">
              <p className="text-xs text-black">Affective Skills</p>
              <p className="text-xs text-black-secondary">
                Aesthetics Appreciation
              </p>
            </div>

            <InputSelect
              defaultValue="Does the student focus his/her five senses on an object"
              handleSelect={(_value) =>
                handleChangeAffective("focus", _value, "aestheticsAppreciation")
              }
            />
            <InputSelect
              defaultValue="Does the student share inspiration of his/her experience about the object of interest?"
              handleSelect={(_value) =>
                handleChangeAffective(
                  "inspiration",
                  _value,
                  "aestheticsAppreciation",
                )
              }
            />

            <div className="flex justify-between items-center pt-5">
              <p className="text-xs text-black">Affective Skills</p>
              <p className="text-xs text-black-secondary">Initiative</p>
            </div>
            <InputSelect
              defaultValue="Does the student express his/her opinion?"
              handleSelect={(_value) =>
                handleChangeAffective("communication", _value, "initiative")
              }
            />
            <InputSelect
              defaultValue="Is the student involved in the teaching process?"
              handleSelect={(_value) =>
                handleChangeAffective("leadership", _value, "initiative")
              }
            />

            <div className="flex justify-between items-center pt-5">
              <p className="text-xs text-black">Affective Skills</p>
              <p className="text-xs text-black-secondary">Honesty</p>
            </div>
            <InputSelect
              defaultValue="Does the student cheat during assessment?"
              handleSelect={(_value) =>
                handleChangeAffective("cheat", _value, "honesty")
              }
            />
            <InputSelect
              defaultValue="Is the student exhibit internal moral values?"
              handleSelect={(_value) =>
                handleChangeAffective("moralValues", _value, "honesty")
              }
            />

            <div className="flex justify-between items-center pt-5">
              <p className="text-xs text-black">Affective Skills</p>
              <p className="text-xs text-black-secondary">Leadership</p>
            </div>
            <InputSelect
              defaultValue="Can the student plan a project by breaking it down to simpler modules, allocate resources and set up a time line to follow"
              handleSelect={(_value) =>
                handleChangeAffective("plan", _value, "leadership")
              }
            />
            <InputSelect
              defaultValue="Can the student reflect on a task considering its positive and negative outcomes, and what to change?"
              handleSelect={(_value) =>
                handleChangeAffective("reflect", _value, "leadership")
              }
            />
            <InputSelect
              defaultValue="Can the student build a team by setting goals, recruiting skilled members and communicating effectively with his/her team members?"
              handleSelect={(_value) =>
                handleChangeAffective("buildTeam", _value, "leadership")
              }
            />
            <InputSelect
              defaultValue="Can the student take and uphold decisions?"
              handleSelect={(_value) =>
                handleChangeAffective("decision", _value, "leadership")
              }
            />
            <InputSelect
              defaultValue="Can the student set measurable, defined and observable short term and long term goals and objectives?"
              handleSelect={(_value) =>
                handleChangeAffective("setGoals", _value, "leadership")
              }
            />
            <InputSelect
              defaultValue="Can the student manage his time effectively by prioritizing its use?"
              handleSelect={(_value) =>
                handleChangeAffective("timeManagement", _value, "leadership")
              }
            />
            <InputSelect
              defaultValue="Can the student use writing and speaking skills to communicate?"
              handleSelect={(_value) =>
                handleChangeAffective("communication", _value, "leadership")
              }
            />
            <InputSelect
              defaultValue="Can the student efficiently and effectively resolve conflicts?"
              handleSelect={(_value) =>
                handleChangeAffective(
                  "conflictResolution",
                  _value,
                  "leadership",
                )
              }
            />
            <InputSelect
              defaultValue="Does the student respect others point of view and diversities of people?"
              handleSelect={(_value) =>
                handleChangeAffective("respectDiversity", _value, "leadership")
              }
            />
            <InputSelect
              defaultValue="Does the student believe in his/her ability, accept challenges and know his/her limitations? "
              handleSelect={(_value) =>
                handleChangeAffective("selfBelieve", _value, "leadership")
              }
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
