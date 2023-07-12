import React from "react";

interface Props {
	children: React.ReactNode;
	dataType: string;
}
function FullPageTrayFooter(props: Props): JSX.Element {
	return (
		<div className="flex w-full flex-row items-center justify-center border-t-0.2 py-4" data-type={props.dataType} id="scroller">
			{props.children}
		</div>
	);
}

export default FullPageTrayFooter;
