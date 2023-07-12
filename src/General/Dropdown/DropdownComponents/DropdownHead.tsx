import React, {KeyboardEvent, useEffect, useState} from "react";

import {ReactComponent as ArrowDownIcon} from "../../../../assets/svg/General/arrowDownIcon.svg";
import {ReactComponent as CancelIcon} from "../../../../assets/svg/Transfer/Cancel.svg";
import SearchBar from "../../Searchbar/SearchBar";
import {TailSpin} from "react-loader-spinner";
import isNullOrUndefined from "../../../../utils/isNullOrUndefined";
import useClickOutside from "../../../../hooks/useClickOutside";

interface DropdownHeadProps {
	placeholder: React.ReactNode;
	placeholderIcon?: React.ReactNode;
	placeholderClose?: React.ReactNode;
	children: React.ReactNode;
	clickAndClose?: boolean;
	icon?: boolean;
	placement: "center" | "right" | "left";
	outline?: boolean;
	outlineBg?: boolean;
	outlineBorder?: boolean;
	outlineBorderHover?: boolean;
	noOutlineBorder?: boolean;
	noHoverBg?: boolean;
	noTextHover?: boolean;
	value?: boolean;
	size?: "xs" | "sm" | "lg";
	filled?: boolean;
	isLoading?: boolean;
	color?: string;
	isActive?: boolean;
	isHover?: boolean;
	isSelected?: boolean;
	isSearchable?: boolean;
	searchTerm?: string;
	fitDropdown?: boolean;
	isFilterOpen?: boolean;
	noOverflow?: boolean;
	triggerLower?: boolean;
	searchPlaceholder?: string;
	handleOpen?: () => void;
	handleClose?: () => void;
	handleChangeSearchTerm?: (e: string) => void;
	handleAdditionalCheck?: (e: HTMLElement) => boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DropdownHead({
	placeholder,
	placeholderIcon,
	placeholderClose,
	children,
	clickAndClose = false,
	icon = false,
	placement,
	outline = true,
	outlineBg = false,
	outlineBorder = false,
	outlineBorderHover = false,
	noOutlineBorder = false,
	noHoverBg = false,
	noTextHover = false,
	value = false,
	size,
	filled = false,
	isLoading = false,
	color,
	isActive = false,
	isHover = false,
	isSelected = false,
	isSearchable = false,
	searchTerm = "",
	noOverflow = false,
	searchPlaceholder = "Search",
	handleChangeSearchTerm = undefined,
	handleClose = undefined,
	handleOpen = undefined,
	handleAdditionalCheck = undefined,
	triggerLower = false,
	fitDropdown = false,
	isFilterOpen = false,
}: DropdownHeadProps): JSX.Element {
	const [active, setActive] = useState(false);
	const [positionTop, setPositionTop] = useState(false);
	const [y, setY] = useState<number | null>(null);

	const innerHeight = window.innerHeight;

	const domNode = useClickOutside(() => {
		setActive(false);
		handleChangeSearchTerm && handleChangeSearchTerm("");
	}, handleAdditionalCheck && handleAdditionalCheck);

	useEffect(() => {
		if (domNode.current) {
			setY(domNode.current.getBoundingClientRect().top);
		}
	});

	useEffect(() => {
		if (y) {
			let shouldSetPositionTop;
			if (triggerLower) {
				shouldSetPositionTop = y > innerHeight / 1.25;
			} else {
				shouldSetPositionTop = y > innerHeight / 1.65;
			}
			setPositionTop(shouldSetPositionTop);
		}
	}, [innerHeight, y, triggerLower]);

	useEffect(() => {
		setActive(isActive);
	}, [isActive]);

	useEffect(() => {
		if (active) return;
		handleClose && handleClose();
	}, [active]);

	useEffect(() => {
		if (!active) return;
		handleOpen && handleOpen();
	}, [active]);

	const handleKeypress = (event: KeyboardEvent<HTMLDivElement>) => {
		//it triggers by pressing the enter key
		if (event.key === "Enter") {
			setActive((prev) => !prev);
		}
	};

	return (
		<div className={`relative flex h-full w-full flex-col items-center justify-start transition-all duration-300 ease-in-out`} ref={domNode}>
			{icon ? (
				<div
					className={
						"relative flex cursor-pointer items-center justify-center " +
						"transition-all duration-300 ease-in-out " +
						`${
							outlineBorder
								? "rounded-lg border border-grey text-black-secondary hover:border-blue hover:bg-blue-senary hover:text-blue"
								: ""
						} ` +
						`${outlineBorder && (isNullOrUndefined(size) || size !== "lg") ? "h-10 px-2 py-1.5" : ""} ` +
						`${outlineBorder && size === "lg" ? "h-12 px-4 py-3" : ""} `
					}
					onClick={() => setActive((prev) => !prev)}
				>
					<div className="pointer-events-none z-20">{placeholder} </div>
					{!outlineBorder && (
						<div className="absolute z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:bg-blue-senary" />
					)}
				</div>
			) : (
				<>
					<div
						className={
							`relative flex w-full items-center justify-between font-normal capitalize outline-none ` +
							`whitespace-nowrap leading-relaxed transition-all duration-300 focus:outline-none ` +
							`cursor-pointer rounded-lg bg-transparent text-left shadow-none ` +
							`${outlineBorder ? "border-blue text-blue hover:bg-blue-senary" : ""} ` +
							`${outlineBg && !noTextHover && color !== "red" ? "bg-blue-backdrop hover:text-blue focus:border-blue-focused" : ""} ` +
							`${
								!noOutlineBorder
									? outline && size === "xs"
										? "border border-solid border-black-quin px-2 py-1.5 text-xs "
										: "border border-solid border-black-quin px-4 py-3 text-sm"
									: outline && size === "xs"
									? "border border-solid  px-2 py-1.5 text-xs "
									: "border border-solid px-4 py-3 text-sm"
							} ` +
							`${filled ? "bg-blue text-white hover:bg-blue-hover focus:bg-blue-focused" : "bg-white text-black-tertiary"} ` +
							`${size === "xs" ? "h-8 text-xs" : ""} ` +
							`${size === "sm" ? "h-10 text-sm" : ""} ` +
							`${size === "lg" ? "h-12 text-base" : ""} ` +
							`${isNullOrUndefined(size) ? "h-14 text-base" : ""} ` +
							`${
								outline && !filled && color === "red" && size === "xs"
									? "border border-solid px-2 py-1.5 hover:bg-error-backdrop hover:text-error"
									: ""
							} ` +
							`${
								outline && !filled && color === "black" && size === "xs"
									? "border border-solid border-black-quin px-2 py-1.5 text-black-secondary hover:text-black"
									: ""
							} ` +
							`${
								outline && !filled && color === "red" && size !== "xs"
									? "border border-solid border-black-quin px-4 py-3 hover:bg-error-backdrop hover:text-error"
									: ""
							} ` +
							`${
								outline && !filled && color === "black" && size !== "xs"
									? "border border-solid border-black-quin text-black-secondary hover:text-black"
									: ""
							} ` +
							`${
								outline && !filled && color !== "red" && color !== "black" && !noHoverBg && !noTextHover
									? "px-2 py-1.5 hover:bg-blue-senary hover:text-blue"
									: ""
							} ` +
							`${outline && !filled && !outlineBorder && color !== "black" && color !== "red" ? "lg:hover:border-blue" : ""} ` +
							`${
								outline && !filled && !outlineBorder && color !== "black" && color !== "red" && !noTextHover ? "hover:text-blue" : ""
							} ` +
							`${
								active && placement === "center" && !outlineBorder && color !== "black" && color !== "red"
									? "rounded-b-none rounded-t-lg border-blue text-blue"
									: ""
							}` +
							`${active && !filled && color === "black" ? "border-black-quin text-black-secondary" : ""} ` +
							`${active && !filled && color === "red" ? "border-error text-error" : ""} ` +
							`${active && !filled && color !== "red" && color !== "black" ? "border-blue text-blue" : ""} ` +
							`${active && outlineBorder ? "bg-blue-senary" : ""} ` +
							`${!active && value ? "border-black-quin text-black-secondary" : ""} ` +
							`${
								outlineBorderHover && !filled && !active
									? "text-black-tertiary hover:border-black-secondary hover:text-black-secondary "
									: ""
							} ` +
							`${active && outlineBorderHover ? "border border-black-quin text-black" : ""} ` +
							`${noOutlineBorder && color !== "red" ? "border-transparent focus:border-blue-focused" : ""} ` +
							`${noOutlineBorder && color === "red" ? "border-transparent " : ""} ` +
							`${isHover && outline && !filled && color === "red" ? "bg-error-backdrop text-error" : ""} `
						}
						tabIndex={0}
						onClick={(e) => {
							e.preventDefault();
							setActive((prev) => !prev);
						}}
						onKeyDown={handleKeypress}
					>
						<div className="flex items-center justify-start">
							{placeholderIcon}
							<div className={`${placeholderIcon ? "ml-2" : ""}`}>{placeholder}</div>
						</div>
						<span className="ml-2 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
							{placeholderClose}
						</span>

						{isLoading && (
							<span className="ml-2  flex items-center justify-center">
								<TailSpin color={color === "red" ? "#C5046C" : "#5466F9"} height={15} width={15} />
							</span>
						)}

						{!isLoading && !isFilterOpen && (
							<span
								className={
									`flex items-center justify-center duration-150 ease-in-out ` +
									`${!isSelected ? "rotate-0" : ""} ` +
									`${isSelected && color === "red" ? "text-error" : ""} ` +
									`${active ? "!-rotate-180" : ""} ` +
									`${active && color === "red" ? "text-error" : ""} ` +
									`mt-0.5 ${size === "xs" ? "h-2.5 w-2.5" : "ml-2 h-3.5 w-3.5"} `
								}
							>
								<ArrowDownIcon className="h-3.5 w-3.5 stroke-current" />
							</span>
						)}

						{!isLoading && !isSelected && isFilterOpen && (
							<span
								className={
									`flex transform items-center justify-center transition-transform duration-150 ease-in-out ` +
									`${!isSelected ? "rotate-0" : ""} ` +
									`${isSelected && color === "red" ? "text-error" : ""} ` +
									`${active ? "-rotate-180" : ""} ` +
									`${active && color === "red" ? "text-error" : ""} ` +
									`mt-0.5 ${size === "xs" ? "h-2.5 w-2.5" : "ml-2 h-3.5 w-3.5"} `
								}
							>
								<CancelIcon className="stroke-current" />
							</span>
						)}
					</div>
				</>
			)}

			<div
				className={
					`absolute z-60 w-full transform bg-white shadow transition-none duration-300 ease-in-out ` +
					`${!noOverflow ? "overflow-auto " : ""} ` +
					`${positionTop ? "bottom-full" : "top-full"} ` +
					`${placement !== "center" ? "min-w-max" : ""} ` +
					`${placement === "right" ? `right-0 rounded-lg ${positionTop ? "mb-1 origin-bottom-right" : "mt-1 origin-top-right"}` : ""} ` +
					`${placement === "center" ? `left-0 rounded-b-lg ${positionTop ? "origin-bottom" : "origin-top"}` : ""} ` +
					`${
						placement !== "center" && placement !== "right"
							? `left-0 ${positionTop ? "mb-1 origin-bottom-left rounded-b-lg" : "mt-1 origin-top-left rounded-lg"}`
							: ""
					} ` +
					`${filled ? "min-w-12 " : ""} ` +
					`${icon || !outline ? "min-w-12  rounded-lg" : ""} ` +
					`${active ? "scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0"} ` +
					`${fitDropdown ? "max-h-fit" : ""} `
				}
			>
				{isSearchable && handleChangeSearchTerm && (
					<div className="flex h-14 w-full items-center justify-start px-4">
						<SearchBar placeholder={searchPlaceholder} value={searchTerm} onChange={handleChangeSearchTerm} />
					</div>
				)}
				<div
					className="w-full"
					onClick={() => {
						if (clickAndClose) {
							setActive((prev) => !prev);
						}
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
}

export default DropdownHead;
