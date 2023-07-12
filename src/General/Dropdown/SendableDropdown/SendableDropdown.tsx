import React, {KeyboardEvent, useEffect, useRef, useState} from "react";

import {ReactComponent as ArrowDownIcon} from "../../../../assets/svg/General/arrowDownIcon.svg";
import {ReactComponent as Cancel} from "../../../../assets/svg/Transfer/Cancel.svg";
import DropdownLink from "../DropdownComponents/DropdownLink";
import {TailSpin} from "react-loader-spinner";
import isNullOrUndefined from "../../../../utils/isNullOrUndefined";
import useClickOutside from "../../../../hooks/useClickOutside";

// import SearchBar from "../../../DashboardLayout/SearchBar/SearchBar";

interface SendableDropdownProps<T> {
	placeholder: string;
	inputValue: string;
	clickAndClose: boolean;
	data: T[];
	cancelFunc(): void;
	onClickFunc(item: T): void;
	createFunc(value: string): void;
	isLoading: boolean;
	noLabel?: boolean;
	value: string;
	changeValue(newValue: string): void;
}

function SendableDropdown<T extends {name: string}>({
	placeholder,
	inputValue,
	clickAndClose,
	data: options,
	cancelFunc,
	onClickFunc,
	createFunc,
	isLoading,
	noLabel,
	value,
	changeValue,
}: SendableDropdownProps<T>): JSX.Element {
	const [active, setActive] = useState<boolean>(false);
	const [isHover, setIsHover] = useState<boolean>(false);
	const [hasValue, setHasValue] = useState<boolean>(false);
	const [hasInputValue, setHasInputValue] = useState<boolean>(false);
	const [positionTop, setPositionTop] = useState<boolean>(false);
	const [y, setY] = useState<number | null>(null);
	const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
	const [hasExactOption, setHasExactOption] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const innerHeight = window.innerHeight;
	// const [searchValue, setSearchValue] = useState<string>("");
	// const [searchResults, setSearchResults] = useState<Array<TransactionCategory>>([]);

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

		const exactMatch = (options || []).find((item) => item.name.toLowerCase() === value.toLowerCase());
		setHasExactOption(!isNullOrUndefined(exactMatch));
	}, [options, value]);

	const handleKeypress = (event: KeyboardEvent<HTMLDivElement>) => {
		//it triggers by pressing the enter key
		if (event.key === "Enter") {
			!hasValue && setActive(true);
		}
	};
	return (
		<div className={`relative flex h-full w-full flex-col items-center justify-start`} ref={domNode}>
			<div
				className={
					`outline-none relative h-12 w-full cursor-text  rounded-lg ` +
					`focus:outline-none whitespace-nowrap text-base leading-relaxed transition-all duration-75 ` +
					`border border-solid bg-transparent shadow-none hover:text-blue focus:border-blue-focused focus:text-blue-focused lg:hover:border-blue` +
					`${hasInputValue && !active ? "border-black-quin text-black-secondary hover:text-blue lg:hover:border-blue" : ""} ` +
					`${hasInputValue && active ? "border-blue" : ""} ` +
					`${!hasInputValue && !active ? "border-black-quin text-black-tertiary" : ""} ` +
					`${!hasInputValue && active ? "border-blue text-blue" : ""} ` +
					`${isLoading ? "pointer-events-none" : "pointer-events-auto"} ` +
					`${isHover ? "text-blue" : ""} `
				}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				onClick={() => !hasValue && setActive(true)}
				onKeyDown={handleKeypress}
				tabIndex={0}
			>
				<div className="relative flex h-full w-full items-center justify-between space-x-4 overflow-hidden whitespace-nowrap rounded-lg bg-white px-4 py-3 text-left text-base font-normal capitalize leading-relaxed">
					<input
						id={placeholder}
						name={placeholder}
						ref={inputRef}
						type="text"
						value={value}
						onChange={(e) => changeValue(e.target.value)}
						// disabled={hasInputValue}
						// disabled={options.length <= 5}
						autoComplete="off"
						className={
							`focus:outline-none h-10 w-full bg-transparent focus:border-none ` +
							`${noLabel ? "placeholder-black-tertiary" : "placeholder-transparent"} ` +
							`${hasValue ? "text-black-secondary" : `${active ? "text-black" : "text-black-tertiary"}`} `
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
							`${!active && hasValue ? "text-black-tertiary" : ""}` +
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
				{/* {filteredOptions.length > 4 && (
					<div className="w-90% relative my-2 ml-3 mr-2" tabIndex={-1}>
						<SearchBar placeholder="Search" value={searchValue} onChange={handleChangeSearchValue} />
					</div>
				)} */}

				{filteredOptions.map((item, index) => (
					<DropdownLink onClick={() => onClickFunc(item)} key={index}>
						<div className="flex h-10 w-full items-center justify-start px-4">{item.name}</div>
					</DropdownLink>
				))}

				{!hasExactOption && value.trim().length > 0 && (
					<DropdownLink onClick={() => createFunc(value)}>
						<div className="flex h-10 w-full items-center justify-start px-4 text-black hover:bg-blue-senary hover:text-blue">
							<span className="text-blue">Create</span>
							<span className="ml-1 text-blue">&quot;{value}&quot;</span>
						</div>
					</DropdownLink>
				)}
			</div>
		</div>
	);
}

export default SendableDropdown;
