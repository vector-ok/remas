import {DropdownItem, DropdownItemValueType} from "../../../../helpers/types";

import React from "react";

interface Props<T extends DropdownItemValueType> {
	content: DropdownItem<T>;
}

function DropdownLinkContent<T extends DropdownItemValueType>(props: Props<T>): JSX.Element {
	return (
		<div className={"flex items-center px-4 " + `${props.content.rightIcon ? "justify-between" : "justify-start"}`}>
			<div className="flex w-full items-center justify-start">
				{props.content.leftIcon && (
					<span className="w-6">
						{React.cloneElement(props.content.leftIcon, {className: "stroke-current", "data-type": "section", tabIndex: -1})}
					</span>
				)}
				<span className={"text-sm " + `${props.content.leftIcon ? "ml-3" : ""}`}>{props.content.text}</span>
			</div>
			{props.content.rightIcon && (
				<span className="w-max">
					{React.cloneElement(props.content.rightIcon, {className: "stroke-current", "data-type": "section", tabIndex: -1})}
				</span>
			)}
		</div>
	);
}

export default DropdownLinkContent;
