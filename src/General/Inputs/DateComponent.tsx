import React, { useEffect, useState } from "react"

import { Calendar } from "react-date-range"
import Input from "./Input"
import moment from "moment"
import useClickOutside from "../../hooks/useClickOutside"

interface DateComponentProps {
  date: Date | null
  setDate: React.Dispatch<React.SetStateAction<Date | null>>
  placeholder: string
}
function DateComponent(props: DateComponentProps): JSX.Element {
  const { date, setDate, placeholder } = props
  const [active, setActive] = useState<boolean>(false)
  const [positionTop, setPositionTop] = useState<boolean>(false)
  const [y, setY] = useState<number | null>(null)

  const domNode = useClickOutside(() => {
    setActive(false)
  })

  useEffect(() => {
    if (domNode.current) {
      setY(domNode.current.getBoundingClientRect().top)
    }
  })

  useEffect(() => {
    if (y) {
      const shouldSetPositionTop = y > innerHeight / 1.65
      setPositionTop(shouldSetPositionTop)
    }
  }, [innerHeight, y])

  return (
    <>
      <div
        className="z-2 relative h-12 w-full cursor-pointer "
        ref={domNode}
        onClick={() => setActive(true)}
      >
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full">
          <Input
            type="text"
            placeholder={placeholder}
            name="date"
            value={date ? moment(date).format("YYYY-MM-DD") : undefined}
            readOnly
          />
        </div>
        <div
          className={
            `absolute z-20 w-full max-w-sm rounded-lg border bg-white px-4 2xs:w-max ` +
            `${active ? "block" : "hidden"} ` +
            `${
              positionTop
                ? "bottom-full left-0 mb-2 origin-bottom"
                : "left-0 top-full mt-1 origin-top"
            } `
          }
        >
          <Calendar
            date={date || undefined}
            onChange={(item) => setDate(item)}
          />
        </div>
      </div>
    </>
  )
}

export default DateComponent
