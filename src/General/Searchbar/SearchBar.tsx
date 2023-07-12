import { ChangeEvent, useState } from "react"

// import { ReactComponent as CancelRuleIcon } from "../../assets/svg/TeamMember/cancelRuleIcon.svg"
// import { ReactComponent as SearchIcon } from "../../assets/svg/DashboardLayout/SearchBar/searchIcon.svg"
import useClickOutside from "../../hooks/useClickOutside"
import useElementFocus from "../../hooks/useElementFocus"

interface SearchBarProps {
  value: string
  children?: React.ReactNode
  placeholder?: string
  dropdownUsage?: boolean

  onChange: (newValue: string) => void
}

function SearchBar({
  value,
  onChange,
  children = undefined,
  placeholder = "",
  dropdownUsage = false,
}: SearchBarProps): JSX.Element {
  const [active, setActive] = useState(false)

  const domNode = useClickOutside(() => {
    setActive(false)
  })

  const [inputRef, focusInput] = useElementFocus<HTMLInputElement>()

  return (
    <div
      className={
        `border border-solid ` +
        `relative float-left flex h-10 w-full items-center justify-start rounded-custom border border-solid px-4 transition-all duration-150 ease-in-out focus:border-blue-focused focus:text-blue focus:outline-none ` +
        `${active || value.length > 0 ? "border-blue text-blue" : " "} ` +
        `${
          !(active || value.length > 0)
            ? "border-black-quin text-black-quat"
            : " "
        } `
      }
      ref={domNode}
      onClick={() => {
        setActive(true)
        focusInput()
      }}
      data-type={dropdownUsage && "dropdown"}
      tabIndex={0}
      onFocus={() => {
        setActive(true)
        focusInput()
      }}
      onBlur={() => {
        setActive(false)
      }}
    >
      <SearchIcon
        className="stroke-current"
        data-type={dropdownUsage && "dropdown"}
      />
      <input
        type="text"
        ref={inputRef}
        className="ml-2 w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-normal  text-black-secondary antialiased  placeholder-black-quat outline-none focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        data-type={dropdownUsage && "dropdown"}
      />

      {!!value.length && (
        <span
          className="cursor-pointer text-sm text-blue"
          onClick={() => {
            setActive(false)
            onChange("")
          }}
          data-type={dropdownUsage && "dropdown"}
        >
          <CancelRuleIcon data-type={dropdownUsage && "dropdown"} />
        </span>
      )}
      {children && (
        <div
          className="absolute -bottom-0.5 left-0 w-full "
          tabIndex={-1}
          data-type="transaction"
        >
          <div
            className={
              `absolute z-40 max-h-120 w-full overflow-auto rounded-b-lg bg-white shadow-custom ` +
              `${!active || value.trim().length < 1 ? "hidden" : ""}`
            }
            // tabIndex={-1}
            // data-type="transaction"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
