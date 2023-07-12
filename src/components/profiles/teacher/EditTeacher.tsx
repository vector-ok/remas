import React, { ChangeEvent, Dispatch, SetStateAction } from "react"
import { TeacherType } from "../../../features/settings/settingsSliceType"
import ButtonComp from "../../../General/Buttons/ButtonComp"
import Input from "../../../General/Inputs/Input"

interface ITeacherProps {
  inputs: TeacherType
  handleChange: (
    name: string,
    inputValue: string | ChangeEvent<HTMLInputElement> | undefined,
  ) => void
  handleSave: () => void
}

function EditTeacher({ inputs, handleChange, handleSave }: ITeacherProps) {
  return (
    <div className="m-5 space-y-20">
      <div className="w-1/2 m-auto space-y-5 mb-10">
        <div>
          <Input
            placeholder="Teacher ID"
            type="text"
            value={inputs.id}
            onChange={(_value) => handleChange("id", _value)}
            isDisabled
          />
        </div>
        <div>
          <Input
            placeholder="Name"
            type="text"
            value={inputs.name}
            onChange={(_value) => handleChange("name", _value)}
          />
        </div>
        <div className="relative w-full">
          <select
            className="w-full p-2.5 text-black-tertiary bg-white border rounded-lg hover:border-blue shadow-sm outline-none appearance-none focus:border-indigo-600"
            onChange={(e) => handleChange("subject", e.target.value)}
          >
            <option>Maths</option>
            <option>English</option>
            <option>Physics</option>
            <option>Biology</option>
          </select>
        </div>

        <div>
          <Input
            placeholder="Phone Number"
            type="number"
            value={inputs.phoneNumber}
            onChange={(_value) => handleChange("phoneNumber", _value)}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <ButtonComp buttonType="primary" color={"blue"} func={handleSave}>
          Save
        </ButtonComp>
      </div>
    </div>
  )
}

export default EditTeacher
