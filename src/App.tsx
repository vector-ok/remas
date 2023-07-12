import Home from "./components/home/Home"
import Teacher from "./components/profiles/teacher/Teacher"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Tabs from "./components/tabs/Tabs"
import Details from "./components/details/Details"
import Registration from "./components/auth/Registration"
import ClassSelection from "./components/details/ClassSelection"
import Student from "./components/profiles/student/Student"

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
