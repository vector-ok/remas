export interface SettingsState {
  value: number
  status: "idle" | "loading" | "failed"
  isTeacher: boolean
  isStudent: boolean
  selectedTab: number
  teacherData: TeacherType
  teacherDataArray: TeacherType[]
  isEditTeacher: boolean
  isEditStudent: boolean
  isRegister: boolean
  isLoggedIn: boolean
  studentData: StudentType
  studentDataArray: StudentType[]
  isEditResult: boolean
}

export type TeacherType = {
  id?: string
  name: string
  password?: string
  subject: string
  dob?: string
  phoneNumber: string
  image?: string
  title?: string
  description?: string
}

export type StudentType = {
  id: string
  name: string
  password: string
  class: string
  cognitiveSkills?: {
    DividedAttention?: string
    AuditoryProcessing?: string
    VisualProcessing?: string
  }
  affectiveSkills?: {
    feelings?: string
    appreciation?: string
    motivation?: string
  }
  psychometricSkills?: {
    numericReasoning?: string
    mechanicalReasoning?: string
    dataChecking?: string
  }
}
