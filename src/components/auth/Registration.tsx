import React, { useEffect, useState } from "react"
import ButtonComp from "../../General/Buttons/ButtonComp"
import Input from "../../General/Inputs/Input"
import { useDispatch, useSelector } from "react-redux"
import {
  addTeacherData,
  addTeacherDataArray,
  isLoggedInTrue,
  isRegisterFalse,
  isTeacherTrue,
} from "../../features/settings/settingsSlice"
import { useNavigate } from "react-router-dom"
import { teachers } from "../../services/constants"
import { RootState } from "../../app/store"

const initialInputs = {
  id: "",
  name: "",
  subject: "Maths",
  dob: "",
  phoneNumber: "",
}

function Registration(): JSX.Element {
  const TeacherDataArray = useSelector(
    (state: RootState) => state.settings.teacherDataArray,
  )
  const [inputs, setInputs] = useState(initialInputs)
  const [newTeacherId, setNewTeacherId] = useState("")
  const [registerTeacher, setRegisterTeacher] = useState<boolean>(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (registerTeacher) {
      dispatch(addTeacherData(inputs))
      dispatch(addTeacherDataArray(inputs))
      navigate("/teacher")
      setRegisterTeacher(false)
    }
  }, [inputs])

  useEffect(() => {
    let lastTeacher = TeacherDataArray.at(-1)
    let lastTeacherId = lastTeacher?.id?.split("t")[0]
    let newId = "00" + String(Number(lastTeacherId) + 1) + "te"

    setNewTeacherId(newId)
  }, [TeacherDataArray])

  const handleChange = (name: string, inputValue: string) => {
    setInputs({ ...inputs, [name]: inputValue })
  }

  const handleRegister = () => {
    setInputs({ ...inputs, id: newTeacherId })
    setRegisterTeacher(true)
    dispatch(isLoggedInTrue())
    dispatch(isTeacherTrue())
    // dispatch(isRegisterFalse())
  }

  const openLoginUI = () => {
    dispatch(isRegisterFalse())
  }

  // console.log("registration inputs is ", inputs)

  return (
    <div className="m-5 space-y-20">
      <div className="w-1/2 m-auto space-y-5 mb-10">
        <div className="flex justify-center">
          <p className="text-black-secondary">Registration</p>
        </div>
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
        <div className="w-full border-gray-500 rounded-lg">
          <input
            className="bg-transparent w-full text-gray-400"
            placeholder="DoB"
            type="date"
            value={inputs.dob}
            onChange={(event) => {
              handleChange("dob", event.target.value)
            }}
          />
        </div>
        <div>
          <p className="text-sm text-blue cursor-pointer" onClick={openLoginUI}>
            Login
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <ButtonComp buttonType="primary" color={"blue"} func={handleRegister}>
          Register
        </ButtonComp>
      </div>
    </div>
  )
}

export default Registration
