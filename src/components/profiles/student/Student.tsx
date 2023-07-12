import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { RootState } from "../../../app/store"
import {
  addStudentData,
  editStudentData,
  isEditResultFalse,
  isEditResultTrue,
  isEditStudentFalse,
  isLoggedInFalse,
  isStudentFalse,
  isTeacherFalse,
} from "../../../features/settings/settingsSlice"
import { StudentType } from "../../../features/settings/settingsSliceType"
import EditStudent from "./EditStudent"
import StudentProfile from "./StudentProfile"

function Student(): JSX.Element {
  const studentData = useSelector(
    (state: RootState) => state.settings.studentData,
  )
  const isEditResult = useSelector(
    (state: RootState) => state.settings.isEditResult,
  )
  const isLoggedIn = useSelector(
    (state: RootState) => state.settings.isLoggedIn,
  )

  const isTeacher = useSelector((state: RootState) => state.settings.isTeacher)
  const isStudent = useSelector((state: RootState) => state.settings.isStudent)

  const [inputs, setInputs] = useState<StudentType>(studentData)

  const [dobInput, setDobInput] = useState(new Date())

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    !isLoggedIn && navigate("/")
  }, [])

  const handleChange = (
    name: string,
    inputValue: string | ChangeEvent<HTMLInputElement> | undefined,
  ) => {
    if (name === "AuditoryProcessing" || name === "VisualProcessing") {
      return setInputs({
        ...inputs,
        cognitiveSkills: {
          ...inputs.cognitiveSkills,
          [name]: inputValue,
        },
      } as StudentType)
    }
    if (name === "appreciation" || name === "motivation") {
      return setInputs({
        ...inputs,
        affectiveSkills: {
          ...inputs.affectiveSkills,
          [name]: inputValue,
        },
      } as StudentType)
    }
    if (name === "mechanicalReasoning" || name === "dataChecking") {
      return setInputs({
        ...inputs,
        psychometricSkills: {
          ...inputs.psychometricSkills,
          [name]: inputValue,
        },
      } as StudentType)
    }
    setInputs({ ...inputs, [name]: inputValue })
  }

  const handleSave = () => {
    dispatch(addStudentData(inputs))
    dispatch(editStudentData(inputs))
    toast.success("Student Changes saved!", { theme: "colored" })

    setTimeout(() => {
      dispatch(isEditResultFalse())
    }, 1500)
  }

  const handleOpenEditResult = useCallback(() => {
    dispatch(isEditResultTrue())
  }, [isEditResult, dispatch])

  const handleViewProfile = useCallback(() => {
    dispatch(isEditResultFalse())
  }, [isEditResult, dispatch])

  const handleBack = () => {
    navigate("/selection")
  }

  const handleLogout = () => {
    dispatch(isLoggedInFalse())
    dispatch(isTeacherFalse())
    dispatch(isStudentFalse())
    dispatch(isEditStudentFalse())
    navigate("/")
  }

  return (
    <>
      <div className="flex justify-between items-center mb-10 w-full">
        <p className="text-3xl">Result</p>
        <div className="flex space-x-5">
          <p className="text-sm cursor-pointer hover:text-gray-300">
            {isEditResult && <p onClick={handleViewProfile}> View Result</p>}
            {!isEditResult && isTeacher && (
              <p onClick={handleOpenEditResult}>Edit Result </p>
            )}
          </p>

          {!isStudent && (
            <p
              className="text-sm cursor-pointer hover:text-gray-300"
              onClick={handleBack}
            >
              Back
            </p>
          )}
          <p
            className="text-sm cursor-pointer hover:text-gray-300"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      </div>
      {!isEditResult && <StudentProfile />}

      {isEditResult && (
        <EditStudent
          inputs={inputs}
          handleChange={handleChange}
          handleSave={handleSave}
        />
      )}
      <ToastContainer />
    </>
  )
}

export default Student
