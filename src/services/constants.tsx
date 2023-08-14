export const loginType = [
  { value: "Admin", text: "Admin" },
  { value: "Teacher", text: "Teacher" },
  { value: "Student", text: "Student" },
]

export const teacherSubject = [
  { value: "English", text: "English" },
  { value: "Mathematics", text: "Mathematics" },
  { value: "Physics", text: "Physics" },
  { value: "Chemistry", text: "Chemistry" },
]

export const studentDepartment = [
  { value: "Microbiology", text: "Microbiology" },
  { value: "Computer SCience", text: "Computer SCience" },
]

export const studentClass = [
  { value: "6", text: "6" },
  { value: "5", text: "5" },
  { value: "4", text: "4" },
  { value: "3", text: "3" },
]

export const teachers = [
  {
    id: "001te",
    name: "Dr. Tea",
    password: "1234",
    subject: "Mathematics",
    dob: "16/04/1980",
    phoneNumber: "09061255411",
  },
  {
    id: "002te",
    name: "Prof Las Lagbaja",
    password: "2345",
    subject: "Physics",
    dob: "07/09/1960",
    phoneNumber: "08031234567",
  },
  {
    id: "003te",
    name: "Miss Brains",
    password: "3456",
    subject: "English",
    dob: "23/10/1990",
    phoneNumber: "07061234567",
  },
]

export const students = [
  {
    id: "001st4",
    name: "Ekpeikot Kanaden",
    password: "1234s",
    class: "4",
    cognitiveSkills: {
      DividedAttention: "Yes",
      AuditoryProcessing: "Yes",
      VisualProcessing: "Yes",
    },
    affectiveSkills: {
      creativity: {
        ask: "No",
        connections: "No",
        explore: "Yes",
        reflect: "Yes",
      },
      aestheticsAppreciation: {
        focus: "No",
        inspiration: "Yes",
      },
      initiative: {
        communication: "Yes",
        leadership: "Yes",
      },
    },
    psychometricSkills: {
      numericReasoning: "No",
      mechanicalReasoning: "Yes",
      dataChecking: "Yes",
    },
  },
  {
    id: "001st5",
    name: "Ita Enang",
    password: "1234s",
    class: "5",
    cognitiveSkills: {
      DividedAttention: "No",
      AuditoryProcessing: "Yes",
      VisualProcessing: "No",
    },
    affectiveSkills: {
      creativity: {
        ask: "Yes",
        connections: "No",
        explore: "No",
        reflect: "Np",
      },
      aestheticsAppreciation: {
        focus: "Yes",
        inspiration: "No",
      },
      initiative: {
        communication: "Yes",
        leadership: "No",
      },
    },
    psychometricSkills: {
      numericReasoning: "No",
      mechanicalReasoning: "Yes",
      dataChecking: "Yes",
    },
  },
  {
    id: "002st5",
    name: "Adia-Okuk Essien",
    password: "2345s",
    class: "5",
    cognitiveSkills: {
      DividedAttention: "Yes",
      AuditoryProcessing: "No",
      VisualProcessing: "Yes",
    },
    affectiveSkills: {
      creativity: {
        ask: "Yes",
        connections: "Yes",
        explore: "No",
        reflect: "Np",
      },
      aestheticsAppreciation: {
        focus: "No",
        inspiration: "Yes",
      },
      initiative: {
        communication: "Yes",
        leadership: "Yes",
      },
    },
    psychometricSkills: {
      numericReasoning: "Yes",
      mechanicalReasoning: "Yes",
      dataChecking: "No",
    },
  },
]
