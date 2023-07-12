import React from "react";

interface Props {
	children: React.ReactNode;
	dataType: string;
}
function FullPageTrayBody(props: Props): JSX.Element {
	return (
		<div
			className="relative mx-auto flex w-full flex-grow flex-col items-start justify-start overflow-hidden overflow-y-auto px-7 pt-4"
			data-type={props.dataType}
			id="scroller"
		>
			{props.children}
		</div>
	);
}

export default FullPageTrayBody;
