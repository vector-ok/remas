import {PropsWithChildren, useCallback, useRef, useState} from "react";

import ButtonComp from "../Buttons/ButtonComp";
import DropdownHead from "../Dropdown/DropdownComponents/DropdownHead";
import FilterRow from "./filterRow/filterRow";

interface IFilter<ObjectType, IFilterState> {
	handleClearAll: () => void;
	handleFilteredDetails: (filterState: IFilterState) => void;
	filterArray: ObjectType[];
	selectedFilterState: IFilterState;
	filterState: IFilterState;
	setFilterState: (filterState: IFilterState) => any;
	// dropdowns: IDropDowns;
}

// NB: selectedFilterState : {
//     offset: number;
//     date: TransactionDateObj;
//     transactionTypes: TransactionType[];
//     userGroupIds: string[];
//     userAccountIds: string[];
//     categoryIds: string[];
//     cardIds: string[];
//     transactionStatuses: TransactionStatus[];
//     query: string;
// }

export default function Filter<ObjectType extends {id: number}, IFilterState>(props: PropsWithChildren<IFilter<ObjectType, IFilterState>>) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const domRef = useRef<HTMLDivElement | null>(null);

	const handleApplyFilter = useCallback(() => {
		setIsOpen(false);
		props?.handleFilteredDetails(props.filterState);
	}, [props.filterState]);

	const handleClearAll = useCallback(() => {
		setIsOpen(false);
		props?.handleClearAll();
	}, []);

	const handleOpenFilter = useCallback(() => {
		setIsOpen(true);
	}, []);

	const handleCloseFilter = useCallback(() => {
		setIsOpen(false);
		// dispatch(props.setFilterState(props.selectedFilterState));
	}, [props.selectedFilterState]);

	const handleAdditionalCheck = useCallback((target: HTMLElement): boolean => {
		return !domRef.current?.contains(target);
	}, []);
	return (
		<div className="w-full" ref={domRef}>
			<div className="m-auto flex w-full flex-row">
				<DropdownHead
					placeholder={<span className="text-sm">Filter</span>}
					size="sm"
					placeholderClose={undefined}
					icon={false}
					placement={"center"}
					outlineBg={false}
					outlineBorder={false}
					outlineBorderHover={false}
					noOutlineBorder={false}
					noHoverBg={false}
					value={false}
					filled={false}
					isLoading={false}
					isActive={isOpen}
					handleOpen={handleOpenFilter}
					handleClose={handleCloseFilter}
					handleAdditionalCheck={handleAdditionalCheck}
					fitDropdown
					noOverflow
					color={""}
				>
					<div className="w-full py-4">
						<div className="flex flex-row items-center justify-between px-4 pb-2 ">
							<div className="flex h-full max-w-sm flex-row items-center justify-start text-base text-black">Filters</div>
							<ButtonComp buttonType="tertiary" color="blue" size="sm" disable={true} func={handleClearAll}>
								<span className="text-xs">Clear all</span>
							</ButtonComp>
						</div>

						{/* Filter Menu */}
						<div className="w-full">
							{props.filterArray.map((_filter, index) => (
								<FilterRow key={index} DropdownComponent={<></>} type={"Account"} />
							))}

							{/*{!props.isCardPreRelease &&
								accounts.length > 1 &&
								TransactionFiltersArray.map((_filter, index) => <FilterRow type={_filter} key={index} />)}
							{!props.isCardPreRelease &&
								accounts.length < 2 &&
								TransactionFiltersArray.filter((_el) => _el !== TransactionFilters.ACCOUNTS).map((_filter, index) => (
									<FilterRow type={_filter} key={index} />
								))}

							{props.isCardPreRelease &&
								!canShowPreReleaseFeatures &&
								accounts.length > 1 &&
								TransactionFiltersArray.filter((_el) => _el !== TransactionFilters.CARDS).map((_filter, index) => (
									<FilterRow type={_filter} key={index} />
								))}
							{props.isCardPreRelease &&
								!canShowPreReleaseFeatures &&
								accounts.length < 2 &&
								TransactionFiltersArray.filter((_el) => _el !== TransactionFilters.ACCOUNTS && _el !== TransactionFilters.CARDS).map(
									(_filter, index) => <FilterRow type={_filter} key={index} />
								)}*/}

							{/* Apply Button */}
							<div className="flex w-full items-center justify-end px-4 pt-2">
								<ButtonComp
									type="button"
									color="blue"
									ripple="light"
									buttonType="primary"
									size="sm"
									// isLoading={isTransactionPaginationLoading}
									func={handleApplyFilter}
								>
									<span className="text-xs">Apply Filter</span>
								</ButtonComp>
							</div>
						</div>
					</div>
				</DropdownHead>
			</div>
		</div>
	);
}
