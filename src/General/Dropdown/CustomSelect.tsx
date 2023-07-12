import { DropdownItem, DropdownItemValueType } from "../../helpers/types"
import React, { ReactNode } from "react"

import DropdownLink from "./DropdownComponents/DropdownLink"
import LabelDropdownHead from "./LabelDropdownComponent/LabelDropdownHead"

interface Props<T extends DropdownItemValueType> {
  big?: boolean
  size?: "sm" | "md" | "lg"
  value: T | undefined
  options: Array<DropdownItem<T>>
  fitHeight?: boolean
  canCancel?: boolean
  isDisabled?: boolean
  placeholder?: ReactNode
  isSearchable?: boolean

  onSelect: (value: T | undefined) => void
  onCancel?: () => void
  clickOutsideFunc?: () => void
}

function CustomSelect<T extends DropdownItemValueType>({
  big = false,
  value,
  options,
  canCancel = false,
  fitHeight = false,
  isDisabled = false,
  isSearchable,
  placeholder = "",
  size = "lg",
  onSelect,
  onCancel = undefined,
  clickOutsideFunc = undefined,
}: Props<T>): JSX.Element {
  return (
    <LabelDropdownHead
      placeholder={placeholder}
      isCancel={canCancel}
      cancelFunc={() => {
        if (onCancel) {
          onCancel()
        }
      }}
      inputValue={options.find((item) => item.value === value)?.text || ""}
      clickOutsideFunc={clickOutsideFunc}
      isDisabled={isDisabled}
      fitHeight={fitHeight}
      isSearchable={isSearchable}
      size={size}
      clickAndClose
    >
      {options &&
        options.map((option, index) => (
          <DropdownLink
            key={index}
            onClick={() => onSelect(option.value)}
            big={big}
            fitHeight={fitHeight}
          >
            <div
              className={
                "flex w-full flex-col items-start justify-start space-y-0.5 px-4 py-2 text-black " +
                `${option.value === value ? "pointer-events-none" : ""} `
              }
              data-type="dropdown"
            >
              <span
                className="text-sm capitalize text-black-secondary"
                data-type="dropdown"
              >
                {option.text}
              </span>
              {option.subtext && (
                <p
                  className="inline justify-center whitespace-pre-wrap break-words text-left text-xs text-black-tertiary"
                  data-type="dropdown"
                >
                  {option.subtext}
                </p>
              )}
            </div>
          </DropdownLink>
        ))}
    </LabelDropdownHead>
  )
}

export default CustomSelect
