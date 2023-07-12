import {ReactNode, useEffect, useRef, useState} from "react";

import {ReactComponent as ArrowDownIcon} from "../../../assets/svg/General/arrowDownIcon.svg";
import {ReactComponent as CancelIcon} from "../../../assets/svg/Transfer/Cancel.svg";
import CurrencyCode from "../CurrencyCode";
import DropdownLink from "../Dropdown/DropdownComponents/DropdownLink";
import {IRootState} from "../../../redux/rootReducer";
import {parse} from "./MoneyInput";
import useClickOutside from "../../../hooks/useClickOutside";
import {useMoneyToNumber} from "../../../hooks/useMoneyToNumber";
import {useSelector} from "react-redux";

// use to generate a unique id for the input
let inputCounter = 0;

interface RateInputProps {
	value: string;
	size?: "sm" | "md" | "lg";
	isDisabled?: boolean;
	withCancel?: boolean;
	placeholder?: string;
	triggerLower?: boolean;

	onReset?: () => void;
	onChange(value: string): void;
}

function RateInput({
	value,
	size = "lg",
	withCancel = false,
	isDisabled = false,
	placeholder = undefined,
	triggerLower = false,

	onChange,
	onReset,
}: RateInputProps): JSX.Element {
	const currency = useSelector((state: IRootState) => state.init.main?.companyDetails.accounts[0]?.bankAccount?.currency);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const [active, setActive] = useState(false);
	const [dropdownActive, setDropdownActive] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [y, setY] = useState<number | null>(null);
	const [hasValue, setHasValue] = useState(false);
	const [isFlatRate, setIsFlatRate] = useState(false);
	const [uniqueId, setUniqueId] = useState<string>("");
	const [positionTop, setPositionTop] = useState(false);
	const [valueFormatted, setValueFormatted] = useState<string>("");

	const innerHeight = window.innerHeight;

	const domNode = useClickOutside(() => {
		setActive(false);
		setDropdownActive(false);
	});

	useEffect(() => {
		setUniqueId(`input-${++inputCounter}`);
	}, []);

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
		if (!value) return setValueFormatted("");
		const values = parse(value);
		setValueFormatted(values[1]);
	}, [value]);

	useEffect(() => {
		setHasValue(!!valueFormatted && String(valueFormatted).length > 0);
	}, [valueFormatted]);

	const handleSelectFlatRate = () => {
		setIsFlatRate(true);
	};
	const handleSelectPercentage = () => {
		setIsFlatRate(false);
	};
	const rateDropdown = (): ReactNode => {
		return (
			<>
				<div
					className="relative flex h-full w-max cursor-pointer items-center justify-start px-3"
					onClick={(e) => {
						// e.preventDefault();
						e.stopPropagation();
						setDropdownActive((prev) => !prev);
					}}
				>
					<span className="w-6 select-none">
						{isFlatRate && <CurrencyCode currency={currency} />}
						{!isFlatRate && "%"}
					</span>
					<span
						className={
							`mt-0.5 flex h-3.5 w-3.5 transform items-center justify-center transition-transform duration-150 ease-in-out ` +
							`${dropdownActive ? "-rotate-180" : ""} `
						}
					>
						<ArrowDownIcon className="h-3.5 w-3.5 stroke-current" />
					</span>
					<div
						className={
							`absolute left-0 z-60 w-full transform overflow-hidden rounded-lg bg-white shadow transition-none duration-300 ease-in-out ` +
							`max-h-fit ` +
							`${positionTop ? "bottom-full" : "top-full"} ` +
							`${positionTop ? "mb-1 origin-bottom" : "mt-1 origin-top"} ` +
							// `${placement !== "center" ? "min-w-max" : ""} ` +
							`${dropdownActive ? "scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0"} `
						}
					>
						<DropdownLink onClick={handleSelectFlatRate}>
							<div className="mr-[1px] flex w-full items-center justify-center px-4">
								<CurrencyCode currency={currency} />
							</div>
						</DropdownLink>
						<DropdownLink onClick={handleSelectPercentage}>
							<div className="flex w-full items-center justify-center px-4">%</div>
						</DropdownLink>
					</div>
				</div>
			</>
		);
	};
	return (
		<div
			className={
				`relative flex h-10 w-full flex-col items-center justify-start transition-all duration-300 ease-in-out ` +
				`${size === "lg" ? "h-12" : ""} ` +
				`${size === "md" ? "h-10" : ""} ` +
				`${size === "sm" ? "h-8" : ""} `
			}
			onClick={() => setActive(true)}
			ref={domNode}
		>
			<div
				className={
					"flex h-full w-full items-start justify-start rounded-lg border transition-all duration-300 ease-in-out  " +
					`${hasValue && active ? "border-blue lg:hover:border-blue lg:focus:border-blue" : ""} ` +
					`${hasValue && !active ? "border-black-quin text-black-secondary lg:hover:border-blue" : ""} ` +
					`${!hasValue && active ? "border-blue" : ""} ` +
					`${!hasValue && !active ? "border-black-quin text-black-tertiary lg:hover:border-blue lg:focus:border-blue" : ""} `
				}
				onMouseEnter={() => !isDisabled && setIsHover(true)}
				onMouseLeave={() => !isDisabled && setIsHover(false)}
			>
				{withCancel && rateDropdown()}
				<div
					className={
						"flex h-full w-full place-content-center items-center justify-start border-black-quin px-4 transition-all duration-300 ease-in-out  " +
						`${isHover || active ? "lg:border-blue" : ""} ` +
						`${withCancel ? "border-x" : "border-r"}`
					}
				>
					<input
						ref={inputRef}
						type="text"
						value={useMoneyToNumber(valueFormatted) ? valueFormatted : ""}
						onChange={(e) => {
							const values = parse(e.target.value);
							if (values[0] === 0) {
								return onChange && onChange("");
							}
							onChange && onChange(values[1]);
						}}
						className={`z-10 h-full w-full bg-white text-black-secondary placeholder-transparent focus:border-none focus:outline-none `}
						id={uniqueId}
						tabIndex={0}
					/>
				</div>
				{withCancel && (
					<div className="h-full cursor-pointer" onClick={onReset && onReset}>
						<div className="flex h-full w-11 items-center justify-center">
							<CancelIcon className="stroke-current" />
						</div>
					</div>
				)}
				{!withCancel && rateDropdown()}
				{placeholder && (
					<label
						htmlFor={uniqueId}
						className={
							"absolute z-10 ml-[1px] cursor-text duration-150 ease-in-out " +
							`${
								active || hasValue
									? " -top-[7px] left-2.5 bg-white px-1 text-xs"
									: "left-4 top-0 flex items-center justify-center text-base"
							} ` +
							`${active ? "text-blue" : ""} ` +
							`${isHover ? "lg:text-blue" : ""} ` +
							`${!active && hasValue ? "text-black-secondary" : ""} ` +
							`${!active && !hasValue ? "h-full text-black-tertiary" : ""} ` +
							`${isDisabled ? "text-black-quat " : ""} `
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
		</div>
	);
}

export default RateInput;
