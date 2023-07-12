import DropdownHead from "../DropdownComponents/DropdownHead";
import {ReactComponent as HorizontalLineDropdownIcon} from "../../../../assets/svg-new/general/horizontal-dotted-line.svg";
import {ReactComponent as LineDropdownIcon} from "../../../../assets/svg/TeamMember/LineDropdownIcon.svg";
import React from "react";

interface Props {
	size?: "xs" | "sm" | "lg";
	children: React.ReactNode;
	placement?: "right" | "left";
	isHorizontal?: boolean;
	outlineBorder?: boolean;
}

function LineDropdown(props: Props): JSX.Element {
	return (
		<DropdownHead
			placeholder={
				props.isHorizontal ? (
					<HorizontalLineDropdownIcon className="pointer-events-none stroke-current text-current ease-in-out" />
				) : (
					<LineDropdownIcon className="pointer-events-none fill-current text-current ease-in-out" />
				)
			}
			size={props.size || "xs"}
			outlineBorder={props.outlineBorder}
			placement={props.placement || "right"}
			clickAndClose
			icon
		>
			{props.children}
		</DropdownHead>
	);
}

export default LineDropdown;
