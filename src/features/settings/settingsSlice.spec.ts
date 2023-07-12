import settingsReducer, {
  increment,
  decrement,
  incrementByAmount,
} from "./settingsSlice"
import { SettingsState } from "./settingsSliceType"

describe("counter reducer", () => {
  const initialState: SettingsState = {
    value: 3,
    status: "idle",
    isTeacher: false,
    selectedTab: 0,
  }
  it("should handle initial state", () => {
    expect(settingsReducer(undefined, { type: "unknown" })).toEqual({
      value: 0,
      status: "idle",
    })
  })

  it("should handle increment", () => {
    const actual = settingsReducer(initialState, increment())
    expect(actual.value).toEqual(4)
  })

  it("should handle decrement", () => {
    const actual = settingsReducer(initialState, decrement())
    expect(actual.value).toEqual(2)
  })

  it("should handle incrementByAmount", () => {
    const actual = settingsReducer(initialState, incrementByAmount(2))
    expect(actual.value).toEqual(5)
  })
})
