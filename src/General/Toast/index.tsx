import React, {useEffect, useState} from "react";
import {ToastItem, ToastType} from "../ToastContainer";

import {ReactComponent as Error} from "../../../assets/svg/General/Toast/Error/Icon.svg";
import {ReactComponent as ErrorCancel} from "../../../assets/svg/General/Toast/Error/Cancel.svg";
import {ReactComponent as Info} from "../../../assets/svg/General/Toast/Info/Icon.svg";
import {ReactComponent as InfoCancel} from "../../../assets/svg/General/Toast/Info/Cancel.svg";
import {ReactComponent as Success} from "../../../assets/svg/General/Toast/Success/Icon.svg";
import {ReactComponent as SuccessCancel} from "../../../assets/svg/General/Toast/Success/Cancel.svg";
import {ReactComponent as Warning} from "../../../assets/svg/General/Toast/Warning/Icon.svg";
import {ReactComponent as WarningCancel} from "../../../assets/svg/General/Toast/Warning/Cancel.svg";
import {useDispatch} from "react-redux";

interface ToastProps {
	data: ToastItem;
}

function Toast({data}: ToastProps): JSX.Element {
	const [displayToast, setDisplayToast] = useState(false);
	const [remove, setRemove] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			setDisplayToast(true);
		}, 100);
	}, []);

	// Remove error in a second and a half
	useEffect(() => {
		if (!displayToast) return;
		const timeOut = setTimeout(() => {
			setDisplayToast(false);
		}, 5000);
		return () => {
			clearTimeout(timeOut);
		};
	}, [displayToast]);

	useEffect(() => {
		if (remove) return;
		const timeOut = setTimeout(() => {
			setRemove(true);
		}, 5500);
		return () => {
			clearTimeout(timeOut);
		};
	}, [dispatch, remove]);

	return (
		<div
			className={`mb-4 flex w-full max-w-sm transform flex-row items-start justify-start space-x-4 rounded-lg px-4 py-4 text-center transition-all duration-700 2xs:w-max 2xs:justify-center 2xs:py-2 ${
				data.type === ToastType.ERROR
					? " bg-error-backdrop text-error"
					: data.type === ToastType.INFORMATION
					? "bg-info-backdrop text-info"
					: data.type === ToastType.WARNING
					? "bg-warning-backdrop text-warning"
					: "bg-success-backdrop text-success"
			} ${displayToast ? "pointer-events-auto translate-x-0 opacity-100" : " pointer-events-none translate-x-12 opacity-0 "} 
			${remove ? "hidden " : ""}
			`}
			data-type="transaction"
		>
			<div className="flex items-center justify-center rounded-full" data-type="transaction">
				<span data-type="transaction">
					{data.type === ToastType.ERROR ? (
						<Error data-type="transaction" />
					) : data.type === ToastType.INFORMATION ? (
						<Info data-type="transaction" />
					) : data.type === ToastType.WARNING ? (
						<Warning data-type="transaction" />
					) : (
						<Success data-type="transaction" />
					)}
				</span>
			</div>
			<div className="pointer-events-none text-left text-sm  font-normal " data-type="transaction">
				{data.message}
			</div>{" "}
			<span
				className="hidden h-5 w-5 cursor-pointer items-center justify-center 2xs:flex"
				onClick={() => {
					setDisplayToast(false);
				}}
				data-type="transaction"
			>
				{data.type === ToastType.ERROR ? (
					<ErrorCancel data-type="transaction" />
				) : data.type === ToastType.INFORMATION ? (
					<InfoCancel data-type="transaction" />
				) : data.type === ToastType.WARNING ? (
					<WarningCancel data-type="transaction" />
				) : (
					<SuccessCancel data-type="transaction" />
				)}
			</span>
			<span
				className="absolute right-4 top-0 flex h-full w-max cursor-pointer items-center justify-center 2xs:pointer-events-none 2xs:hidden"
				onClick={() => {
					setDisplayToast(false);
				}}
				data-type="transaction"
			>
				<div className="flex h-5 w-5 items-center justify-center">
					{data.type === ToastType.ERROR ? (
						<ErrorCancel data-type="transaction" />
					) : data.type === ToastType.INFORMATION ? (
						<InfoCancel data-type="transaction" />
					) : data.type === ToastType.WARNING ? (
						<WarningCancel data-type="transaction" />
					) : (
						<SuccessCancel data-type="transaction" />
					)}
				</div>
			</span>
		</div>
	);
}

export default Toast;
