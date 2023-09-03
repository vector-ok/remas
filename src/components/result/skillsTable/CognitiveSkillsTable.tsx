import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"

function CognitiveSkillsTable() {
  const studentData = useSelector(
    (state: RootState) => state.settings.studentData,
  )

  return (
    <div className="">
      <p className="text-lg font-medium text-black-secondary text-center">
        Cognitive Skills
      </p>
      <div className="flex h-60 max-h-full w-full  flex-col">
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
                            Subjects
                          </span>
                        </th>
                        <th
                          className=" whitespace-nowrap px-3 text-sm font-medium"
                          scope="col"
                        >
                          <span className="py-3 text-black-tertiary">CA1</span>
                        </th>
                        <th
                          className="whitespace-nowrap px-3 py-3 text-sm font-medium"
                          scope="col"
                        >
                          <span className="text-black-tertiary">CA2</span>
                        </th>
                        <th
                          className="whitespace-nowrap px-3 text-sm font-medium"
                          scope="col"
                        >
                          <span className="text-black-tertiary">Exam </span>
                        </th>

                        <th
                          className="whitespace-nowrap px-3 text-sm font-medium"
                          scope="col"
                        >
                          <span className="text-black-tertiary">Total </span>
                        </th>
                        <th
                          className="whitespace-nowrap px-3 text-sm font-medium"
                          scope="col"
                        >
                          <span className="text-black-tertiary">
                            Class Av.{" "}
                          </span>
                        </th>
                        <th
                          className="whitespace-nowrap px-3 text-sm font-medium"
                          scope="col"
                        >
                          <span className="text-black-tertiary">Grade </span>
                        </th>
                        <th
                          className="whitespace-nowrap px-3 text-sm font-medium"
                          scope="col"
                        >
                          <span className="text-black-tertiary">Position</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.subjects.map((subj, index: number) => (
                        <tr
                          className="te w-screen max-w-full overflow-y-scroll border-b-2 border-grey-secondary pb-20 text-black-secondary"
                          key={index}
                        >
                          <td className="px-3 py-3">
                            <div className="flex flex-col">
                              <span className="text-sm font-normal text-black-secondary">
                                {subj.subject}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex">
                              <span className="text-base text-black-secondary">
                                {subj.ca1}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex flex-col">
                              <span className=" text-base text-black-secondary">
                                {subj.ca2}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex flex-col">
                              <span className=" text-base text-black-secondary">
                                {subj.exam}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex flex-col">
                              <span className=" text-base text-black-secondary">
                                {Number(subj.ca1) +
                                  Number(subj.ca2) +
                                  Number(subj.exam)}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex flex-col">
                              <span className=" text-base text-black-secondary">
                                {subj.classAverage}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex flex-col">
                              <span className=" text-base text-black-secondary">
                                {subj.grade}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex flex-col">
                              <span className=" text-base text-black-secondary">
                                {subj.position}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!studentData.subjects && (
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
  )
}

export default CognitiveSkillsTable
