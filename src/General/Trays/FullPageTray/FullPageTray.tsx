import React from "react";
import useClickOutside from "../../../../hooks/useClickOutside";
interface Props {
	active: boolean;
	children: React.ReactNode;
	dataType: string;
	withClickOutside?: boolean;
	handleReset?: () => void;
}
function FullPageTray(props: Props): JSX.Element {
	const domNode = useClickOutside(
		() => {
			props.withClickOutside && props.handleReset && props.handleReset();
		},
		(eventTarget: HTMLElement) => !!(eventTarget.dataset.type !== props.dataType || !eventTarget.dataset.type.includes(props.dataType)),
		// (eventTarget: HTMLElement) => !!(eventTarget.dataset.type !== props.dataType && eventTarget.dataset.type !== `${props.dataType}-active`),
		["mousedown", "keydown"]
	);

	return (
		<>
			<div
				className={`-moz-h-fit-available -webkit-h-fit-available -ms-h-fit-available fixed right-0 top-0 z-50 m-0 flex h-full w-full max-w-md transform flex-col items-start justify-start bg-white shadow-lg transition duration-150 ease-in-out ${
					props.active ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-12 opacity-0"
				} `}
				ref={props.withClickOutside ? domNode : undefined}
				data-type={props.dataType}
			>
				{props.children}
			</div>
		</>
	);
}

export default FullPageTray;
