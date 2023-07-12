import React, { KeyboardEvent, useEffect, useRef, useState } from "react"
import { ReactComponent as ArrowDownIcon } from "../../../assets/svg/General/arrowDownIcon.svg"
import { ReactComponent as Cancel } from "../../../assets/svg/Transfer/Cancel.svg"
import SearchBar from "../../Searchbar/SearchBar"
import useClickOutside from "../../../hooks/useClickOutside"

interface LabelDropdownHeadProps {
  size?: "sm" | "md" | "lg"
  noArrow?: boolean
  children: React.ReactNode
  hasInput?: boolean
  isCancel?: boolean
  fitHeight?: boolean
  inputValue: number | string | null
  searchTerm?: string
  placeholder: React.ReactNode
  isDisabled?: boolean
  isSearchable?: boolean
  clickAndClose?: boolean
  searchPlaceholder?: string
  cancelFunc?(): void
  onChangeFunc?: (e: string) => void
  clickOutsideFunc?: () => void
  handleChangeSearchTerm?: (e: string) => void
}

function LabelDropdownHead({
  size = "lg",
  noArrow = false,
  children,
  hasInput = false,
  isCancel = false,
  fitHeight = false,
  isDisabled = false,
  searchTerm = "",
  inputValue,
  placeholder,
  isSearchable = false,
  clickAndClose = false,
  searchPlaceholder = "Search",
  cancelFunc = undefined,
  onChangeFunc = undefined,
  clickOutsideFunc = undefined,
  handleChangeSearchTerm = undefined,
}: LabelDropdownHeadProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [y, setY] = useState<number | null>(null)
  const [value, setValue] = useState<number | string | null>(null)
  const [active, setActive] = useState<boolean>(false)
  const [isHover, setIsHover] = useState<boolean>(false)
  const [hasValue, setHasValue] = useState<boolean>(false)
  const [positionTop, setPositionTop] = useState<boolean>(false)

  const innerHeight = window.innerHeight

  const domNode = useClickOutside(() => {
    setActive(false)
    clickOutsideFunc && clickOutsideFunc()
    handleChangeSearchTerm && handleChangeSearchTerm("")
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

  useEffect(() => {
    setValue(inputValue)
  }, [inputValue])

  useEffect(() => {
    setHasValue(
      !!value &&
        ((typeof value === "string" && value.length > 0) ||
          (typeof value === "number" && value > 0)),
    )
  }, [value])

  const handleKeypress = (event: KeyboardEvent<HTMLDivElement>) => {
    //it triggers by pressing the enter key
    if (event.key === "Enter") {
      setActive((prev) => !prev)
    }
  }
  return (
    <div
      className={
        `relative flex h-full w-full flex-col items-center justify-start ` +
        `${isDisabled ? "pointer-events-none" : ""}`
      }
      id="dropdownDiv"
      ref={domNode}
    >
      <div
        onMouseEnter={() => !isDisabled && setIsHover(true)}
        onMouseLeave={() => !isDisabled && setIsHover(false)}
        className={
          `relative flex w-full items-center space-x-4 rounded-lg bg-white font-normal outline-none ` +
          `px-4 py-3 capitalize transition-all duration-75 focus:outline-none ` +
          `cursor-pointer border border-solid bg-transparent text-left text-base leading-relaxed shadow-none lg:hover:border-blue lg:hover:text-blue lg:focus:border-blue-focused lg:focus:text-blue ` +
          `${size === "lg" ? "h-12" : ""} ` +
          `${size === "md" ? "h-10" : ""} ` +
          `${size === "sm" ? "h-8" : ""} ` +
          `${
            hasValue
              ? "max-w-full justify-between overflow-hidden overflow-ellipsis whitespace-nowrap"
              : "justify-end"
          } ` +
          `${hasValue && active ? "border-blue" : ""} ` +
          `${
            hasValue && !active
              ? "border-black-quin text-black-secondary lg:hover:border-blue lg:hover:text-blue lg:focus:border-blue-focused lg:focus:text-blue"
              : ""
          } ` +
          `${!hasValue && active ? "border-blue text-blue" : ""} ` +
          `${
            !hasValue && !active ? "border-black-quin text-black-tertiary" : ""
          } ` +
          `${isHover ? "lg:text-blue" : ""} `
        }
        tabIndex={isDisabled ? -1 : 0}
        onClick={() => {
          if (hasInput) {
            inputRef?.current?.focus()
          }
          if (isCancel && hasValue) {
            setActive((prev) => prev)
          } else {
            setActive((prev) => !prev)
          }
        }}
        onKeyDown={handleKeypress}
      >
        {!hasInput && value && (
          <span
            className={
              `max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-base text-black-secondary ` +
              `${
                isDisabled
                  ? "pointer-events-none bg-transparent text-black-quat "
                  : ""
              } `
            }
          >
            {value}
          </span>
        )}

        {!noArrow && (
          <span
            className={
              `flex transform items-center justify-end transition-transform duration-150 ` +
              `${active ? "-rotate-180 text-blue" : "rotate-0"} ` +
              `${isDisabled ? "text-black-quat " : ""} `
            }
          >
            <ArrowDownIcon className="h-3.5 w-3.5 stroke-current" />
          </span>
        )}

        {isCancel && hasValue && (
          <div
            className={
              `flex items-center justify-end ` +
              `${active ? "text-blue" : ""} ` +
              `${!active && hasValue ? "text-black-secondary" : ""} ` +
              `${isHover ? "text-blue" : ""} `
            }
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (cancelFunc) {
                cancelFunc()
              }
            }}
          >
            <Cancel className="h-3.5 w-3.5 stroke-current" />
          </div>
        )}
        {hasInput && (
          <input
            id={(placeholder as string) || ""}
            name={(placeholder as string) || ""}
            ref={inputRef}
            type="text"
            value={(inputValue as string) || ""}
            onChange={(e) => {
              onChangeFunc && onChangeFunc(e.target.value)
            }}
            autoComplete="off"
            className={
              `h-10 w-full placeholder-transparent focus:border-none focus:outline-none ` +
              `${
                inputValue && (inputValue as string).length > 0
                  ? "text-black-secondary "
                  : active
                  ? "text-black"
                  : "text-black"
              } ` +
              `${
                isDisabled
                  ? "pointer-events-none bg-transparent text-black-quat "
                  : ""
              } `
            }
            placeholder="john@doe.com"
          />
        )}
      </div>

      {placeholder && (
        <label
          htmlFor="text"
          className={
            `space-x-none pointer-events-none absolute z-10 ml-0 cursor-text duration-75 ease-in-out ` +
            `${
              active || hasValue
                ? "-top-2 left-2.5 bg-white px-1 text-xs"
                : "left-4 top-0 flex items-center justify-center text-base"
            } ` +
            `${!hasValue && size === "lg" ? "h-12" : ""} ` +
            `${!hasValue && size === "md" ? "h-10" : ""} ` +
            `${!hasValue && size === "sm" ? "h-8" : ""} ` +
            `${active ? "text-blue" : ""} ` +
            `${isHover ? "lg:text-blue" : ""} ` +
            `${!active && hasValue ? "text-black-secondary" : ""} ` +
            `${!active && !hasValue ? "text-black-tertiary" : ""} ` +
            `${isDisabled ? "text-black-quat " : ""} `
          }
          onClick={() => inputRef?.current?.focus()}
        >
          {placeholder}
        </label>
      )}

      <div
        className={
          `absolute z-40 h-fit w-full transform cursor-pointer overflow-hidden overflow-y-auto rounded bg-white shadow ` +
          `${
            positionTop
              ? "bottom-full left-0 mb-2 origin-bottom"
              : "left-0 top-full mt-1 origin-top"
          } ` +
          `${
            !active
              ? "pointer-events-none scale-0 opacity-0"
              : "scale-100 opacity-100"
          } ` +
          `${!fitHeight ? "max-h-56 " : ""} `
        }
      >
        {isSearchable && handleChangeSearchTerm && (
          <div className="flex h-14 w-full items-center justify-start px-4">
            <SearchBar
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={handleChangeSearchTerm}
            />
          </div>
        )}
        <div
          className={`w-full`}
          onClick={() => {
            if (clickAndClose) {
              setActive((prev) => !prev)
            }
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default LabelDropdownHead
