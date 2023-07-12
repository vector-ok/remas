import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../app/store"
import { tabs } from "../../services/constants"
import { setSelectedTab } from "../../features/settings/settingsSlice"

function Tabs(): JSX.Element {
  const selectedTab = useSelector(
    (state: RootState) => state.settings.selectedTab,
  )
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
  const dispatch = useDispatch()

  //   useEffect(() => {
  //     if (selectedTab) {
  //       setActiveTabIndex(selectedTab)
  //     }
  //   }, [activeTabIndex, selectedTab])

  //   console.log("activeTabIndex is ", activeTabIndex)
  //   console.log("activeTabIndex is ", activeTabIndex)

  return (
    <div className="mt-6">
      {tabs.map((data, index) => {
        return (
          <button
            key={index}
            className={`text-sm py-2 mr-4 border-b-2 transition-colors duration-300 ${
              index === activeTabIndex
                ? "border-blue text-black"
                : "border-transparent hover:border-gray-200 text-black-tertiary"
            }`}
            onClick={() => {
              setActiveTabIndex(index)
              dispatch(setSelectedTab(0))
            }}
          >
            {data.name}
          </button>
        )
      })}
      <div className="mt-5 transform transition-all duration-700 ease-in-out scale-100">
        {tabs[activeTabIndex].component}
      </div>
    </div>
  )
}

export default Tabs
