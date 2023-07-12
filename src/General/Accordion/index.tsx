import React, {ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";

import {ReactComponent as ChevronUpIcon} from "../../../assets/svg/Application/UnregBusiness/CheveronUpIcon.svg";
import {ReactComponent as GreenCheckIcon} from "../../../assets/svg/accordion-green-check.svg";
import {ReactComponent as GreyCheckIcon} from "../../../assets/svg/accordion-grey-check.svg";

// import useClickOutside from "../../../hooks/useClickOutside";

interface Props {
	header: ReactNode;
	subTitle?: string;
	subTitle2?: string;
	toggle?: () => void;
	isOpened?: boolean | undefined;
	isClosed?: boolean | undefined;
	hasCheck?: boolean | undefined;
	checkActive?: boolean | undefined;
	noPaddingTop?: boolean | undefined;
	children: ReactNode;
}

function Accordion(props: Props): JSX.Element {
	const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);
	// const [childHeight, setChildHeight] = useState<number>(0);
	const childDomRef = useRef<HTMLDivElement | null>(null);

	// const domNode = useClickOutside(() => {
	// setIsAccordionOpen(false);
	// props.toggle && props.toggle();
	// });
	// const domNode = useClickOutside(() => {
	// setActive(false), (eventTarget: HTMLElement) => eventTarget.dataset.type !== "transaction";
	// });

	// const domNode = useClickOutside(() => {
	// setIsAccordionOpen(false), (eventTarget: HTMLElement) => eventTarget.dataset.type !== "transaction";
	// });

	useLayoutEffect(() => {
		if (props.isOpened === undefined) return;
		if (!props.isOpened) return setIsAccordionOpen(false);
		setIsAccordionOpen(true);
	}, [props.isOpened]);

	useEffect(() => {
		if (!props.isClosed) return;
		setIsAccordionOpen(true);
	}, [props.isClosed]);

	// useEffect(() => {
	// if (!childDomRef.current) return;
	// setChildHeight(childDomRef.current.getBoundingClientRect().height);
	// }, [
	// childDomRef.current,
	// childDomRef.current?.getBoundingClientRect().width,
	// childDomRef.current?.getBoundingClientRect().height,
	// childDomRef.current?.clientHeight,
	// childDomRef.current?.offsetHeight,
	// ]);

	const handleToggleAccordion = useCallback(() => {
		setIsAccordionOpen((prev) => !prev);
		props.toggle && props.toggle();
	}, [props.toggle]);

	return (
		// <div className="w-full" ref={domNode}>
		<div className="w-full">
			<div className="w-full">
				<div
					className={
						`border0.2 border-box w-full cursor-pointer justify-between rounded-md border-grey-secondary ` +
						`${props.noPaddingTop ? "" : ""} `
					}
					onClick={handleToggleAccordion}
				>
					<div className="text-md flex cursor-pointer flex-row items-center justify-between font-normal">
						<div className="text-md flex flex-col justify-start font-medium text-black-secondary">
							<div className="flex items-start justify-start">
								<div className="mt-0.5">
									{props.hasCheck && props.checkActive && <GreenCheckIcon />}
									{props.hasCheck && !props.checkActive && <GreyCheckIcon />}
								</div>
								<span className={`${props.hasCheck ? "ml-2" : ""}`}>{props.header}</span>
							</div>
							{props.subTitle && (
								<div className="text-sm font-normal text-black-tertiary">
									{props.subTitle} <br />
									{props.subTitle2}
								</div>
							)}
						</div>
						<div className={`ml-4 transform cursor-pointer duration-300 ` + `${!isAccordionOpen ? "rotate-180" : ""} `}>
							<ChevronUpIcon />
						</div>
					</div>
				</div>
			</div>

			<div
				className={`w-full ` + `${isAccordionOpen ? `block pt-4` : "hidden"} `}
				// className={
				// `w-full px-4 ` +
				// `transition-all transform duration-150 ease-in-out ` +
				// `${isAccordionOpen ? `pt-4 opacity-100` : "max-h-0 opacity-0 pointer-events-none"} `
				// }
				// style={{
				// maxHeight: isAccordionOpen ? `${childHeight + 16}px` : "0px",
				// }}
			>
				<div className="w-full" ref={childDomRef}>
					{props.children}
				</div>
			</div>
		</div>
	);
}

export default Accordion;
