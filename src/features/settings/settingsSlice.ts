import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { fetchCount } from "./settingsAPI"
import { SettingsState, StudentType, TeacherType } from "./settingsSliceType"
import { students, teachers } from "../../services/constants"

const initialState: SettingsState = {
  value: 0,
  status: "idle",
  isTeacher: false,
  isStudent: false,
  isEditResult: false,
  selectedTab: 0,
  isEditTeacher: false,
  isEditStudent: false,
  isRegister: false,
  isLoggedIn: false,
  teacherData: {
    id: "",
    name: "",
    password: "",
    subject: "",
    dob: "",
    phoneNumber: "",
  },
  teacherDataArray: [...teachers],
  studentData: {
    id: "",
    name: "",
    password: "",
    class: "",
    cognitiveSkills: {
      DividedAttention: "",
      AuditoryProcessing: "",
      VisualProcessing: "",
    },
    affectiveSkills: {
      creativity: {
        ask: "",
        connections: "",
        explore: "",
        reflect: "",
      },
      aestheticsAppreciation: {
        focus: "",
        inspiration: "",
      },
      initiative: {
        communication: "",
        leadership: "",
      },
      feelings: "",
      appreciation: "",
      motivation: "",
    },
    psychometricSkills: {
      numericReasoning: "",
      mechanicalReasoning: "",
      dataChecking: "",
    },
  },
  studentDataArray: [...students],
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    isEditResultTrue: (state: SettingsState) => {
      state.isEditResult = true
    },
    isEditResultFalse: (state: SettingsState) => {
      state.isEditResult = false
    },

    isLoggedInTrue: (state: SettingsState) => {
      state.isLoggedIn = true
    },
    isLoggedInFalse: (state: SettingsState) => {
      state.isLoggedIn = false
    },
    isRegisterTrue: (state: SettingsState) => {
      state.isRegister = true
    },
    isRegisterFalse: (state: SettingsState) => {
      state.isRegister = false
    },
    isEditTeacherTrue: (state: SettingsState) => {
      state.isEditTeacher = true
    },
    isEditTeacherFalse: (state: SettingsState) => {
      state.isEditTeacher = false
    },
    isEditStudentTrue: (state: SettingsState) => {
      state.isEditStudent = true
    },
    isEditStudentFalse: (state: SettingsState) => {
      state.isEditStudent = false
    },
    isTeacherTrue: (state) => {
      state.isTeacher = true
    },
    isTeacherFalse: (state) => {
      state.isTeacher = false
    },
    isStudentTrue: (state) => {
      state.isStudent = true
    },
    isStudentFalse: (state) => {
      state.isStudent = false
    },
    setSelectedTab: (state: SettingsState, action: PayloadAction<number>) => {
      state.selectedTab = action.payload
    },
    addTeacherData: (
      state: SettingsState,
      action: PayloadAction<TeacherType>,
    ) => {
      state.teacherData = action.payload
    },
    addTeacherDataArray: (
      state: SettingsState,
      action: PayloadAction<TeacherType>,
    ) => {
      state.teacherDataArray.push(action.payload)
    },
    editTeacherData: (
      state: SettingsState,
      action: PayloadAction<TeacherType>,
    ) => {
      state.teacherDataArray.map((teacher: any) => {
        if (teacher.id === state.teacherData.id) {
          teacher.name = action.payload.name
          teacher.password = action.payload.password
          teacher.subject = action.payload.subject
          teacher.dob = action.payload.dob
          teacher.phoneNumber = action.payload.phoneNumber
        }
        return teacher
      })
    },
    addStudentData: (
      state: SettingsState,
      action: PayloadAction<StudentType>,
    ) => {
      state.studentData = action.payload
    },
    addStudentDataArray: (
      state: SettingsState,
      action: PayloadAction<StudentType>,
    ) => {
      state.studentDataArray.push(action.payload)
    },
    editStudentData: (
      state: SettingsState,
      action: PayloadAction<StudentType>,
    ) => {
      state.studentDataArray.map((student: StudentType) => {
        if (student.id === state.studentData.id) {
          student = action.payload
        }
        return student
      })
    },

    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.value += action.payload
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const {
  isLoggedInTrue,
  isLoggedInFalse,
  isRegisterTrue,
  isRegisterFalse,
  increment,
  decrement,
  incrementByAmount,
  isTeacherTrue,
  isTeacherFalse,
  isStudentTrue,
  isStudentFalse,
  setSelectedTab,
  addTeacherData,
  editTeacherData,
  addTeacherDataArray,
  isEditTeacherTrue,
  isEditTeacherFalse,
  isEditStudentTrue,
  isEditStudentFalse,
  addStudentData,
  addStudentDataArray,
  editStudentData,
  isEditResultTrue,
  isEditResultFalse,
} = settingsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.settings.value

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState())
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount))
    }
  }

export default settingsSlice.reducer
