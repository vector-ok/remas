import React from "react";

interface Props {
	children: React.ReactNode;
	dataType: string;
}
function MiniTableTrayBody(props: Props): JSX.Element {
	return (
		<div className="relative flex h-full max-h-full w-full flex-1 flex-col overflow-hidden" data-type={props.dataType}>
			<div className="absolute left-0 top-0 h-full w-full overflow-auto pb-6" data-type={props.dataType}>
				{props.children}
			</div>
		</div>
	);
}

export default MiniTableTrayBody;
