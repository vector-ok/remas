import React, {PropsWithChildren, ReactElement, useCallback, useState} from "react";
import {ReactComponent as RightIcon} from "../../../../assets/svg/RightIcon.svg";
import DropdownLink from "../../Dropdown/DropdownComponents/DropdownLink";

interface Props<ObjectType> {
	type: keyof ObjectType & string;
	DropdownComponent: ReactElement;
}

function FilterRow<ObjectType>(props: PropsWithChildren<Props<ObjectType>>): JSX.Element {
	const [isHover, setIsHover] = useState<boolean>(false);

	const handleMouseEnter = useCallback(() => {
		setIsHover(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsHover(false);
	}, []);

	return (
		<>
			<div className="relative w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<DropdownLink>
					<div className="flex w-full flex-row items-center justify-between px-4">
						<span className="text-sm">{props.type}</span>
						<RightIcon />
					</div>
				</DropdownLink>
				<div
					className={
						`absolute left-52 top-0 h-fit max-h-84 w-56 flex-col rounded-b-lg rounded-r-lg bg-white py-2 shadow ` +
						`${!isHover ? "hidden" : "flex"}`
					}
				>
					{props?.DropdownComponent}
				</div>
			</div>
		</>
	);
}

export default FilterRow;
