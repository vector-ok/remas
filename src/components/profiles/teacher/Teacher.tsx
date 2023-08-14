import { ChangeEvent, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import { RootState } from "../../../app/store"
import {
  addTeacherData,
  editTeacherData,
  isEditTeacherFalse,
  isEditTeacherTrue,
} from "../../../features/settings/settingsSlice"
import EditTeacher from "./EditTeacher"
import TeacherProfile from "./TeacherProfile"

// const initialInputs = {
//   id: "",
//   name: "",
//   subject: "",
//   dob: "",
//   phoneNumber: "",
// }

function Teacher(): JSX.Element {
  const teacherData = useSelector(
    (state: RootState) => state.settings.teacherData,
  )
  const isEditTeacher = useSelector(
    (state: RootState) => state.settings.isEditTeacher,
  )
  const [inputs, setInputs] = useState(teacherData)
  const [dobInput, setDobInput] = useState(new Date())

  const dispatch = useDispatch()

  const handleChange = (
    name: string,
    inputValue: string | ChangeEvent<HTMLInputElement> | undefined,
  ) => {
    setInputs({ ...inputs, [name]: inputValue })
  }

  const handleSave = () => {
    dispatch(
      addTeacherData({
        ...teacherData,
        name: inputs.name,
        dob: inputs.dob,
        phoneNumber: inputs.phoneNumber,
        subject: inputs.subject,
      }),
    )
    dispatch(editTeacherData(inputs))
    toast.success("Changes saved!", { theme: "colored" })

    setTimeout(() => {
      dispatch(isEditTeacherFalse())
    }, 1500)
  }

  const handleOpenEditTeacher = useCallback(() => {
    dispatch(isEditTeacherTrue())
    console.log("isEditTeacher ed is ", isEditTeacher)
  }, [isEditTeacher, dispatch])

  const handleViewProfile = useCallback(() => {
    dispatch(isEditTeacherFalse())
    console.log("isEditTeacher view is ", isEditTeacher)
  }, [isEditTeacher, dispatch])

  return (
    <>
      <div className="flex justify-between items-center mb-20 w-full">
        <p className="text-3xl">Teacher Profile</p>
        <p className="text-sm cursor-pointer hover:text-gray-300">
          {isEditTeacher && <p onClick={handleViewProfile}> View Profile</p>}

          {!isEditTeacher && (
            <p onClick={handleOpenEditTeacher}>Edit Profile </p>
          )}
        </p>
      </div>
      {!isEditTeacher && <TeacherProfile />}

      {isEditTeacher && (
        <EditTeacher
          inputs={inputs}
          handleChange={handleChange}
          handleSave={handleSave}
        />
      )}
      <ToastContainer />
    </>
  )
}

export default Teacher
