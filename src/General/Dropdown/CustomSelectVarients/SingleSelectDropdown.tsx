import {DropdownItem, DropdownItemValueType} from "../../../../helpers/types";
import {useCallback, useEffect, useState} from "react";

import CustomSelect from "../CustomSelect";

interface SingleSelectDropdownProps<T extends DropdownItemValueType> {
	size?: "sm" | "md" | "lg";
	value?: T | undefined;
	options: Array<DropdownItem<T>>;
	bigDropdown?: boolean;
	fitHeight?: boolean;
	canCancel?: boolean;
	isDisabled?: boolean;
	placeholder?: string;
	isSearchable?: boolean;
	defaultValue?: T | undefined;
	active?: boolean;
	onChange: (newValue: T | undefined) => void;
}
// ========================= To remove value on close add active prop to the component =============================
function SingleSelectDropdown<T extends DropdownItemValueType>({
	options,
	onChange,
	placeholder = "",
	canCancel = false,
	defaultValue = undefined,
	fitHeight = false,
	isDisabled = false,
	bigDropdown = true,
	isSearchable = undefined,
	active = undefined,
	value = undefined,
	size = undefined,
}: SingleSelectDropdownProps<T>): JSX.Element {
	const [selectedValue, setSelectedValue] = useState<T | undefined>(undefined);

	// select the default value only if selectedValue is undefined
	useEffect(() => {
		if (defaultValue && !selectedValue) {
			setSelectedValue(defaultValue);
		}
	}, [defaultValue, selectedValue]);

	// if a change is made to the selectedValues, send to the parent
	useEffect(() => {
		if (!value) return;
		onChange(value);
	}, [value]);

	useEffect(() => {
		if (value) return;
		onChange(selectedValue);
	}, [selectedValue, value]);

	// for resetting the value chosen
	useEffect(() => {
		if (active === undefined) return;
		if (!active) {
			setSelectedValue(undefined);
		}
	}, [active]);

	const handleSelect = useCallback(
		(_value: T | undefined) => {
			if (value === undefined) {
				setSelectedValue(_value);
			} else {
				onChange(_value);
			}
		},
		[value]
	);

	return (
		<CustomSelect
			placeholder={placeholder}
			value={value || selectedValue}
			options={options}
			onSelect={handleSelect}
			canCancel={canCancel}
			onCancel={() => onChange(undefined)}
			fitHeight={fitHeight}
			isDisabled={isDisabled}
			isSearchable={isSearchable}
			big={bigDropdown}
			size={size}
		/>
	);
}

export default SingleSelectDropdown;
