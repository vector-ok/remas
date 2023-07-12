import {useCallback, useState} from "react";

interface SwitchProps {
	size?: "sm" | "xl";
	isActive: boolean;
	activeText?: string;
	inactiveText?: string;
	activeColor?: string;
	onToggle: (state: boolean) => void;
}

function ToggleSwitch({isActive = false, size = "sm", activeText, inactiveText, activeColor, onToggle}: SwitchProps): JSX.Element {
	const [active, setActive] = useState(false);

	const handleToggle = useCallback(() => {
		setActive((prev) => !prev);
		onToggle(!active);
	}, [active]);

	const getMaxWord = useCallback((word1: string, word2: string): string => {
		return word1.length > word2.length ? word1 : word2;
	}, []);

	return (
		<div
			role="checkbox"
			tabIndex={0}
			onClick={handleToggle}
			aria-checked={active ? "true" : "false"}
			className={
				`relative flex cursor-pointer items-center rounded-full px-1.5 ` +
				`${active ? activeColor || "bg-blue" : "justify-end bg-grey"} ` +
				`${size === "sm" ? "h-5 w-9  " : "h-10 w-max "} `
			}
		>
			<div
				className={
					`absolute transform rounded-full bg-white duration-1000 ease-out ` +
					`${active ? "right-0.5" : "left-0.5"} ` +
					`${size === "sm" ? "h-4 w-4  " : "h-8 w-8 "} `
				}
			/>
			{activeText && inactiveText && size === "xl" && (
				<div className="relative w-max select-none">
					{/* <p className={`pointer-events-none ml-3 pr-4 opacity-0 ` + `${size === "sm" ? " pl-4  " : "pl-8 "} `}> */}
					<p className="pointer-events-none ml-3 pl-8 pr-4 opacity-0">{getMaxWord(activeText, inactiveText)}</p>
					{!active && (
						<p
							className={
								`absolute left-0 top-0 h-full w-max font-medium text-black-tertiary ` +
								`ml-8 mr-4 pl-3 ` +
								`flex items-center justify-start `
							}
							// `${size === "sm" ? " ml-4  " : "ml-8 "} `
						>
							{inactiveText}
						</p>
					)}
					{active && (
						<p className={`absolute left-0 top-0 h-full w-full pl-4 font-medium text-white ` + `flex items-center justify-start `}>
							{activeText}
						</p>
					)}
				</div>
			)}
		</div>
	);
}

export default ToggleSwitch;
