import { ExcludeProps, InputPropsToExclude } from "./types"
import React, {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"

import useClickOutside from "../../hooks/useClickOutside"

// use to generate a unique id for the input
let inputCounter = 0

function IconContainer({
  show,
  children,
  className,
}: {
  show: boolean
  children: React.ReactNode
  className?: string
}): JSX.Element {
  return (
    <div
      className={
        "flex cursor-default items-center justify-end text-black-secondary transition-all duration-75 ease-in-out " +
        `${show ? "opacity-100" : "opacity-0"} ` +
        `${className || ""}`
      }
    >
      {children}
    </div>
  )
}

interface InputProps
  extends ExcludeProps<
    InputHTMLAttributes<HTMLInputElement>,
    InputPropsToExclude
  > {
  // interface InputProps {
  placeholder?: ReactNode
  inputPlaceHolder?: string
  value?: string | number | undefined
  type?: string
  icon?: ReactNode
  inputSize?: "sm" | "md" | "lg"
  appendIcon?: ReactNode
  appendOuterIcon?: ReactNode
  iconType?: string
  onChange?(value: string): void
  isFocused?: boolean
  isLoading?: boolean
  alwaysActive?: boolean
  isDisabled?: boolean
  fullWidth?: boolean
  readOnly?: boolean
  readOnlyInput?: boolean
  helperText?: React.ReactNode
  mobileHelperText?: boolean
}
function Input({
  placeholder,
  inputPlaceHolder,
  value,
  type,
  icon,
  appendIcon,
  appendOuterIcon,
  iconType,
  onChange,
  isFocused,
  isLoading,
  inputSize = "lg",
  alwaysActive = false,
  isDisabled = false,
  fullWidth = false,
  readOnly = false,
  readOnlyInput = false,
  helperText = "",
  mobileHelperText = false,
  ...otherProps
}: InputProps): JSX.Element {
  const [active, setActive] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const [uniqueId, setUniqueId] = useState<string>("")
  const inputRef = useRef<HTMLInputElement | null>(null)

  const domNode = useClickOutside(() => setActive(false))

  useEffect(() => {
    setUniqueId(`input-${++inputCounter}`)
  }, [])

  useEffect(() => {
    if (isFocused) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
      setActive(true)
    }
  }, [isFocused])

  useEffect(() => {
    setHasValue(!!value && String(value).length > 0)
  }, [value])

  return (
    <div
      className={
        "relative flex w-full flex-col items-center " +
        (fullWidth ? "w-full" : "")
      }
    >
      <div
        className={
          `relative flex h-full w-full flex-col items-center justify-start ` +
          `${isDisabled ? "pointer-events-none" : ""} ` +
          `${readOnly ? "pointer-events-none" : ""} ` +
          `${!(readOnly && isDisabled) ? "cursor-text" : ""}`
        }
        ref={domNode}
      >
        <div
          onFocus={() => {
            if (readOnlyInput) {
              return
            }
            if (inputRef.current) {
              inputRef.current.focus()
            }
            setActive(true)
          }}
          onBlur={() => {
            if (readOnlyInput) {
              return
            }
            setActive(false)
          }}
          className={
            `relative flex w-full items-center justify-between whitespace-nowrap rounded-lg border border-solid bg-white text-left text-base font-normal leading-relaxed shadow-none outline-none transition-all duration-150 hover:text-blue focus:border-blue-focused focus:text-blue focus:outline-none lg:hover:border-blue ` +
            `${
              hasValue || alwaysActive
                ? !active
                  ? "border-black-quin text-black-secondary hover:text-blue lg:hover:border-blue "
                  : active
                  ? "border-blue"
                  : "border-black-quin text-black-tertiary hover:text-blue focus:border-blue-focused focus:text-blue lg:hover:border-blue "
                : active
                ? "border-blue text-blue"
                : "border-black-quin text-black-tertiary focus:border-blue-focused focus:text-blue "
            } ` +
            `${inputSize === "lg" ? "h-12" : ""} ` +
            `${inputSize === "md" ? "h-10" : ""} ` +
            `${inputSize === "sm" ? "h-8" : ""} ` +
            `${isLoading ? "pointer-events-none" : ""} ` +
            `${icon ? "px-4" : ""}`
          }
          onClick={() => {
            if (readOnlyInput) {
              return
            }
            if (inputRef.current) {
              inputRef.current.focus()
            }
            setActive(true)
          }}
          onMouseEnter={() => !isDisabled && !readOnlyInput && setIsHover(true)}
          onMouseLeave={() =>
            !isDisabled && !readOnlyInput && setIsHover(false)
          }
          ref={domNode}
        >
          {icon && (
            <span
              className={
                `flex cursor-default items-center justify-end text-black-secondary transition-all duration-75 ease-in-out ` +
                `${
                  active || alwaysActive || hasValue
                    ? "opacity-100"
                    : "opacity-0"
                }`
              }
            >
              {icon}
            </span>
          )}
          <input
            ref={inputRef}
            type={type ? type : "text"}
            value={value || ""}
            onChange={(e) => onChange && onChange(e.target.value)}
            className={
              `z-10 h-full w-full rounded-lg bg-white py-3  focus:border-none focus:outline-none ` +
              `${
                alwaysActive || hasValue ? "text-black-secondary" : "text-black"
              } ` +
              `${isDisabled ? "bg-transparent text-black-quat " : ""} ` +
              `${
                inputPlaceHolder
                  ? "placeholder-black-quat "
                  : "placeholder-transparent"
              } ` +
              `${!icon ? "px-4" : ""}`
            }
            placeholder={inputPlaceHolder || undefined}
            id={otherProps.id || uniqueId}
            disabled={readOnlyInput || readOnly || isDisabled}
            tabIndex={readOnlyInput || readOnly || isDisabled ? -1 : 0}
            {...otherProps}
          />
          {iconType === "percentage" ? (
            <span
              className={` flex cursor-default items-center justify-start pr-4 transition-all duration-75 ease-in-out ${
                active || alwaysActive || hasValue ? "opacity-100" : "opacity-0"
              }`}
            >
              <PercentageIcon className="h-3.5 w-3.5 fill-current" />
            </span>
          ) : (
            appendIcon && (
              <IconContainer show={active || alwaysActive || hasValue}>
                {appendIcon}
              </IconContainer>
            )
          )}
          {appendOuterIcon && (
            <span className="px-3">
              <IconContainer
                show
                className={`${
                  hasValue || alwaysActive
                    ? !active
                      ? "text-black-secondary hover:text-blue "
                      : active
                      ? ""
                      : "text-black-tertiary hover:text-blue "
                    : active
                    ? "text-blue"
                    : "text-black-tertiary"
                } `}
              >
                {appendOuterIcon}
              </IconContainer>
            </span>
          )}
          {placeholder && (
            <label
              // htmlFor={otherProps.id || uniqueId}
              // className={`z-10 absolute  ease-in-out duration-150 h-2 space-x-none pointer-events-none ${
              // active || alwaysActive || hasValue
              // ? "left-2.5 -top-2 text-xs bg-white px-1 "
              // : "left-4 top-0 text-base h-full flex justify-center items-center "
              // } ${active ? "text-blue" : alwaysActive || hasValue ? "text-black-tertiary " : "text-black-tertiary "}  ${
              // isHover ? "text-blue" : ""
              // }`}
              htmlFor={otherProps.id || uniqueId}
              className={
                "absolute z-10 !ml-0 cursor-text duration-150 ease-in-out " +
                `${
                  active || alwaysActive || hasValue
                    ? " -top-2 left-2.5 h-2 bg-white px-1 text-xs"
                    : " left-4 top-0 flex items-center justify-center text-base"
                } ` +
                `${active ? "text-blue" : ""} ` +
                `${isHover ? "lg:text-blue" : ""} ` +
                `${
                  !active && (alwaysActive || hasValue)
                    ? "text-black-secondary"
                    : ""
                } ` +
                `${
                  !active && !(alwaysActive || hasValue)
                    ? "h-full text-black-tertiary"
                    : ""
                } ` +
                `${isDisabled ? "text-black-quat " : ""} `
              }
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.focus()
                }
              }}
            >
              {placeholder}
            </label>
          )}
        </div>
      </div>
      {helperText && (
        <span
          className={
            `w-full pt-2 text-left text-xs leading-4 text-black-tertiary ` +
            `${mobileHelperText ? "lg:hidden" : ""} ` +
            `${!mobileHelperText ? "" : ""} ` +
            `${isDisabled ? "text-black-quat " : ""} `
          }
          // data-type={dataType}
        >
          {helperText}
        </span>
      )}
    </div>
  )
}

export default Input
