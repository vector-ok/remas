import {ReactComponent as Comment} from "../../../assets/svg/General/Icons/message-text.svg";
import {ReactComponent as Download} from "../../../assets/svg/General/Icons/download.svg";
import {IconType} from "../../../helpers/AppConstants";
import {ReactComponent as NewPayment} from "../../../assets/svg/General/Icons/new-payment.svg";
import React from "react";
import {ReactComponent as Share} from "../../../assets/svg/General/Icons/share.svg";
import {TailSpin} from "react-loader-spinner";
import {ReactComponent as TransactionDetails} from "../../../assets/svg/General/Icons/transaction-details.svg";
import {ReactComponent as Upload} from "../../../assets/svg/General/Icons/upload.svg";

interface IconProps {
	icon: IconType;
	isLoading?: boolean;
}

function Icon({icon, isLoading}: IconProps): JSX.Element {
	return (
		<div className=" flex h-10 w-10 items-center justify-center rounded-full bg-blue-senary text-blue hover:text-blue">
			{isLoading ? (
				<TailSpin color="#5466F9" height={20} width={20} />
			) : icon === IconType.SHARE ? (
				<Share className="stroke-current " />
			) : icon === IconType.NEW_PAYMENT ? (
				<NewPayment className="stroke-current " />
			) : icon === IconType.UPLOAD ? (
				<Upload className="stroke-current" />
			) : icon === IconType.COMMENT ? (
				<Comment className="stroke-current" />
			) : icon === IconType.TRANSACTION_DETAILS ? (
				<TransactionDetails className="stroke-current" />
			) : (
				icon === IconType.DOWNLOAD && <Download className="stroke-current" />
			)}
		</div>
	);
}
export default Icon;
