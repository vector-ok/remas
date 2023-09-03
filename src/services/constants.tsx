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
    disableBtn: false,
    subjects: [
      {
        subject: "Biology",
        score: "0",
        ca1: "10",
        ca2: "20",
        exam: "50",
        classAverage: "30.70",
        grade: "C",
        position: "",
      },
      {
        subject: "Physics",
        score: "0",
        ca1: "20",
        ca2: "15",
        exam: "60",
        classAverage: "67.40",
        grade: "A",
        position: "1st",
      },
    ],
    affective: [
      {
        trait: "creativity",
        score: 0,
        questions: {
          ask: 0,
          connections: 0,
          explore: 0,
          reflect: 0,
        },
      },
      {
        trait: "aestheticsAppreciation",
        score: 0,
        questions: {
          focus: 0,
          inspiration: 0,
        },
      },
      {
        trait: "initiative",
        score: 0,
        questions: {
          opinion: 0,
          teaching: 0,
          activities: 0,
          tasks: 0,
        },
      },
      {
        trait: "honesty",
        questions: {
          cheat: 0,
          moralValues: 0,
        },
      },

      {
        trait: "leadership",
        score: 0,
        questions: {
          plan: 0,
          reflect: 0,
          buildTeam: 0,
          decision: 0,
          setGoals: 0,
          timeManagement: 0,
          communication: 0,
          conflictResolution: 0,
          respectDiversity: 0,
          selfBelieve: 0,
        },
      },
    ],
    cognitiveSkills: {
      DividedAttention: "Yes",
      AuditoryProcessing: "Yes",
      VisualProcessing: "Yes",
    },
    affectiveSkills: {
      creativity: {
        ask: 0,
        connections: 0,
        explore: 1,
        reflect: 1,
      },
      aestheticsAppreciation: {
        focus: 0,
        inspiration: 1,
      },
      initiative: {
        communication: 1,
        leadership: 1,
      },
      honesty: {
        cheat: 0,
        moralValues: 0,
      },
      leadership: {
        plan: 1,
        reflect: 0,
        buildTeam: 0,
        decision: 1,
        setGoals: 0,
        timeManagement: 0,
        communication: 0,
        conflictResolution: 0,
        respectDiversity: 1,
        selfBelieve: 1,
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
    disableBtn: false,
    subjects: [
      {
        subject: "Chemistry",
        score: "0",
        ca1: "10",
        ca2: "20",
        exam: "50",
        classAverage: "30.70",
        grade: "C",
        position: "",
      },
      {
        subject: "Economics",
        score: "0",
        ca1: "20",
        ca2: "15",
        exam: "60",
        classAverage: "67.40",
        grade: "A",
        position: "3st",
      },
    ],
    affective: [
      {
        trait: "creativity",
        score: 0,
        questions: {
          ask: 0,
          connections: 0,
          explore: 0,
          reflect: 0,
        },
      },
      {
        trait: "aestheticsAppreciation",
        score: 0,
        questions: {
          focus: 0,
          inspiration: 0,
        },
      },
      {
        trait: "initiative",
        score: 0,
        questions: {
          opinion: 0,
          teaching: 0,
          activities: 0,
          tasks: 0,
        },
      },
      {
        trait: "honesty",
        questions: {
          cheat: 0,
          moralValues: 0,
        },
      },

      {
        trait: "leadership",
        score: 0,
        questions: {
          plan: 1,
          reflect: 0,
          buildTeam: 0,
          decision: 1,
          setGoals: 0,
          timeManagement: 0,
          communication: 0,
          conflictResolution: 0,
          respectDiversity: 0,
          selfBelieve: 0,
        },
      },
    ],
    cognitiveSkills: {
      DividedAttention: "No",
      AuditoryProcessing: "Yes",
      VisualProcessing: "No",
    },
    affectiveSkills: {
      creativity: {
        ask: 0,
        connections: 0,
        explore: 0,
        reflect: 0,
      },
      aestheticsAppreciation: {
        focus: 0,
        inspiration: 0,
      },
      initiative: {
        opinion: 0,
        teaching: 0,
        activities: 0,
        tasks: 0,
      },
      honesty: {
        cheat: 0,
        moralValues: 0,
      },
      leadership: {
        plan: 1,
        reflect: 0,
        buildTeam: 0,
        decision: 1,
        setGoals: 0,
        timeManagement: 0,
        communication: 0,
        conflictResolution: 0,
        respectDiversity: 0,
        selfBelieve: 0,
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
    disableBtn: false,
    subjects: [
      {
        subject: "Chemistry",
        score: "0",
        ca1: "10",
        ca2: "20",
        exam: "50",
        classAverage: "30.70",
        grade: "C",
        position: "",
      },
      {
        subject: "Economics",
        score: "0",
        ca1: "5",
        ca2: "12",
        exam: "30",
        classAverage: "27.40",
        grade: "D",
        position: "11th",
      },
    ],
    affective: [
      {
        trait: "creativity",
        score: 0,
        questions: {
          ask: 0,
          connections: 0,
          explore: 0,
          reflect: 0,
        },
      },
      {
        trait: "aestheticsAppreciation",
        score: 0,
        questions: {
          focus: 0,
          inspiration: 0,
        },
      },
      {
        trait: "initiative",
        score: 0,
        questions: {
          opinion: 0,
          teaching: 0,
          activities: 0,
          tasks: 0,
        },
      },
      {
        trait: "honesty",
        score: 0,
        questions: {
          cheat: 0,
          moralValues: 0,
        },
      },

      {
        trait: "leadership",
        score: 0,
        questions: {
          plan: 0,
          reflect: 0,
          buildTeam: 0,
          decision: 0,
          setGoals: 0,
          timeManagement: 0,
          communication: 0,
          conflictResolution: 0,
          respectDiversity: 0,
          selfBelieve: 0,
        },
      },
    ],
    cognitiveSkills: {
      DividedAttention: 1,
      AuditoryProcessing: 0,
      VisualProcessing: 0,
    },
    affectiveSkills: {
      creativity: {
        ask: 1,
        connections: 1,
        explore: 0,
        reflect: 0,
      },
      aestheticsAppreciation: {
        focus: 0,
        inspiration: 1,
      },
      initiative: {
        communication: 1,
        leadership: 1,
      },
      honesty: {
        cheat: 0,
        moralValues: 0,
      },
      leadership: {
        plan: 1,
        reflect: 0,
        buildTeam: 0,
        decision: 1,
        setGoals: 0,
        timeManagement: 0,
        communication: 0,
        conflictResolution: 0,
        respectDiversity: 0,
        selfBelieve: 0,
      },
    },
    psychometricSkills: {
      numericReasoning: "Yes",
      mechanicalReasoning: "Yes",
      dataChecking: "No",
    },
  },
  {
    id: "003st5",
    name: "Ekpe Ikot Mark",
    password: "3456s",
    class: "5",
    disableBtn: false,
    subjects: [
      {
        subject: "Mathematics",
        score: "0",
        ca1: "10",
        ca2: "18",
        exam: "40",
        classAverage: "30.70",
        grade: "B",
        position: "24th",
      },
      {
        subject: "Physics",
        score: "0",
        ca1: "4",
        ca2: "18",
        exam: "30",
        classAverage: "67.40",
        grade: "C",
        position: "5th",
      },
    ],
    affective: [
      {
        trait: "creativity",
        score: 0,
        questions: {
          ask: 0,
          connections: 0,
          explore: 0,
          reflect: 0,
        },
      },
      {
        trait: "aestheticsAppreciation",
        score: 0,
        questions: {
          focus: 0,
          inspiration: 0,
        },
      },
      {
        trait: "initiative",
        score: 0,
        questions: {
          opinion: 0,
          teaching: 0,
          activities: 0,
          tasks: 0,
        },
      },
      {
        trait: "honesty",
        score: 0,
        questions: {
          cheat: 0,
          moralValues: 0,
        },
      },

      {
        trait: "leadership",
        score: 0,
        questions: {
          plan: 0,
          reflect: 0,
          buildTeam: 0,
          decision: 0,
          setGoals: 0,
          timeManagement: 0,
          communication: 0,
          conflictResolution: 0,
          respectDiversity: 0,
          selfBelieve: 0,
        },
      },
    ],
    cognitiveSkills: {
      DividedAttention: 1,
      AuditoryProcessing: "No",
      VisualProcessing: "Yes",
    },
    affectiveSkills: {
      creativity: {
        ask: 1,
        connections: 1,
        explore: 0,
        reflect: 0,
      },
      aestheticsAppreciation: {
        focus: 0,
        inspiration: 1,
      },
      initiative: {
        communication: 1,
        leadership: 1,
      },
      honesty: {
        cheat: 0,
        moralValues: 0,
      },
      leadership: {
        plan: 1,
        reflect: 0,
        buildTeam: 0,
        decision: 1,
        setGoals: 0,
        timeManagement: 0,
        communication: 1,
        conflictResolution: 0,
        respectDiversity: 0,
        selfBelieve: 0,
      },
    },
    psychometricSkills: {
      numericReasoning: "Yes",
      mechanicalReasoning: "Yes",
      dataChecking: "No",
    },
  },
]
