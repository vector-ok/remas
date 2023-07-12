import React, {useEffect, useRef, useState} from "react";

import useClickOutside from "../../../hooks/useClickOutside";

interface TextAreaProps {
	sm?: boolean;
	value?: string | null;
	isLoading?: boolean;
	isDisabled?: boolean;
	placeholder: string;
	onChangeFunc?(newValue: string): void;
}

function TextArea({sm = true, value = "", isLoading = false, isDisabled = false, placeholder, onChangeFunc}: TextAreaProps): JSX.Element {
	const [active, setActive] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [hasValue, setHasValue] = useState(false);
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	const domNode = useClickOutside(() => {
		setActive(false);
	});

	useEffect(() => {
		setHasValue(!!value && value.trim().length > 0);
	}, [value]);

	return (
		<div className={`${sm ? "" : "h-full"}`}>
			<div
				className={`relative flex h-full w-full flex-col items-center justify-start ` + `${isDisabled ? "pointer-events-none" : ""} `}
				ref={domNode}
			>
				<div
					className={
						`relative flex w-full items-center justify-between whitespace-nowrap rounded-lg border  border-solid bg-white py-3 text-left text-base font-normal capitalize  leading-relaxed shadow-none outline-none transition-all duration-150 hover:text-blue focus:outline-none lg:hover:border-blue ` +
						`${
							hasValue
								? !active
									? "border-black-quin text-black-secondary hover:text-blue lg:hover:border-blue "
									: active
									? "border-blue"
									: "border-black-quin text-black-tertiary hover:text-blue lg:hover:border-blue"
								: active
								? "border-blue text-blue"
								: "border-black-quin text-black-tertiary"
						} ` +
						`${isLoading ? "pointer-events-none" : ""} ` +
						`${sm ? "" : "h-full"}`
					}
					onFocus={() => {
						if (textAreaRef.current) {
							textAreaRef.current.focus();
						}
						setActive(true);
					}}
					onBlur={() => {
						setActive(false);
					}}
					onClick={() => {
						if (textAreaRef.current) {
							textAreaRef.current.focus();
							setActive(true);
						}
					}}
					onMouseEnter={() => !isDisabled && setIsHover(true)}
					onMouseLeave={() => !isDisabled && setIsHover(false)}
					ref={domNode}
				>
					<textarea
						className={
							`z-10 w-full resize-none rounded-lg px-4 text-black placeholder-transparent focus:border-none focus:outline-none ` +
							`${hasValue ? "text-black-secondary" : ""} ` +
							`${isDisabled ? "bg-transparent text-black-quat " : ""} ` +
							`${sm ? "h-12" : "h-full"} `
						}
						ref={textAreaRef}
						value={value || ""}
						placeholder={placeholder}
						cols={30}
						rows={sm ? 10 : undefined}
						tabIndex={isDisabled ? -1 : 0}
						// ref={domNode}
						onClick={() => setActive(true)}
						onChange={(e) => {
							if (onChangeFunc) {
								onChangeFunc(e.target.value.trim().length > 0 ? e.target.value : "");
							}
						}}
					/>
					<label
						htmlFor={placeholder}
						className={
							`space-x-none pointer-events-none absolute z-10 h-2  duration-150 ease-in-out ` +
							`${active || hasValue ? "-top-2 left-2.5 bg-white px-1 text-xs" : "left-4 top-3 text-base "} ` +
							`${active ? "text-blue" : hasValue ? "text-black-secondary" : "text-black-tertiary"} ` +
							`${isDisabled ? "text-black-quat " : ""} ` +
							`${isHover ? "text-blue" : ""}`
						}
					>
						{placeholder}
					</label>
				</div>
			</div>
		</div>
	);
}

export default TextArea;
