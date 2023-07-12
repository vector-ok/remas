import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Registration from "./components/auth/Registration"
import ClassSelection from "./components/details/ClassSelection"
import Details from "./components/details/Details"
import Home from "./components/home/Home"
import Student from "./components/profiles/student/Student"
import Teacher from "./components/profiles/teacher/Teacher"

function App(): JSX.Element {
  return (
    <div className="m-10">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/student" element={<Student />} />
          <Route path="/details" element={<Details />} />
          <Route path="/selection" element={<ClassSelection />} />
          <Route path="registration" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
