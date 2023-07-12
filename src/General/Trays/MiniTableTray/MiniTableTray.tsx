import React from "react";
import useClickOutside from "../../../../hooks/useClickOutside";
interface Props {
	active: boolean;
	dataType: string;
	children: React.ReactNode;
	withClickOutside?: boolean;
	handleReset: () => void;
}

function MiniTableTray(props: Props): JSX.Element {
	const domNode = useClickOutside(
		() => {
			props.withClickOutside && props.handleReset && props.handleReset();
		},
		(eventTarget: HTMLElement) => !!(eventTarget.dataset.type !== props.dataType && !eventTarget.dataset.type?.includes(props.dataType)),
		["mousedown", "keydown"]
	);

	return (
		<>
			<div
				className={
					`fixed right-0 top-0 z-50 flex h-full max-h-full w-full flex-col items-start justify-start rounded-tl-lg bg-black-secondary shadow-custom 2xs:absolute 2xs:right-0.5 2xs:top-0 2xs:max-w-sm ` +
					`m-0 origin-right transform bg-white transition duration-500 ease-in-out ` +
					`${props.active ? "translate-x-0 " : "pointer-events-none translate-x-105 opacity-0 "} `
				}
				data-type={props.dataType}
				ref={props.withClickOutside ? domNode : undefined}
			>
				<div className="flex h-full w-full flex-col" data-type={props.dataType}>
					{props.children}
				</div>
			</div>
		</>
	);
}

export default MiniTableTray;
