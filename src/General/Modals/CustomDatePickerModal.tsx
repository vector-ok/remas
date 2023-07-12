import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import {DateRange, RangeKeyDict} from "react-date-range";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import useDimension from "../../../hooks/useDimension";
import {IRootState} from "../../../redux/rootReducer";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ButtonComp from "../Buttons/ButtonComp";
import moment from "moment";

// interface CustomDatePickerModalInterface {
// active: boolean;
// toggle: () => void;
// filterFunc: (_data: TransactionDateObj) => void;
// }

interface CustomDateObj {
	startDate: Date;
	endDate: Date;
	key: string;
}

export default function CustomDatePickerModal(): JSX.Element {
	const dispatch = useDispatch();
	const {width} = useDimension();
	const isCustomModalOpen = useSelector((state: IRootState) => state.transactions.isCustomModalOpen);

	const [date, setDate] = useState<CustomDateObj[]>([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: "selection",
		},
	]);

	//reset filled
	useEffect(() => {
		if (!isCustomModalOpen) return;
		setDate([
			{
				startDate: new Date(),
				endDate: new Date(),
				key: "selection",
			},
		]);
	}, [isCustomModalOpen]);

	// const handleCloseCustomDatePicker = useCallback(() => {
	// 	dispatch(setIsCustomModalOpen(false));
	// }, []);

	// const handleDateRange = useCallback((_data: TransactionDateObj) => {
	// 	dispatch(
	// 		setTransactionDate({
	// 			name: TransactionDateTypes.CUSTOM,
	// 			date: {begin: _data.begin as string, end: _data.end as string},
	// 		})
	// 	);
	// }, []);

	return (
		<>
			<Modal size={width < 476 ? "fill" : "lg"} active={true} toggler={() => {}} dataType="inventory">
				<ModalHeader dataType="transaction" onClose={() => {}}>
					Choose a Date Range
				</ModalHeader>
				<ModalBody dataType="transaction">
					<div className="relative flex w-full items-center justify-center" data-type="transaction">
						<DateRange
							editableDateInputs={true}
							onChange={(rangesByKey: RangeKeyDict) => {
								setDate([
									(
										rangesByKey as unknown as {
											selection: {
												startDate: Date;
												endDate: Date;
												key: string;
											};
										}
									).selection,
								]);
							}}
							// showSelectionPreview={true}
							moveRangeOnFirstSelection={false}
							months={width > 768 ? 2 : undefined}
							maxDate={new Date()}
							ranges={date}
							direction="horizontal"
							data-type="transaction"
						/>
					</div>
				</ModalBody>

				<ModalFooter dataType="transaction">
					<div className="flex w-full flex-col space-y-4 2xs:w-max  2xs:flex-row 2xs:space-x-4 2xs:space-y-0" data-type="transaction">
						<div className="w-full 2xs:w-max" data-type="transaction">
							<ButtonComp
								type="button"
								buttonType="secondary"
								color="grey"
								ripple="light"
								fullWidth
								func={() => {}}
								dataType="transaction"
							>
								<span data-type="transaction">Cancel</span>
							</ButtonComp>
						</div>
						<div className="w-full 2xs:w-max" data-type="transaction">
							<ButtonComp
								type="button"
								color="blue"
								ripple="light"
								buttonType="primary"
								fullWidth
								dataType="transaction"
								func={() => {}}
							>
								<span data-type="transaction">Select Date</span>
							</ButtonComp>
						</div>
					</div>
				</ModalFooter>
			</Modal>
		</>
	);
}
