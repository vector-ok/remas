import React, {HTMLInputTypeAttribute, InputHTMLAttributes, useEffect, useRef, useState} from "react";

import {ReactComponent as PasswordCloseIcon} from "../../../assets/svg/General/Password/passwordCloseIcon.svg";
import {ReactComponent as PasswordIcon} from "../../../assets/svg/General/Password/passwordIcon.svg";
import {TailSpin} from "react-loader-spinner";
import useClickOutside from "../../../hooks/useClickOutside";
import {useField} from "formik";

interface FormInputProps {
	type: HTMLInputTypeAttribute | "textarea";
	name: string;
	value?: string;
	isError?: boolean;
	dataType?: string;
	isActive?: boolean;
	inputSize?: "sm" | "md" | "lg";
	isLoading?: boolean;
	isDisabled?: boolean;
	helperText?: React.ReactNode;
	placeholder?: string;
	customStyle?: string;
	borderCurve?: string | undefined | null;
	mobileHelperText?: boolean;
	passwordCustomStyle?: boolean;
}
function FormInput({
	type,
	name,
	isError = false,
	isActive = false,
	dataType = "",
	inputSize = "lg",
	isLoading = false,
	helperText = "",
	isDisabled = false,
	borderCurve = "",
	customStyle = "",
	placeholder,
	mobileHelperText = false,
	passwordCustomStyle = false,
	...otherProps
}: FormInputProps & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>): JSX.Element {
	const [active, setActive] = useState(false);
	const [error, setError] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isHover, setIsHover] = useState(false);

	const inputRef = useRef<HTMLInputElement | null>(null);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const [field, meta] = useField<string>(name);

	const domNode = useClickOutside(() => setActive(false), undefined, ["mousedown", "focusout"]);

	const configInputField = {
		...field,
		...otherProps,
		className:
			`py-3 px-4 h-full w-full z-10 placeholder-transparent focus:outline-none focus:border-none rounded-lg text-black-secondary ` +
			`${isDisabled ? "text-black-quat bg-transparent " : ""} ` +
			`${passwordCustomStyle ? "pr-10" : ""} ` +
			`${customStyle || ""} `,
		type: type === "password" && showPassword ? "text" : type,
		placeholder: placeholder,
	};

	useEffect(() => {
		const showError = (!!meta && meta.touched && !!meta.error) || isError;
		setError(showError);
	}, [isError, meta]);

	useEffect(() => {
		if (active || isActive) {
			if (inputRef.current) {
				inputRef.current.focus();
			}
			if (textareaRef.current) {
				textareaRef.current.focus();
			}
		}
	}, [active, isActive]);

	useEffect(() => {
		if (inputRef.current) {
			window.onload = function () {
				if (inputRef.current) {
					if (window.getComputedStyle(inputRef.current).backgroundColor === "rgb(232, 240, 254)") {
						setActive(true);
					}
				}
			};
		}
	}, [inputRef.current]);

	return (
		<div className="relative flex w-full flex-col" data-type={dataType}>
			<div
				className={
					`${
						type === "textarea"
							? "outline-none focus:outline-none leading-1 relative flex w-full items-center justify-between whitespace-nowrap border border-solid bg-white text-left font-normal antialiased shadow-none transition-all duration-150 "
							: ""
					} ` +
					`${
						type !== "textarea"
							? "outline-none focus:outline-none leading-1 relative h-12 w-full items-center justify-between whitespace-nowrap border border-solid bg-transparent text-left font-normal antialiased shadow-none transition-all duration-150 "
							: ""
					} ` +
					`${type !== "textarea" && inputSize === "lg" ? "h-12" : ""} ` +
					`${type !== "textarea" && inputSize === "md" ? "h-10" : ""} ` +
					`${type !== "textarea" && inputSize === "sm" ? "h-8" : ""} ` +
					`${field.value?.length > 0 && active ? "border-blue lg:hover:border-blue lg:focus:border-blue" : ""} ` +
					`${field.value?.length > 0 && !active ? "border-black-quin text-black-secondary lg:hover:border-blue" : ""} ` +
					`${field.value?.length === 0 && active ? "border-blue" : ""} ` +
					`${
						field.value?.length === 0 && !active
							? "border-black-quin text-black-tertiary lg:hover:border-blue lg:hover:text-blue lg:focus:border-blue"
							: ""
					} ` +
					`${borderCurve ? borderCurve : "rounded-lg"} ` +
					`${isDisabled ? "pointer-events-none" : ""} ` +
					`${isLoading ? "pointer-events-none" : ""} `
				}
				onClick={() => setActive(true)}
				onFocus={() => setActive(true)}
				onBlur={() => setActive(false)}
				onMouseEnter={() => !isDisabled && setIsHover(true)}
				onMouseLeave={() => !isDisabled && setIsHover(false)}
				ref={domNode}
				data-type={dataType}
			>
				{type === "textarea" ? (
					<>
						<textarea
							ref={textareaRef}
							{...configInputField}
							{...otherProps}
							rows={3}
							style={{resize: "none"}}
							disabled={isDisabled}
							data-type={dataType}
						/>
					</>
				) : (
					<input
						ref={inputRef}
						{...configInputField}
						{...otherProps}
						disabled={isDisabled}
						autoComplete={type === "password" ? "new-password" : "false"}
						data-type={dataType}
					/>
				)}

				<label
					htmlFor={placeholder}
					className={
						"absolute z-10 h-2 cursor-text duration-150 ease-in-out " +
						`${error ? "border-black-tertiary" : ""} ` +
						`${
							active || field.value?.length > 0
								? "-top-2 left-2.5 bg-white px-1 text-xs"
								: type === "textarea"
								? "left-4 top-4 text-base"
								: "left-4 top-3 text-base"
						} ` +
						`${active ? "text-blue" : ""} ` +
						`${isHover ? "lg:text-blue" : ""} ` +
						`${!error && !active && field.value?.length > 0 ? "text-black-secondary" : ""} ` +
						`${!error && !active && !(field.value?.length > 0) ? "text-black-tertiary" : ""} ` +
						`${isDisabled ? "text-black-quat " : ""} `
					}
					data-type={dataType}
				>
					{placeholder}
				</label>

				{type === "password" && (
					<span
						className={
							`absolute right-0 top-0 z-40 flex h-full w-12 cursor-pointer items-center justify-center ` +
							`${!error && active ? "text-blue" : ""} ` +
							`${!active ? `${field.value?.length > 0 ? "text-black-tertiary" : "text-black-tertiary"} ` : ""} ` +
							`${isHover ? "lg:text-blue" : ""} `
						}
						onClick={() => setShowPassword((prev) => !prev)}
					>
						{showPassword ? <PasswordCloseIcon className="stroke-current" /> : <PasswordIcon className="stroke-current" />}
					</span>
				)}
			</div>
			{helperText && (
				<span
					className={
						`pt-2 text-xs leading-4 text-black-tertiary ` +
						`${mobileHelperText ? "lg:hidden" : ""} ` +
						`${!mobileHelperText ? "" : ""} ` +
						`${isDisabled ? "text-black-quat " : ""} `
					}
					data-type={dataType}
				>
					{helperText}
				</span>
			)}
			{isLoading && (
				<div className="pointer-events-none absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center" data-type={dataType}>
					<TailSpin color="#5466F9" height={30} width={30} data-type={dataType} />
				</div>
			)}
		</div>
	);
}

export default FormInput;
