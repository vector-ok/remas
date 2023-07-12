import React, {useEffect, useState} from "react";

import {ReactComponent as Check} from "../../../assets/svg/checkbox-check.svg";
import isNullOrUndefined from "../../../utils/isNullOrUndefined";

interface Props {
	id: string;
	text?: React.ReactNode;
	size?: "sm" | "md";
	checked?: boolean;
	truncate?: boolean;
	readOnly?: boolean;
	func?: () => void;
}

function Checkbox(props: Props): JSX.Element {
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const {truncate = false} = props;

	useEffect(() => {
		if (isNullOrUndefined(props.checked)) return;
		setIsChecked(props.checked);
	}, [props.checked]);

	const handleClick = () => {
		setIsChecked((prev) => !prev);
		props.func && props.func();
	};

	return (
		<>
			<div
				className={`flex flex-row items-center justify-start ` + `${props.readOnly ? "pointer-events-none" : "cursor-pointer"} `}
				onClick={handleClick}
				data-type="transaction"
			>
				<div data-type="transaction">
					<div
						className={
							`relative flex items-center justify-center rounded-md border border-solid border-black-tertiary transition-all duration-150 ` +
							`${props.size === "sm" ? "h-4 w-4" : "h-5 w-5"} ` +
							`${isChecked ? "border-blue bg-blue" : ""} ` +
							`${props.readOnly ? "border-black-quin" : ""} `
						}
						data-type="transaction"
					>
						<input
							className="absolute left-0 top-0 hidden h-full w-full placeholder-transparent outline-none focus:outline-none"
							checked={isChecked}
							type={"checkbox"}
							id={props.id}
							readOnly
							data-type="transaction"
						/>
						<Check
							className={
								`fill-current ` +
								`${isChecked ? "opacity-100" : "opacity-0"} ` +
								`${props.size === "sm" ? "w-2.5" : "w-3"} ` +
								`${props.readOnly && isChecked ? "text-grey-tertiary" : ""} ` +
								`${!props.readOnly && isChecked ? "text-white" : ""} ` +
								`${props.readOnly && !isChecked ? "" : ""} ` +
								`${!props.readOnly && !isChecked ? "" : ""}`
							}
							data-type="transaction"
						/>
					</div>
				</div>

				<div
					className={
						`pointer-events-none w-fit max-w-full pl-2 ` +
						`${truncate ? "overflow-hidden overflow-ellipsis whitespace-nowrap leading-none" : "leading-4"} ` +
						`${props.readOnly ? "text-black-tertiary" : " text-black-secondary"} ` +
						`${props.size === "sm" ? "text-sm" : "text-base"} `
					}
					data-type="transaction"
				>
					{props.text || ""}
				</div>
			</div>
		</>
	);
}

export default Checkbox;
