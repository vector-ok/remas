import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import ButtonComp from "../../General/Buttons/ButtonComp"
import Input from "../../General/Inputs/Input"
import { useAppDispatch } from "../../app/hooks"
import { RootState } from "../../app/store"
import {
  addStudentData,
  addTeacherData,
  isLoggedInTrue,
  isRegisterTrue,
  isStudentFalse,
  isStudentTrue,
  isTeacherFalse,
  isTeacherTrue,
} from "../../features/settings/settingsSlice"
import { students, teachers } from "../../services/constants"

const initialInputs = {
  id: "",
  password: "",
  name: "",
  phoneNumber: "",
  subject: "",
  dob: "",
  loginType: "Teacher",
}

function Login(): JSX.Element {
  const selectedTab = useSelector(
    (state: RootState) => state.settings.selectedTab,
  )

  const isLoggedIn = useSelector(
    (state: RootState) => state.settings.isLoggedIn,
  )

  const [inputs, setInputs] = useState(initialInputs)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      // const teacher = teachers.findIndex((item) => item.id === inputs.id)
      // dispatch(addTeacherData(teachers[teacher]))
      inputs.loginType === "Teacher"
        ? navigate("/teacher")
        : navigate("/student")
    }
  }, [navigate, isLoggedIn])

  const handleChange = (name: string, inputValue: string | undefined) => {
    setInputs({ ...inputs, [name]: inputValue })
  }

  const openRegisterUI = () => {
    dispatch(isRegisterTrue())
  }

  const handleLogin = () => {
    console.log("inputs is ", inputs)

    if (inputs.loginType === "Teacher") {
      const teacher = teachers.find((teach: any) => teach.id === inputs.id)
      if (teacher?.id === inputs.id && teacher.password === inputs.password) {
        toast.success("Teacher Login successful!", { theme: "colored" })
        const teacher = teachers.findIndex((item) => item.id === inputs.id)
        dispatch(addTeacherData(teachers[teacher]))
        dispatch(isLoggedInTrue())
        setTimeout(() => {
          dispatch(isTeacherTrue())
          dispatch(isStudentFalse())
          navigate("/teacher")
        }, 3000)
        return
      }
      dispatch(isTeacherFalse())
      return toast.error("ID and password do not match!", { theme: "colored" })
    }

    if (inputs.loginType === "Student") {
      const student = students.find((stud: any) => stud.id === inputs.id)
      if (student?.id === inputs.id && student.password === inputs.password) {
        toast.success("Student Login successful!", { theme: "colored" })
        const student = students.findIndex((stu) => stu.id === inputs.id)
        dispatch(addStudentData(students[student]))
        dispatch(isLoggedInTrue())
        setTimeout(() => {
          dispatch(isStudentTrue())
          dispatch(isTeacherFalse())
          navigate("/student")
        }, 1500)
        return
      }
      dispatch(isStudentFalse())
      return toast.error("ID and password do not match!", { theme: "colored" })
    }

    dispatch(isTeacherFalse())
    dispatch(isStudentFalse())
    toast.error("Access Denied!", { theme: "colored" })
  }

  return (
    <>
      <div className="m-5 space-y-20">
        <div className="w-1/2 m-auto space-y-5">
          <div className="flex justify-center">
            <p className="text-gray-300">Login</p>
          </div>
          <div>
            <Input
              placeholder="ID"
              type="text"
              value={inputs.id}
              onChange={(_value) => handleChange("id", _value)}
            />
          </div>
          <div>
            <Input
              placeholder="Password"
              type="password"
              value={inputs.password}
              onChange={(_value) => handleChange("password", _value)}
            />
          </div>
          <div className="relative w-full">
            <select
              className="w-full p-2.5 text-black-tertiary bg-white border rounded-lg hover:border-blue shadow-sm outline-none appearance-none focus:border-indigo-600"
              onChange={(e) =>
                setInputs({ ...inputs, loginType: e.target.value })
              }
            >
              <option>Teacher</option>
              <option>Student</option>
            </select>
          </div>
          <div>
            <p
              className="text-sm text-blue cursor-pointer"
              onClick={openRegisterUI}
            >
              Register
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <ButtonComp buttonType="primary" color={"blue"} func={handleLogin}>
            Login
          </ButtonComp>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default Login
