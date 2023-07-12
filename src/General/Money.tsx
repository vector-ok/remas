import React, {useEffect, useState} from "react";

import Currency from "../../models/currency";
import formatNumber from "../../utils/formatNumber";
import isNullOrUndefined from "../../utils/isNullOrUndefined";

interface MoneyProps {
	amount: number;
	currency?: Currency | null | undefined;
	negative?: boolean;
	deleted?: boolean;
	className?: string;
	noSuperscript?: boolean;
	hideDecimalsIfZero?: boolean;
}

function Money({
	currency,
	amount,
	negative = false,
	deleted = false,
	className = "",
	noSuperscript = false,
	hideDecimalsIfZero = false,
}: MoneyProps): JSX.Element {
	const [formattedAmount, setFormattedAmount] = useState<string>("");
	const [formattedAmountSplit, setFormattedAmountSplit] = useState<[string, string]>(["", ""]);
	const [isZero, setIsZero] = useState<boolean>(false);

	useEffect(() => {
		// formattedAmount
		const formatted = formatNumber(Math.abs(amount), !hideDecimalsIfZero);
		setFormattedAmount(formatted);

		const split = formatted.split(".", 2);
		setFormattedAmountSplit([split[0], split[1]]);

		// isZero
		setIsZero(amount === 0);
	}, [amount]);

	return isNullOrUndefined(amount) ? (
		<span className={"inline-flex " + className}>&mdash;</span>
	) : (
		<span className={"inline-flex " + `${deleted ? "line-through" : ""} ` + className}>
			{(negative || amount < 0) && <span className="mr-0.5 leading-none">&ndash;</span>}
			<span className="mr-0.5 leading-none" dangerouslySetInnerHTML={{__html: Currency.getCurrencyString(currency)}} />
			{noSuperscript ? (
				<span className="leading-none">{formattedAmount}</span>
			) : (
				<>
					<span className="leading-none">{formattedAmountSplit[0]}</span>
					{!isZero && formattedAmountSplit[1] && <span className={"self-start text-xs leading-none"}>.{formattedAmountSplit[1]}</span>}
				</>
			)}
		</span>
	);
}

export default Money;
