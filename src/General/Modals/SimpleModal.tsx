import React from "react";
import Modal, {ModalSize} from "./Modal";
import ModalHeader from "./ModalHeader";
import {ToastType} from "../../../helpers/AppConstants";
import ModalBody from "./ModalBody";
import MessageToasts from "../MessageToasts/MessageToasts";
import ModalFooter from "./ModalFooter";
import ButtonComp from "../Buttons/ButtonComp";
import {ConfirmModalProps} from "./ConfirmModal";

export interface SimpleModalProps extends Omit<ConfirmModalProps, "onConfirm"> {
	headingType?: ToastType;
	size?: ModalSize;
	confirmText?: string;
	cancelText?: string;
	onSubmit: () => void;
	canSubmit?: boolean;
}

function SimpleModal(props: SimpleModalProps): JSX.Element {
	return (
		<Modal size={props.size ?? "xs"} active={props.active} toggler={props.onClose}>
			<ModalHeader onClose={props.onClose} headingType={props.headingType}>
				{props.header}
			</ModalHeader>

			<form
				className="w-full"
				onSubmit={(e) => {
					e.preventDefault();
					if (props.canSubmit !== false) {
						props.onSubmit();
					}
				}}
			>
				<ModalBody>
					<div className="flex w-full flex-col">
						{props.errorMessage && (
							<div className="w-full pb-2">
								<MessageToasts toastMessage={props.errorMessage} toastType={ToastType.ERROR} />
							</div>
						)}
						<div className="flex w-full flex-col items-start justify-start break-words text-sm font-normal">{props.children}</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<ButtonComp type="button" ripple="light" buttonType="secondary" color="grey" func={props.onClose}>
						<span className="">{props.cancelText || "Cancel"}</span>
					</ButtonComp>
					<ButtonComp
						type="submit"
						ripple="light"
						buttonType="primary"
						color={props.confirmColor || "blue"}
						isLoading={props.isSubmitting}
						disable={props.canSubmit === false}
					>
						<span>{props.confirmText || "Submit"}</span>
					</ButtonComp>
				</ModalFooter>
			</form>
		</Modal>
	);
}

export default SimpleModal;
