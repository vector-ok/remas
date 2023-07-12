import {DropdownItem, DropdownItemValueType} from "../../../../helpers/types";
import {useCallback, useEffect, useState} from "react";

import Input from "../../Inputs/Input";
import SingleSelectDropdown from "./SingleSelectDropdown";

interface Props<T extends DropdownItemValueType, U extends DropdownItemValueType> {
	options: Array<DropdownItem<T>>;
	otherOptionValue: U; // the "value" that will be passed to onChange when the user selects the "other" option
	onChange: (value: T | U | undefined, otherText: string | undefined) => void;
	placeholder?: string;
	canCancel?: boolean;
	defaultValue?: T | U | undefined;
	defaultOtherText?: string | undefined;
	bigDropdown?: boolean;
}

function SingleSelectDropdownWithOther<T extends DropdownItemValueType, U extends DropdownItemValueType>(props: Props<T, U>): JSX.Element {
	const {bigDropdown = true} = props;
	const [showDropdown, setShowDropdown] = useState(true);
	const [optionsWithOther, setOptionsWithOther] = useState<Array<DropdownItem<T | U>>>([]);
	const [otherText, setOtherText] = useState<string | undefined>(undefined);
	const [autofocusTextInput, setAutofocusTextInput] = useState<boolean>(false);

	// add "other" to the display options
	useEffect(() => {
		setOptionsWithOther([...props.options, {value: props.otherOptionValue, text: "Other"}]);
	}, [props.options]);

	// set otherText from defaultOtherText
	useEffect(() => {
		if (props.defaultOtherText && !otherText) {
			setOtherText(props.defaultOtherText);
		}
	}, [props.defaultOtherText]);

	const switchToInput = useCallback(() => {
		// only set this here when switching between dropdown and input, so that it does not autofocus when the component first loads
		setAutofocusTextInput(true);
		setShowDropdown(false);
	}, []);

	const switchToDropdown = useCallback(() => {
		setAutofocusTextInput(false);
		setShowDropdown(true);
		props.onChange(undefined, undefined);
		setOtherText(undefined);
	}, []);

	return (
		<>
			{showDropdown && (
				<SingleSelectDropdown
					placeholder={props.placeholder}
					options={optionsWithOther}
					onChange={(value: T | U | undefined) => {
						if (value === props.otherOptionValue) {
							switchToInput();
						}
						props.onChange(value, undefined);
					}}
					defaultValue={props.defaultValue}
					bigDropdown={bigDropdown}
				/>
			)}

			{!showDropdown && (
				<Input
					placeholder={props.placeholder}
					value={otherText}
					// Can change the icon
					icon={
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								preserveAspectRatio="xMidYMid meet"
								viewBox="0 0 24 24"
								className={"cursor-pointer"}
								onClick={switchToDropdown}
							>
								<path fill="currentColor" d="M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11h12Z" />
							</svg>
							&nbsp; Other:
						</>
					}
					type="text"
					onChange={(text) => {
						setOtherText(text);
						props.onChange(props.otherOptionValue, text);
					}}
					isFocused={autofocusTextInput}
					alwaysActive={true}
					// value={"Nationality"}
				/>
			)}
		</>
	);
}

export default SingleSelectDropdownWithOther;
