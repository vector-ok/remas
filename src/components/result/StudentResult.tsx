import React from "react"

function StudentResult(): JSX.Element {
  return (
    <div>
      <div className="flex justify-center items-center mb-10 w-full">
        <p className="text-3xl">
          {/* Class {selectedClass} - {teacherData.subject} */}
        </p>
      </div>

      {/* <div>
        <div className="relative w-full">
          <select
            defaultValue="Select Class"
            className="w-full p-2.5 text-black-tertiary bg-white border rounded-lg hover:border-blue shadow-sm outline-none appearance-none focus:border-indigo-600"
            // onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="Select Class" disabled>
              Filter Students
            </option>
            <option value="1">All Students</option>
            <option value="2">Students enrolled for subject</option>
            <option value="3">Student NOT enrolled for subject</option>
          </select>
        </div>
      </div> */}

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
                              {/* Offers {teacherData.subject}{" "} */}
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
                        {/* {studentsInCLass.map((student, index: number) => (
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
                              {teacherData.subject in student
                                ? "Yes"
                                : "No"}
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
                                stId?.includes(student.id) ? true : false
                              }
                              func={() => {
                                handleIncludeSubject(student.id)
                              }}
                            >
                              Add to Maths
                            </ButtonComp>
                          </div>
                        </td>
                      </tr>
                    ))} */}
                      </tbody>
                    </table>
                    {/* {!studentsInCLass.length && (
                      <div className="flex h-full w-full flex-col items-center justify-center">
                        <p className="my-2 text-base text-black-tertiary">
                          No data available
                        </p>
                      </div>
                    )} */}
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

export default StudentResult
