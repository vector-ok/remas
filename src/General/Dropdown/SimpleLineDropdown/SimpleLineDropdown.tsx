import {DropdownItem, DropdownItemValueType} from "../../../../helpers/types";

import DropdownHead from "../DropdownComponents/DropdownHead";
import {ReactComponent as HorizontalLineDropdownIcon} from "../../../../assets/svg-new/general/horizontal-dotted-line.svg";
import {ReactComponent as LineDropdownIcon} from "../../../../assets/svg/TeamMember/LineDropdownIcon.svg";
import SimpleDropdownLink from "../DropdownComponents/SimpleDropdownLink";

interface Props<T extends DropdownItemValueType> {
	size?: "xs" | "sm" | "lg";
	options: Array<DropdownItem<T>>;
	placement?: "right" | "left";
	isHorizontal?: boolean;
	outlineBorder?: boolean;

	onSelect: (_value: T) => void;
}

function SimpleLineDropdown<T extends DropdownItemValueType>(props: Props<T>): JSX.Element {
	return (
		<DropdownHead
			placeholder={
				props.isHorizontal ? (
					<HorizontalLineDropdownIcon className="pointer-events-none fill-current text-current ease-in-out" />
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
			{props.options && props.options.map((_option, _index) => <SimpleDropdownLink key={_index} content={_option} />)}
		</DropdownHead>
	);
}

export default SimpleLineDropdown;
