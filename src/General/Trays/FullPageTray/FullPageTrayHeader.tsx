import {ReactComponent as ArrowBack} from "../../../../assets/svg/Cards/arrowback.svg";
import {ReactComponent as GrayCloseIcon} from "../../../../assets/svg/General/CloseIcon.svg";
import React from "react";

interface Props {
	menu?: React.ReactNode;
	dataType: string;
	children: React.ReactNode;
	subTitle?: React.ReactNode;
	toggler: () => void;
}
function FullPageTrayHeader(props: Props): JSX.Element {
	return (
		<div className="relative flex w-full items-center justify-start px-7 py-6" data-type={props.dataType}>
			<div className="relative flex w-full items-center justify-start" data-type={props.dataType}>
				{props.menu && (
					<>
						<div className="flex w-full flex-col items-center justify-start">
							<div className="flex w-full flex-row items-center justify-between" data-type={props.dataType}>
								<div className="flex w-full flex-row items-center justify-start" data-type={props.dataType}>
									<button
										className="outline-none focus:outline-none -ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-opacity-0 transition-all hover:bg-blue-senary hover:bg-opacity-100"
										onClick={props.toggler}
										data-type={props.dataType}
									>
										<ArrowBack className="stroke-current text-black-tertiary" data-type={props.dataType} />
									</button>
									<p className="max-w-15 pl-2 text-lg font-bold capitalize text-black-secondary" data-type={props.dataType}>
										{props.children}
									</p>
								</div>
								{props.menu && props.menu}
							</div>
							{props.subTitle && (
								<div className="ml-20 flex w-full flex-col items-start justify-start">
									<p className="max-w-15 text-sm text-black-tertiary" data-type={props.dataType}>
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
								<p className="max-w-15 text-lg font-bold capitalize text-black-secondary" data-type={props.dataType}>
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
								<div className="flex w-full flex-col items-start justify-start">
									<p className="max-w-15 text-sm text-black-tertiary" data-type={props.dataType}>
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

export default FullPageTrayHeader;
