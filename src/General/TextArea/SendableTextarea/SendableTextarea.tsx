import React, {useEffect, useRef, useState} from "react";

import ButtonComp from "../../Buttons/ButtonComp";
import useClickOutside from "../../../../hooks/useClickOutside";

interface SendableTextareaProps {
	placeholder: string;
	onChangeFunc(newValue: string): void;
	onClickFunc(e: React.MouseEvent): void;
	isLoading?: boolean;
	value: string | null;
	sm?: boolean;
	transactionCard?: boolean;
	dataType?: string;
	buttonText: string;
}

function SendableTextarea({placeholder, onChangeFunc, isLoading, value, dataType, buttonText}: SendableTextareaProps): JSX.Element {
	const [active, setActive] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [hasValue, setHasValue] = useState(false);

	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
	const domNode = useClickOutside(() => setActive(false));

	useEffect(() => {
		setHasValue(!!value && value.trim().length > 0);
	}, [value]);

	return (
		<div ref={domNode} className={`relative ${isLoading ? "pointer-events-none" : ""}`} data-type={dataType}>
			<div
				className={
					`relative w-full cursor-text rounded-lg pb-3 pt-1 capitalize outline-none transition-all duration-75 focus:outline-none ` +
					`whitespace-nowrap border border-solid bg-transparent text-base leading-relaxed shadow-none hover:text-blue lg:hover:border-blue ` +
					`${isLoading ? "pointer-events-none" : "pointer-events-auto"} ` +
					`${isHover ? "text-blue" : ""} ` +
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
					} `
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
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				onClick={() => {
					if (textAreaRef.current) {
						textAreaRef.current.focus();
					}
					setActive(true);
				}}
				data-type={dataType}
			>
				<textarea
					className={` z-10 h-full w-full resize-none rounded-tl-lg px-4 placeholder-transparent focus:border-none focus:outline-none 
						${hasValue ? "text-black-secondary" : ""} 
					  	text-black`}
					ref={textAreaRef}
					value={value || ""}
					placeholder={placeholder}
					onClick={() => setActive(true)}
					onChange={(e) => {
						onChangeFunc(e.target.value);
					}}
					data-type={dataType}
				/>
				<label
					htmlFor="text"
					className={`space-x-none absolute z-10 cursor-text duration-75 ease-in-out  ${
						active || hasValue ? "-top-2 left-2.5 bg-white px-1 text-xs " : "left-4 top-3 text-base "
					} 
            ${active ? "text-blue" : ""}
            ${active ? "text-blue" : hasValue ? "text-black-secondary" : "text-black-tertiary"} 
            ${isHover ? "text-blue" : ""}`}
					onClick={() => {
						if (domNode.current) {
							domNode.current.focus();
						}
					}}
					data-type={dataType}
				>
					{placeholder}
				</label>
				<div className="flex w-full flex-row items-end justify-end pr-4" data-type={dataType}>
					<ButtonComp type="submit" buttonType="primary" color="blue" size="sm" isLoading={isLoading} disable={!hasValue} borderSmall>
						<span className="text-sm">{buttonText}</span>
					</ButtonComp>
				</div>
			</div>
		</div>
	);
}

export default SendableTextarea;
