import React from "react";
import {ReactComponent as ArrowBack} from "../../../../assets/svg/Cards/arrowback.svg";
import {ReactComponent as GrayCloseIcon} from "../../../../assets/svg/General/CloseIcon.svg";

interface Props {
	menu?: React.ReactNode;
	dataType: string;
	children: React.ReactNode;
	subTitle?: React.ReactNode;
	toggler: () => void;
}
function MiniTableTrayHeader(props: Props): JSX.Element {
	return (
		<div className="flex items-start justify-between p-6" data-type={props.dataType}>
			<div className="relative flex w-full items-center justify-start" data-type={props.dataType}>
				{props.menu && (
					<>
						<div className="flex w-full flex-col items-center justify-start">
							<div className="flex w-full flex-row items-center justify-between" data-type={props.dataType}>
								<div className="flex w-full flex-row items-center justify-start" data-type={props.dataType}>
									<button
										className="outline-none focus:outline-none flex h-8 w-8 items-center justify-center rounded-full bg-opacity-0 transition-all hover:bg-blue-senary hover:bg-opacity-100"
										onClick={props.toggler}
										data-type={props.dataType}
									>
										<ArrowBack className="stroke-current text-black-tertiary" data-type={props.dataType} />
									</button>
									<p className="max-w-2xs pl-2 text-base font-bold capitalize text-black-secondary" data-type={props.dataType}>
										{props.children}
									</p>
								</div>
								{props.menu && props.menu}
							</div>
							{props.subTitle && (
								<div className="-mt-1.5 ml-20 flex w-full flex-col items-start justify-start">
									<p className="max-w-2xs text-xs text-black-tertiary" data-type={props.dataType}>
										{props.subTitle}
									</p>
								</div>
							)}
						</div>
					</>
				)}
				{!props.menu && (
					<>
						<div className="flex w-full flex-col items-center justify-start">
							<div className="flex w-full flex-row items-center justify-between" data-type={props.dataType}>
								<p className="max-w-2xs text-base font-bold capitalize text-black-secondary" data-type={props.dataType}>
									{props.children}
								</p>
								<button
									className="outline-none focus:outline-none flex h-8 w-8 items-center justify-center rounded-full bg-opacity-0 transition-all hover:bg-blue-senary hover:bg-opacity-100"
									onClick={props.toggler}
									data-type={props.dataType}
								>
									<GrayCloseIcon className="h-3.5 w-3.5 stroke-current text-black-tertiary" data-type={props.dataType} />
								</button>
							</div>
							{props.subTitle && (
								<div className="-mt-1.5 flex w-full flex-col items-start justify-start">
									<p className="max-w-2xs text-xs text-black-tertiary" data-type={props.dataType}>
										{props.subTitle}
									</p>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default MiniTableTrayHeader;
