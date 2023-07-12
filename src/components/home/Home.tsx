import React, { useState } from "react"
import Input from "../../General/Inputs/Input"
import CustomSelect from "../../General/Dropdown/CustomSelect"
import { loginType, teachers } from "../../services/constants"
import ButtonComp from "../../General/Buttons/ButtonComp"
import { useDispatch, useSelector } from "react-redux"
import {
  isTeacherFalse,
  isTeacherTrue,
} from "../../features/settings/settingsSlice"
import { useAppDispatch } from "../../app/hooks"
import MessageToasts from "../../General/MessageToasts/MessageToasts"
import { SUCCESS } from "../../helpers/AppConstants"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import Login from "../auth/Login"
import Tabs from "../tabs/Tabs"
import { RootState } from "../../app/store"
import Registration from "../auth/Registration"

function Home(): JSX.Element {
  const isRegister = useSelector(
    (state: RootState) => state.settings.isRegister,
  )

  return (
    <div className="space-y-10">
      <div className="flex flex-col justify-center items-center">
        <p className="text-9xl">REMAS</p>
        <p className="text-gray-500 text-sm">Result Management System</p>
      </div>
      <div>{isRegister ? <Registration /> : <Login />}</div>
    </div>
  )
}

export default Home
