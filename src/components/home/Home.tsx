import { useSelector } from "react-redux"
import "react-toastify/dist/ReactToastify.css"
import { RootState } from "../../app/store"
import Login from "../auth/Login"
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
