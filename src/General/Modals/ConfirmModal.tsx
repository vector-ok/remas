import React from "react";
import {ToastType} from "../../../helpers/AppConstants";
import {ButtonColor} from "../Buttons/ButtonComp";
import SimpleModal from "./SimpleModal";

export interface ConfirmModalProps {
	active: boolean;
	onClose: () => void;
	isSubmitting: boolean;
	onConfirm: () => void;
	errorMessage: string | undefined;
	header: React.ReactNode;
	children: React.ReactNode;
	confirmColor?: ButtonColor;
}

function ConfirmModal(props: ConfirmModalProps): JSX.Element {
	return (
		<SimpleModal size="xs" headingType={ToastType.WARNING} confirmText="Yes" cancelText="No" onSubmit={props.onConfirm} {...props}>
			{props.children}
		</SimpleModal>
	);
}

export default ConfirmModal;
