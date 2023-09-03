import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../General/Inputs/Input"
import ButtonComp from "../../General/Buttons/ButtonComp"
import { studentClass, students } from "../../services/constants"
import { useDispatch, useSelector } from "react-redux"
import {
  addStudentData,
  setSelectedClass,
} from "../../features/settings/settingsSlice"
import { ToastContainer, toast } from "react-toastify"
import { RootState } from "../../app/store"

const initialInputs = {
  class: "5",
  id: "",
}

function ClassSelection() {
  const isStudent = useSelector((state: RootState) => state.settings.isStudent)
  const [inputs, setInputs] = useState(initialInputs)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    isStudent && navigate("/student")
  })

  const handleBack = () => {
    navigate("/teacher")
  }

  const handleChange = (name: string, inputValue: string) => {
    setInputs({ ...inputs, [name]: inputValue })
    dispatch(setSelectedClass(inputValue))
  }

  const handleNext = () => {
    const classSelected = studentClass.find(
      (record) => record.value === inputs.class,
    )
    if (classSelected) {
      toast.success("Class exists!", { theme: "colored" })
      setTimeout(() => {
        navigate("/class")
      }, 1500)
      return
    }
    toast.error("Class does not exist!", { theme: "colored" })
  }

  return (
    <>
      <div className="flex justify-between items-center mb-20 w-full">
        <p className="text-3xl">Class Selection</p>
        <p
          className="text-sm cursor-pointer hover:text-gray-300"
          onClick={handleBack}
        >
          Back
        </p>
      </div>
      <div className="w-50% mx-auto space-y-12 p-10 flex flex-col items-center justify-center h-full">
        <p className="text-xl text-black-secondary">Select Class</p>
        <div className="w-1/2 m-auto space-y-3 mb-10">
          <div className="relative w-full">
            <select
              defaultValue="Select Class"
              className="w-full p-2.5 text-black-tertiary bg-white border rounded-lg hover:border-blue shadow-sm outline-none appearance-none focus:border-indigo-600"
              onChange={(e) => handleChange("class", e.target.value)}
            >
              <option value="Select Class" disabled>
                Select Class
              </option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="7">7</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <ButtonComp buttonType="primary" color={"blue"} func={handleNext}>
            Next
          </ButtonComp>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default ClassSelection

// import React, { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import Input from "../../General/Inputs/Input"
// import ButtonComp from "../../General/Buttons/ButtonComp"
// import { students } from "../../services/constants"
// import { useDispatch, useSelector } from "react-redux"
// import { addStudentData } from "../../features/settings/settingsSlice"
// import { ToastContainer, toast } from "react-toastify"
// import { RootState } from "../../app/store"

// const initialInputs = {
//   class: "5",
//   id: "",
// }

// function ClassSelection() {
//   const isStudent = useSelector((state: RootState) => state.settings.isStudent)
//   const [inputs, setInputs] = useState(initialInputs)

//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   useEffect(() => {
//     isStudent && navigate("/student")
//   })

//   const handleBack = () => {
//     navigate("/teacher")
//   }

//   const handleChange = (name: string, inputValue: string) => {
//     setInputs({ ...inputs, [name]: inputValue })
//   }

//   const handleNext = () => {
//     const student = students.find(
//       (record) => record.class === inputs.class && record.id === inputs.id,
//     )

//     if (student) {
//       toast.success("Record found!", { theme: "colored" })

//       setTimeout(() => {
//         // dispatch()
//         navigate("/student")
//       }, 1500)
//       return dispatch(addStudentData(student))
//     }
//     toast.error("Record not found!", { theme: "colored" })
//   }

//   return (
//     <>
//       <div className="flex justify-between items-center mb-20 w-full">
//         <p className="text-3xl">Student Selection</p>
//         <p
//           className="text-sm cursor-pointer hover:text-gray-300"
//           onClick={handleBack}
//         >
//           Back
//         </p>
//       </div>
//       <div className="w-50% mx-auto space-y-12 p-10 flex flex-col items-center justify-center h-full">
//         <p className="text-xl text-black-secondary">Select Student</p>
//         <div className="w-1/2 m-auto space-y-3 mb-10">
//           <div className="relative w-full">
//             <select
//               defaultValue="Select Class"
//               className="w-full p-2.5 text-black-tertiary bg-white border rounded-lg hover:border-blue shadow-sm outline-none appearance-none focus:border-indigo-600"
//               onChange={(e) => handleChange("class", e.target.value)}
//             >
//               <option value="Select Class" disabled>
//                 Select Class
//               </option>
//               <option value="5">5</option>
//               <option value="4">4</option>
//             </select>
//           </div>
//           <div>
//             <Input
//               placeholder="Student ID"
//               value={inputs.id}
//               onChange={(inputValue) => handleChange("id", inputValue)}
//             />
//           </div>
//         </div>
//         <div className="flex justify-center">
//           <ButtonComp buttonType="primary" color={"blue"} func={handleNext}>
//             Next
//           </ButtonComp>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   )
// }

// export default ClassSelection
