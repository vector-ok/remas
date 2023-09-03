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
  selectedClass: string
  // studentSubject: StudentSubjectType[]
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
  disableBtn?: boolean
  subjects: StudentSubjectType[]
  affective: AffectiveType[]

  cognitiveSkills?: {
    DividedAttention?: string
    AuditoryProcessing?: string
    VisualProcessing?: string
  }
  affectiveSkills?: {
    creativity?: {
      ask?: number
      connections?: number
      explore?: number
      reflect?: number
    }
    aestheticsAppreciation?: {
      focus?: number
      inspiration?: number
    }
    initiative?: {
      communication?: number
      leadership?: number
    }
    honesty?: {
      cheat?: number
      moralValues?: number
    }
    leadership?: {
      plan?: number
      reflect?: number
      buildTeam?: number
      decision?: number
      setGoals?: number
      timeManagement?: number
      communication?: number
      conflictResolution?: number
      respectDiversity?: number
      selfBelieve?: number
    }
  }
  psychometricSkills?: {
    numericReasoning?: string
    mechanicalReasoning?: string
    dataChecking?: string
  }
}

export type StudentSubjectType = {
  studentId?: string
  subject: string
  score: string
  ca1?: string
  ca2?: string
  exam?: string
  classAverage?: string
  grade?: string
  position?: string
}

export type AffectiveType = {
  trait: string
  score: number
  questions: {
    [key: string]: number
  }
}
