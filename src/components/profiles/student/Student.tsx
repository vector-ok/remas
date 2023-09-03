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

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    !isLoggedIn && navigate("/")
  }, [])

  const handleChange = (
    name: string,
    inputValue: string | ChangeEvent<HTMLInputElement> | undefined,
    traitToUpdate: string | number | undefined,
  ) => {
    setInputs({
      ...inputs,
      cognitiveSkills: {
        ...inputs.cognitiveSkills,
        [name]: inputValue,
      },
      affectiveSkills: {
        ...inputs.affectiveSkills,
        creativity: {
          ...inputs.affectiveSkills?.creativity,
          [name]: inputValue === "Yes" ? 1 : 0,
        },
        aestheticsAppreciation: {
          ...inputs.affectiveSkills?.aestheticsAppreciation,
          [name]: inputValue === "Yes" ? 1 : 0,
        },
        initiative: {
          ...inputs.affectiveSkills?.initiative,
          [name]: inputValue,
        },
      },
    })
  }

  const handleChangeAffective = (
    name: string,
    inputValue: string | ChangeEvent<HTMLInputElement> | undefined,
    traitToUpdate?: string | number,
  ) => {
    if (traitToUpdate === "creativity") {
      setInputs({
        ...inputs,
        affectiveSkills: {
          ...inputs.affectiveSkills,
          creativity: {
            ...inputs.affectiveSkills?.creativity,
            [name]: inputValue === "Yes" ? 1 : 0,
          },
        },
      })
    }
    if (traitToUpdate === "aestheticsAppreciation") {
      setInputs({
        ...inputs,
        affectiveSkills: {
          ...inputs.affectiveSkills,
          aestheticsAppreciation: {
            ...inputs.affectiveSkills?.aestheticsAppreciation,
            [name]: inputValue === "Yes" ? 1 : 0,
          },
        },
      })
    }
    if (traitToUpdate === "initiative") {
      setInputs({
        ...inputs,
        affectiveSkills: {
          ...inputs.affectiveSkills,
          initiative: {
            ...inputs.affectiveSkills?.initiative,
            [name]: inputValue === "Yes" ? 1 : 0,
          },
        },
      })
    }
    if (traitToUpdate === "honesty") {
      setInputs({
        ...inputs,
        affectiveSkills: {
          ...inputs.affectiveSkills,
          honesty: {
            ...inputs.affectiveSkills?.honesty,
            [name]: inputValue === "Yes" ? 1 : 0,
          },
        },
      })
    }
    if (traitToUpdate === "leadership") {
      setInputs({
        ...inputs,
        affectiveSkills: {
          ...inputs.affectiveSkills,
          leadership: {
            ...inputs.affectiveSkills?.leadership,
            [name]: inputValue === "Yes" ? 1 : 0,
          },
        },
      })
    }
  }

  const handleSave = () => {
    dispatch(addStudentData(inputs))
    dispatch(editStudentData(inputs))
    toast.success("Changes saved!", { theme: "colored" })

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
    // navigate("/selection")
    navigate("/class")
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
          handleChangeAffective={handleChangeAffective}
          handleSave={handleSave}
        />
      )}
      <ToastContainer />
    </>
  )
}

export default Student
