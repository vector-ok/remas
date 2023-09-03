import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"

type UpdataedArrayType = {
  trait: string
  score: number
  grade: string
}
const initialScores = {
  creativityScore: 0,
  aestheticsAppreciationScore: 0,
  initiativeSCore: 0,
  honestyScore: 0,
  leadershipScore: 0,
}

function PsychometricSkillsTable(): JSX.Element {
  const studentData = useSelector(
    (state: RootState) => state.settings.studentData,
  )

  const [scores, setScores] = useState(initialScores)
  const [affectiveScores, setAffectiveScores] = useState<UpdataedArrayType[]>()

  useEffect(() => {
    const updateArray: UpdataedArrayType[] = [
      {
        trait: "Punctuality",
        score: 0.5,
        grade: "C",
      },
      {
        trait: "Accuracy",
        score: 0.7,
        grade: "A",
      },
      {
        trait: "Sports & Games",
        score: 0.4,
        grade: "D",
      },
      {
        trait: "Drawing",
        score: 0.6,
        grade: "B",
      },
      {
        trait: "Painting",
        score: 0.67,
        grade: "B",
      },
    ]
    setAffectiveScores(updateArray)
  }, [scores])

  useEffect(() => {
    if (studentData && studentData?.affectiveSkills?.creativity) {
      const obj = Object.values(studentData?.affectiveSkills?.creativity)
      const creativityLength = obj.length
      const sum = obj.reduce((acc, total) => {
        return acc + total
      }, 0)
      const average = sum / creativityLength
      setScores((prev) => ({ ...prev, creativityScore: average }))
    }
  }, [studentData.affectiveSkills?.creativity])

  useEffect(() => {
    if (studentData && studentData?.affectiveSkills?.aestheticsAppreciation) {
      const obj = Object.values(
        studentData?.affectiveSkills?.aestheticsAppreciation,
      )
      const objLength = obj.length
      const sum = obj.reduce((acc, total) => {
        return acc + total
      }, 0)
      const average = sum / objLength
      setScores((prev) => ({ ...prev, aestheticsAppreciationScore: average }))
    }
  }, [studentData.affectiveSkills?.aestheticsAppreciation])

  useEffect(() => {
    if (studentData && studentData?.affectiveSkills?.initiative) {
      const obj = Object.values(studentData?.affectiveSkills?.initiative)
      const objLength = obj.length
      const sum = obj.reduce((acc, total) => {
        return acc + total
      }, 0)
      const average = sum / objLength
      setScores((prev) => ({ ...prev, initiativeSCore: average }))
    }
  }, [studentData.affectiveSkills?.initiative])

  useEffect(() => {
    if (studentData && studentData?.affectiveSkills?.honesty) {
      const obj = Object.values(studentData?.affectiveSkills?.honesty)
      const objLength = obj.length
      const sum = obj.reduce((acc, total) => {
        return acc + total
      }, 0)
      const average = sum / objLength
      setScores((prev) => ({ ...prev, honestyScore: average }))
    }
  }, [studentData.affectiveSkills?.honesty])

  useEffect(() => {
    if (studentData && studentData?.affectiveSkills?.leadership) {
      const obj = Object.values(studentData?.affectiveSkills?.leadership)
      const objLength = obj.length
      const sum = obj.reduce((acc, total) => {
        return acc + total
      }, 0)
      const average = sum / objLength
      setScores((prev) => ({ ...prev, leadershipScore: average }))
    }
  }, [studentData.affectiveSkills?.leadership])

  return (
    <div className="border-grey-backdrop border rounded-lg w-1/3">
      <p className="text-lg font-medium text-center text-black-secondary pt-2">
        Psychometric Skills
      </p>
      <div className="flex h-72 max-h-full w-full flex-col">
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
                            Traits
                          </span>
                        </th>
                        <th
                          className=" whitespace-nowrap px-3 text-sm font-medium"
                          scope="col"
                        >
                          <span className="py-3 text-black-tertiary">
                            Ratings
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {affectiveScores?.map(
                        (
                          traits: {
                            trait:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<
                                  any,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | null
                              | undefined
                            score:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<
                                  any,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | null
                              | undefined
                            grade: string
                          },
                          index: number,
                        ) => (
                          <tr
                            className="te w-screen max-w-full overflow-y-scroll border-b-2 border-grey-secondary pb-20 text-black-secondary"
                            key={index}
                          >
                            <td className="px-3 py-3">
                              <div className="flex flex-col">
                                <span className="text-sm font-normal text-black-secondary">
                                  {traits.trait}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex">
                                <span className="text-base text-black-secondary">
                                  {/* {traits.score && traits?.score > Number(0.8)
                                    ? "A"
                                    : traits?.trait >= 0.6
                                    ? "B"
                                    : "C"} */}
                                  {traits.grade}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                  {!studentData.affective && (
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

export default PsychometricSkillsTable
