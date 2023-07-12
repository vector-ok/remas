import React from "react";
import DropdownLink, {DropdownLinkProps} from "./DropdownLink";
import * as H from "history";
import {Link} from "react-router-dom";

interface Props extends Omit<DropdownLinkProps, "isLink" | "children"> {
	text: string;
	icon: React.ReactNode;
	to?: H.LocationDescriptor;
}

function LineDropdownLinkContent(props: {text: string; icon: React.ReactNode}): JSX.Element {
	return (
		<div className="flex h-full w-full flex-row items-center justify-start px-4">
			<span>{props.icon}</span>
			<span className="ml-4 text-sm">{props.text}</span>
		</div>
	);
}

function LineDropdownLink(props: Props): JSX.Element {
	return (
		<DropdownLink isLink={false} {...props}>
			{props.to ? (
				<Link to={props.to}>
					<LineDropdownLinkContent text={props.text} icon={props.icon} />
				</Link>
			) : (
				<LineDropdownLinkContent text={props.text} icon={props.icon} />
			)}
		</DropdownLink>
	);
}

export default LineDropdownLink;
