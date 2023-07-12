import SimpleDropdownLink from "../../Dropdown/DropdownComponents/SimpleDropdownLink";
import LineDropdown from "../../Dropdown/LineDropdown/LineDropdown";
import {ReactComponent as DeleteIcon} from "../../../../assets/svg/People/DeleteIcon.svg";
import {ReactComponent as Edit} from "../../../../assets/svg/General/Edit/InactiveEdit.svg";

export default function HamburgerMenu() {
	return (
		<div className="z-10">
			<LineDropdown>
				<SimpleDropdownLink
					content={{
						text: "Edit Item",
						leftIcon: <Edit className="stroke-current" />,
						value: null,
					}}
				/>
				<SimpleDropdownLink
					content={{
						text: "Remove Item",
						leftIcon: <DeleteIcon className="stroke-current ease-in-out" />,
						value: null,
					}}
				/>
			</LineDropdown>
		</div>
	);
}
