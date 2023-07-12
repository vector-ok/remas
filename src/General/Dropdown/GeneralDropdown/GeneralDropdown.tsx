import React, {useEffect, useRef, useState} from "react";

import {ReactComponent as ArrowDownIcon} from "../../../../assets/svg/General/arrowDownIcon.svg";
import {ReactComponent as Cancel} from "../../../../assets/svg/Transfer/Cancel.svg";
import DropdownLink from "../DropdownComponents/DropdownLink";
import {TailSpin} from "react-loader-spinner";
import useClickOutside from "../../../../hooks/useClickOutside";

interface GeneralDropdownProps<T> {
	placeholder: string;
	inputValue: string;
	clickAndClose: boolean;
	data: T[];
	cancelFunc(): void;
	onClickFunc(item: T): void;
	isLoading: boolean;
	noLabel?: boolean;
	value: string;
	changeValue(newValue: string): void;
}

function GeneralDropdown<T extends {name: string}>({
	placeholder,
	inputValue,
	clickAndClose,
	data: options,
	cancelFunc,
	onClickFunc,
	isLoading,
	noLabel,
	value,
	changeValue,
}: GeneralDropdownProps<T>): JSX.Element {
	const [active, setActive] = useState<boolean>(false);
	const [isHover, setIsHover] = useState<boolean>(false);
	const [hasValue, setHasValue] = useState<boolean>(false);
	const [hasInputValue, setHasInputValue] = useState<boolean>(false);
	const [positionTop, setPositionTop] = useState<boolean>(false);
	const [y, setY] = useState<number | null>(null);
	const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const innerHeight = window.innerHeight;

	const domNode = useClickOutside(() => {
		setActive(false);
	});

	useEffect(() => {
		const onScroll = () => {
			if (domNode.current) {
				setY(domNode.current.getBoundingClientRect()?.top);
			}
		};

		document.addEventListener("scroll", onScroll);
		return () => {
			document.removeEventListener("scroll", onScroll);
		};
	});

	useEffect(() => {
		if (y) {
			const shouldSetPositionTop = y > innerHeight / 2;
			setPositionTop(shouldSetPositionTop);
		}
	}, [innerHeight, y]);

	useEffect(() => {
		changeValue(inputValue || "");
	}, [changeValue, inputValue]);

	useEffect(() => {
		setHasValue(!!value && value.length > 0);
	}, [value]);

	useEffect(() => {
		setHasInputValue(!!inputValue && inputValue.length > 0);
	}, [inputValue]);

	useEffect(() => {
		const filtered = (options || []).filter((item: T) => {
			if (!item || !item.name) {
				return false;
			}
			if (!value || value.trim().length === 0) {
				return true;
			}
			return item.name.toLowerCase().includes(value.toLowerCase());
		});
		setFilteredOptions(filtered);
	}, [options, value]);

	return (
		<>
			<div className={`relative flex h-full w-full flex-col items-center justify-start`} ref={domNode}>
				<div
					className={
						`outline-none relative h-12 w-full cursor-text  rounded-lg capitalize ` +
						`focus:outline-none whitespace-nowrap text-base leading-relaxed transition-all duration-75 ` +
						`border border-solid bg-transparent shadow-none hover:border-blue hover:text-blue ` +
						`${hasInputValue && !active ? "border-black-secondary text-black-secondary hover:border-blue hover:text-blue" : ""} ` +
						`${hasInputValue && active ? "border-blue" : ""} ` +
						`${!hasInputValue && !active ? "border-black-quin text-black-tertiary" : ""} ` +
						`${!hasInputValue && active ? "border-blue text-blue" : ""} ` +
						`${isLoading ? "pointer-events-none" : "pointer-events-auto"} ` +
						`${isHover ? "text-blue" : ""} `
					}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					onClick={() => !hasValue && setActive(true)}
				>
					<div className="relative flex h-full w-full items-center justify-between space-x-4 overflow-hidden whitespace-nowrap rounded-lg bg-white px-4 py-3 text-left text-base font-normal capitalize leading-relaxed">
						<input
							id={placeholder}
							name={placeholder}
							ref={inputRef}
							type="text"
							value={value}
							onChange={(e) => changeValue(e.target.value)}
							disabled={hasInputValue}
							autoComplete="off"
							className={
								`focus:outline-none h-10 w-full bg-transparent focus:border-none ` +
								`${noLabel ? "" : "placeholder-transparent"} ` +
								`${hasValue ? "text-black-secondary" : `${active ? "text-black" : "text-black"}`} `
							}
							placeholder={placeholder}
						/>

						{isLoading && (
							<div className="pointer-events-none ml-3 flex h-full items-center justify-center">
								<TailSpin color="#5466F9" height={20} width={20} />
							</div>
						)}

						{!isLoading && hasValue && (
							<div
								className={
									`flex cursor-pointer items-center justify-end ` +
									`${active ? "text-blue" : ""} ` +
									`${!active && hasInputValue ? "text-black-secondary" : ""} ` +
									`${isHover ? "text-blue" : ""} `
								}
								onClick={() => {
									// e.preventDefault();
									// e.stopPropagation();
									setActive(false);
									if (!inputValue) return changeValue("");
									cancelFunc();
								}}
							>
								<Cancel className="h-3.5 w-3.5 stroke-current" />
							</div>
						)}

						{!isLoading && !hasValue && (
							<span
								className={
									`flex transform items-center justify-end transition-transform duration-150 ` +
									`${active ? "-rotate-180 text-blue" : "rotate-0"}`
								}
							>
								<ArrowDownIcon className="h-3.5 w-3.5 stroke-current" />
							</span>
						)}
					</div>

					{!noLabel && (
						<label
							htmlFor="text"
							className={
								`pointer-events-none absolute z-10 cursor-text duration-75 ease-in-out ` +
								`${
									active || hasValue
										? "-top-2 left-2.5 bg-white px-1 text-xs "
										: "left-4 top-0 flex h-12 items-center justify-center text-base "
								} ` +
								`${active || isHover ? "text-blue" : ""} ` +
								`${!active && hasValue ? "text-black-secondary" : ""}` +
								`${!active && !hasValue ? "text-black-tertiary" : ""}`
							}
							onClick={() => {
								if (inputRef.current) {
									inputRef.current.focus();
								}
							}}
						>
							{placeholder}
						</label>
					)}
				</div>

				<div
					className={
						`absolute z-40 h-fit max-h-60 w-full transform cursor-pointer overflow-hidden overflow-y-auto rounded bg-white shadow ` +
						`${positionTop ? "bottom-full left-0 mb-1 origin-bottom" : "left-0 top-full mt-1 origin-top"} ` +
						`${!active ? "pointer-events-none scale-0 opacity-0" : "scale-100 opacity-100"}`
					}
					onClick={() => {
						if (clickAndClose) return setActive((prev) => !prev);
					}}
				>
					{filteredOptions.map((item, index) => (
						<DropdownLink onClick={() => onClickFunc(item)} key={index}>
							<div className="flex h-10 w-full items-center justify-start px-4">{item.name}</div>
						</DropdownLink>
					))}
				</div>
			</div>
		</>
	);
}

export default GeneralDropdown;
