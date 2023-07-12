import {ReactComponent as Error} from "../../../assets/svg/General/Toast/Error/Icon.svg";
import {ReactComponent as GrayCloseIcon} from "../../../assets/svg/General/CloseIcon.svg";
import {ReactComponent as Info} from "../../../assets/svg/General/Toast/Info/Icon.svg";
import React from "react";
import {ReactComponent as Success} from "../../../assets/svg/General/Toast/Success/Icon.svg";
import {ToastType} from "../../../helpers/AppConstants";
import {ReactComponent as Warning} from "../../../assets/svg/General/Toast/Warning/Icon.svg";

interface Props {
	children: React.ReactNode;
	subTitle?: string;
	dataType?: string | null;
	headingType?: ToastType;
	withImgSection?: boolean;

	onClose: () => void;
}

function ModalHeader(props: Props): JSX.Element {
	return (
		<>
			<div className="relative flex w-full items-start justify-between space-x-2 p-8 font-medium" data-type={props.dataType && props.dataType}>
				<div className="max-w-full pt-0.25" data-type={props.dataType && props.dataType}>
					<div
						className="flex flex-row items-start justify-start space-x-2 text-lg text-black"
						data-type={props.dataType && props.dataType}
					>
						{props.headingType && (
							<p data-type={props.dataType && props.dataType}>
								{props.headingType === ToastType.ERROR && <Error data-type={props.dataType && props.dataType} />}
								{props.headingType === ToastType.INFORMATION && <Info data-type={props.dataType && props.dataType} />}
								{props.headingType === ToastType.WARNING && <Warning data-type={props.dataType && props.dataType} />}
								{props.headingType === ToastType.SUCCESS_TOAST && <Success data-type={props.dataType && props.dataType} />}
							</p>
						)}

						<div className="leading-none" data-type={props.dataType && props.dataType}>
							{props.children}
						</div>
					</div>
					{props.subTitle && (
						<p
							className="break-words pt-2 text-left text-sm font-normal text-black-tertiary"
							data-type={props.dataType && props.dataType}
						>
							{props.subTitle}
						</p>
					)}
				</div>
				<div className="h-8 w-8" data-type={props.dataType && props.dataType}></div>
				{!props.withImgSection && (
					<button
						className="outline-none focus:outline-none absolute right-5.5 top-7 flex h-8 w-8 items-center justify-center rounded-full bg-opacity-0 transition-all hover:bg-blue-senary hover:bg-opacity-100"
						onClick={props.onClose}
						data-type={props.dataType && props.dataType}
					>
						<GrayCloseIcon className="h-3.5 w-3.5 stroke-current text-black-tertiary" data-type={props.dataType && props.dataType} />
					</button>
				)}
			</div>
		</>
	);
}

export default ModalHeader;
