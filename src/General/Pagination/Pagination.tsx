import {calculateOffset, parsePaginationData} from "./pagination.util";

import {ReactComponent as Arrow} from "../../../assets/svg/General/arrowDownIcon.svg";
import React from "react";
import formatNumber from "../../../utils/formatNumber";

interface Props {
	offset: number;
	total: number;
	groupSize: number;
	onSelect: (page: number, offset: number) => void;
	isLoading: boolean;
}

function Pagination(props: Props): JSX.Element {
	const {pages, items, hasNext, hasPrevious} = parsePaginationData(props.offset, props.total, props.groupSize);

	const paginate = (newPage: number) => {
		props.onSelect(newPage, calculateOffset(newPage, props.groupSize));
	};

	return (
		<>
			{!props.isLoading && props.total > 0 && props.groupSize > 0 && (
				<div className="relative h-16 w-full">
					<div className="absolute right-0.5 flex w-fit flex-row items-center justify-end py-4 text-black-tertiary opacity-100">
						<span>
							{formatNumber(items.start, false)} - {formatNumber(items.end, false)} of {formatNumber(items.total, false)}
						</span>

						<ul className="flex w-fit flex-row items-center justify-center" role="navigation" aria-label="Pagination">
							<li className={"previous " + `${hasPrevious ? "" : "pointer-events-none text-black-quin"}`}>
								<a
									tabIndex={hasPrevious ? 0 : -1}
									role="button"
									aria-disabled={hasPrevious ? "true" : "false"}
									aria-label="Previous page"
									rel="prev"
									onClick={() => {
										if (hasPrevious) {
											paginate(pages.current - 1);
										}
									}}
								>
									<div>
										<div className="flex h-7 w-7 items-center justify-center rounded-full pr-0.5 text-current transition-colors duration-150 ease-in-out hover:bg-black-quin">
											<Arrow className="w-3.5 origin-center rotate-90 transform stroke-current" />
										</div>
									</div>
								</a>
							</li>

							{/* <li className="break text-black-quin pointer-events-none">&ndash;</li> */}

							<li className={"next " + `${hasNext ? "" : "pointer-events-none text-black-quin"}`}>
								<a
									tabIndex={hasNext ? 0 : -1}
									role="button"
									aria-disabled={hasNext ? "true" : "false"}
									aria-label="Next page"
									rel="next"
									onClick={() => {
										if (hasNext) {
											paginate(pages.current + 1);
										}
									}}
								>
									<div>
										<div className="flex h-7 w-7 items-center justify-center rounded-full pl-0.5 text-current transition-colors duration-150 ease-in-out hover:bg-black-quin">
											<Arrow className="w-3.5 origin-center -rotate-90 transform stroke-current" />
										</div>
									</div>
								</a>
							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	);
}

export default Pagination;
