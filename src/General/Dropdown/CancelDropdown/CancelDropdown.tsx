import React from "react";
import DropdownHead from "../DropdownComponents/DropdownHead";
import {ReactComponent as Cancel} from "../../../../assets/svg/Transfer/Cancel.svg";

interface Props {
	placeholder: string;
	children: React.ReactNode;

	onCancel: () => void;
}

function CancelDropdown(props: Props): JSX.Element {
	return (
		<>
			<DropdownHead
				placeholder={<span className="text-xs">{props.placeholder}</span>}
				placeholderClose={
					<Cancel
						className="stroke-current text-black-tertiary hover:text-blue"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							props.onCancel();
						}}
					/>
				}
				size="sm"
				placement="left"
				noHoverBg={true}
				noTextHover={true}
			>
				{props.children}
			</DropdownHead>
		</>
	);
}

export default CancelDropdown;
