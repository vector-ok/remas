import React, {useEffect, useState} from "react";

import CurrencyCode from "./CurrencyCode";
import {IRootState} from "../../redux/rootReducer";
import {MainInitState} from "../../redux/init/slice/initSlice.types";
import isNullOrUndefined from "../../utils/isNullOrUndefined";
import {useSelector} from "react-redux";

interface Props {
	value: string | number;
}

function Fee({value}: Props): JSX.Element {
	const main = useSelector((state: IRootState) => state.init.main);
	const fees = useSelector((state: IRootState) => (state.init.main as MainInitState).meta.transferCharges);

	const [fee, setFee] = useState<string>("");

	useEffect(() => {
		let valueToEdit: number;

		if (isNullOrUndefined(value)) {
			return setFee("");
		}

		if (typeof value === "string") {
			const newValue = String(value).replace(new RegExp(`[^0-9.]`, "gi"), "");
			valueToEdit = Number(newValue);
		} else {
			valueToEdit = value;
		}

		if (valueToEdit <= 5000) return setFee(String(fees[1]));
		if (valueToEdit <= 50000) return setFee(String(fees[2]));
		if (valueToEdit > 50000) return setFee(String(fees[3]));
	}, [value]);

	return (
		<span>
			{<CurrencyCode currency={main?.companyDetails.accounts ? main?.companyDetails.accounts[0]?.bankAccount?.currency : undefined} />}
			{fee}{" "}
		</span>
	);
}

export default Fee;
