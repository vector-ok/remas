import * as H from "history";

import {DropdownItem, DropdownItemValueType} from "../../../../helpers/types";
import DropdownLink, {DropdownLinkProps} from "./DropdownLink";

import DropdownLinkContent from "./DropdownLinkContent";
import {Link} from "react-router-dom";

interface Props<T extends DropdownItemValueType> extends Omit<DropdownLinkProps, "children"> {
	to?: H.LocationDescriptor;
	content: DropdownItem<T>;
}

function SimpleDropdownLink<T extends DropdownItemValueType>(props: Props<T>): JSX.Element {
	return (
		<DropdownLink {...props}>
			{props.to ? (
				<Link to={props.to}>
					<DropdownLinkContent content={props.content} />
				</Link>
			) : (
				<DropdownLinkContent content={props.content} />
			)}
		</DropdownLink>
	);
}

export default SimpleDropdownLink;
