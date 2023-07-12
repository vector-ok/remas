import React, {useState} from "react";

import {ReactComponent as Copy} from "../../../assets/svg/General/Copy/copyIcon.svg";
import CopyToClipboard from "react-copy-to-clipboard";

interface Props {
	text: string;
	children?: React.ReactNode;
	withCopyIcon?: boolean;
	onClickedText?: string;
}
function Clipboard(props: Props): JSX.Element {
	const {withCopyIcon = true} = props;
	const [isCopied, setIsCopied] = useState<boolean>(false);
	//copy username
	const onCopyText = () => {
		const timeOut = setTimeout(() => setIsCopied(false), 1000);
		clearTimeout(timeOut);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 1000);
	};
	return (
		<>
			<CopyToClipboard text={props.text} onCopy={onCopyText}>
				<div className="relative">
					<div className="flex cursor-pointer flex-row items-center justify-start">
						{props.children && props.children}
						{withCopyIcon && (
							<div className="ml-2">
								<Copy className="h-5 w-6" />
							</div>
						)}
					</div>
					<div
						className={
							`absolute -right-12 -top-4 rounded-lg pr-10 ` +
							`${isCopied ? "animate__animated animate__fadeOutUp animate__infinite infinite block" : "hidden"} `
						}
					>
						<div className="text-xs font-normal">
							<div className="rounded-lg bg-grey-backdrop px-2 text-info-text">
								{props.onClickedText ? props.onClickedText : "Copied!"}
							</div>
						</div>
					</div>
				</div>
			</CopyToClipboard>
		</>
	);
}

export default Clipboard;
