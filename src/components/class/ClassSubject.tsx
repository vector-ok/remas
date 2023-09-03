import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { StudentType } from "../../features/settings/settingsSliceType"
import ButtonComp from "../../General/Buttons/ButtonComp"
import {
  addStudentData,
  addStudentSubject,
} from "../../features/settings/settingsSlice"
import { useNavigate } from "react-router-dom"

let stIdArray: string[] = []
function ClassSubject() {
  const selectedClass = useSelector(
    (state: RootState) => state.settings.selectedClass,
  )
  const teacherData = useSelector(
    (state: RootState) => state.settings.teacherData,
  )
  const studentDataArray = useSelector(
    (state: RootState) => state.settings.studentDataArray,
  )

  const [studentsInCLass, setStudentsInClass] =
    useState<StudentType[]>(studentDataArray)
  const [disableBtn, setDisableBtn] = useState([...studentDataArray])
  const [disableId, setDisableId] = useState("")
  const [stId, setStId] = useState<string[] | null>()
  // const [selectedId, setSelectedId] = useState<string[] | null>()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const classData = studentDataArray.filter((student: { class: any }) => {
      return student.class === selectedClass
    })
    setStudentsInClass(() =>
      studentDataArray.filter((student: { class: any }, index: any) => {
        return student.class === selectedClass
      }),
    )
  }, [selectedClass])

  useEffect(() => {
    setDisableBtn(studentDataArray)
  }, [studentDataArray])

  useEffect(() => {
    stIdArray.length && setStId(stIdArray)
  }, [stId])

  const handleAddSubject = (
    event: React.MouseEvent<Element, MouseEvent>,
    studentId: string,
  ) => {
    event.stopPropagation()
    setDisableId(studentId)
    stIdArray.push(studentId)
    setStId(stIdArray)

    const data = {
      studentId,
      subject: teacherData.subject,
      score: "1",
    }
    dispatch(addStudentSubject(data))
  }

  const handleFilter = (_value: string) => {
    const studentsInSelectedClass = studentDataArray.filter(
      (student: StudentType) => {
        return student.class === selectedClass
      },
    )

    if (_value === "2") {
      const studentsOfferingSubject = studentsInSelectedClass.filter(
        (student: { subjects: any[] }) => {
          return student.subjects.find(
            (subject: { subject: any }) =>
              subject.subject === teacherData.subject,
          )
        },
      )
      return setStudentsInClass(studentsOfferingSubject)
    }
    if (_value === "3") {
      const studentsEnrolledinSubject = studentsInSelectedClass.filter(
        (student) => {
          return !student.subjects.some(
            (subject) => subject.subject === teacherData.subject,
          )
        },
      )
      return setStudentsInClass(studentsEnrolledinSubject)
    }

    return setStudentsInClass(studentsInSelectedClass)
  }

  const handleSelectedStudent = (_studentId: StudentType, index: number) => {
    const student: StudentType | undefined = studentDataArray.find(
      (record) => record.class === selectedClass && record.id === _studentId.id,
    )

    dispatch(addStudentData(_studentId))

    navigate("/student")
    // navigate("/student-result")

    // if (student) {
    //   toast.success("Record found!", { theme: "colored" })

    //   setTimeout(() => {
    //     // dispatch()
    //     navigate("/student")
    //   }, 1500)
    //   return dispatch(addStudentData(student))
    // }
    // toast.error("Record not found!", { theme: "colored" })
  }

  console.log("teacherData.subject is ", teacherData.subject)

  // console.log("studentsInCLass is ", studentsInCLass.some((students) => students.subjects.filter((subj, index) => subj.subject)))

  return (
    <div>
      <div className="flex justify-center items-center mb-10 w-full">
        <p className="text-3xl">Class {selectedClass}</p>
      </div>
      <div>
        <div className="relative w-full">
          <select
            defaultValue="Select Class"
            className="w-full p-2.5 text-black-tertiary bg-white border rounded-lg hover:border-blue shadow-sm outline-none appearance-none focus:border-indigo-600"
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="Select Class" disabled>
              Filter Students
            </option>
            <option value="1">All Students</option>
            <option value="2">Students enrolled for subject</option>
            <option value="3">Students NOT enrolled for subject</option>
          </select>
        </div>
      </div>
      <div>
        <div className="flex h-116 max-h-full w-full  flex-col">
          <div className="flex h-full w-full flex-col items-center justify-start pb-8">
            <div className="relative flex h-full w-full flex-1 flex-shrink flex-grow">
              <div className="relative mt-5 flex h-full w-full flex-1">
                <div className="absolute flex h-full max-h-full w-full flex-1 overflow-auto rounded-lg pb-8">
                  <div className="left-0 top-0 h-full w-full">
                    <table className="tableT w-full">
                      <thead className="tableheader relative z-10 overflow-x-scroll rounded-bl-2xl border-grey-backdrop text-left text-sm">
                        <tr className="relative overflow-hidden">
                          <th
                            className="whitespace-nowrap px-3 text-sm font-medium  "
                            scope="col"
                          >
                            <span className="py-3  text-black-tertiary">
                              Name
                            </span>
                          </th>
                          <th
                            className=" whitespace-nowrap px-3 text-sm font-medium"
                            scope="col"
                          >
                            <span className="py-3 text-black-tertiary">id</span>
                          </th>
                          <th
                            className="whitespace-nowrap px-3 py-3 text-sm font-medium"
                            scope="col"
                          >
                            <span className="text-black-tertiary">
                              Offers {teacherData.subject}
                            </span>
                          </th>
                          <th
                            className="whitespace-nowrap px-3 text-sm font-medium"
                            scope="col"
                          >
                            <span className="text-black-tertiary"> </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentsInCLass.map((student, index: number) => (
                          <tr
                            className="te w-screen max-w-full cursor-pointer overflow-y-scroll border-b-2 border-grey-secondary pb-20 text-black-secondary"
                            key={index}
                            onClick={() =>
                              handleSelectedStudent(student, index)
                            }
                          >
                            <td className="px-3 py-3">
                              <div className="flex flex-col">
                                <span className="text-sm font-normal text-black-secondary">
                                  {student.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex">
                                <span className="text-base text-black-secondary">
                                  {student.id}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex flex-col">
                                <span className=" text-base text-black-secondary">
                                  {student.subjects.some(
                                    (subj) =>
                                      subj.subject === teacherData.subject,
                                  )
                                    ? "yes"
                                    : "No"}
                                  {/* {stId?.includes(student.id) ? "Yes" : "No"} */}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              <div
                                className={`${studentDataArray[
                                  index
                                ].subjects.some(
                                  (subj: { subject: any }) =>
                                    subj.subject === teacherData.subject,
                                )} "flex flex-col"`}
                              >
                                <ButtonComp
                                  id={student.id}
                                  buttonType="secondary"
                                  size="sm"
                                  color={"blue"}
                                  disable={
                                    // stId?.includes(student.id) ? true : false
                                    student.subjects.some(
                                      (subj) =>
                                        subj.subject === teacherData.subject,
                                    )
                                  }
                                  func={(event) => {
                                    handleAddSubject(event, student.id)
                                  }}
                                >
                                  Add
                                </ButtonComp>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {!studentsInCLass.length && (
                      <div className="flex h-full w-full flex-col items-center justify-center">
                        <p className="my-2 text-base text-black-tertiary">
                          No data available
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassSubject
