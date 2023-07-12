import {useCallback, useEffect, useState} from "react";

import Checkbox from "../../Checkbox/Checkbox";
import {DropdownItem} from "../../../../helpers/types";
import DropdownLink from "../DropdownComponents/DropdownLink";
import LabelDropdownHead from "../LabelDropdownComponent/LabelDropdownHead";

interface MultiSelectDropdownProps<T extends number | string> {
	value?: T[] | undefined;
	active?: boolean;
	options: Array<DropdownItem<T>>;
	canCancel?: boolean;
	isDisabled?: boolean;
	placeholder?: string;
	onChange: (newValues: Array<T>) => void;
	size?: "sm" | "md" | "lg";
}

function MultiSelectDropdown<T extends number | string>({
	size = "lg",
	value = undefined,
	active = undefined,
	options,
	canCancel = false,
	placeholder = "",
	isDisabled = false,
	onChange,
}: MultiSelectDropdownProps<T>): JSX.Element {
	const [inputText, setInputText] = useState<string>("");
	const [selectedValues, setSelectedValues] = useState<Array<T>>([]);

	// if a change is made to the selectedValues, send to the parent and update inputText
	useEffect(() => {
		if (value) return;
		onChange(selectedValues);
		// set inputText
		if (selectedValues.length === 0) {
			setInputText("");
		} else if (selectedValues.length === 1) {
			setInputText(options.find((item) => item.value === selectedValues[0])?.text || "");
		} else {
			setInputText(`${selectedValues.length} selected`);
		}
	}, [selectedValues, value]);

	useEffect(() => {
		if (!value) return;
		onChange(value);
		// set inputText
		if (value.length === 0) {
			setInputText("");
		} else if (value.length === 1) {
			setInputText(options.find((item) => item.value === value[0])?.text || "");
		} else {
			setInputText(`${value.length} selected`);
		}
	}, [value]);

	// useEffect(() => {
	// if (!value) return;
	// setSelectedValues(value);
	// }, [value]);

	useEffect(() => {
		if (active === undefined) return;
		if (!active) {
			setInputText("");
			setSelectedValues([]);
		}
	}, [active]);

	const handleItemClick = useCallback(
		(option: DropdownItem<T>) => {
			if (value) {
				if (value.includes(option.value)) {
					onChange(value.filter((el) => el !== option.value));
				} else {
					onChange([...value, option.value]);
				}
			} else {
				setSelectedValues((prevState) => {
					if (prevState.includes(option.value)) {
						return prevState.filter((el) => el !== option.value);
					} else {
						return [...prevState, option.value];
					}
				});
			}
		},
		[value]
	);
	return (
		<LabelDropdownHead
			// placeholder="Select Account(s)"
			placeholder={placeholder}
			cancelFunc={() => onChange([])}
			isCancel={canCancel}
			inputValue={inputText}
			isDisabled={isDisabled}
			size={size}
		>
			{options &&
				options.map((option, index) => (
					<DropdownLink key={index} onClick={() => handleItemClick(option)} big>
						<div className="flex h-full w-full flex-row items-center justify-start px-4 text-sm">
							<div className="pointer-events-none w-fit">
								<Checkbox
									text={
										<div className="flex max-w-full flex-col justify-center overflow-hidden overflow-ellipsis whitespace-nowrap">
											<p className="text-left text-sm capitalize text-black-secondary">
												{/*{option?.isMain
												? "Main"
												: option?.subAccountShortName}*/}
												{option.text}
											</p>
											{option.subtext && (
												<p className="inline justify-center text-left text-xs text-black-tertiary">{option.subtext}</p>
											)}
										</div>
									}
									id={String(option.value)}
									checked={value ? value.includes(option.value) : selectedValues.includes(option.value)}
									readOnly
								/>
							</div>
						</div>
					</DropdownLink>
				))}
		</LabelDropdownHead>
	);
}

export default MultiSelectDropdown;
