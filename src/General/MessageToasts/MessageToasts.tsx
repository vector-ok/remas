import { ReactComponent as Error } from "../../assets/svg/General/Toast/Error/Icon.svg"
import { ReactComponent as Info } from "../../assets/svg/General/Toast/Info/Icon.svg"
import React from "react"
import { ReactComponent as Success } from "../../assets/svg/General/Toast/Success/Icon.svg"
import { ToastType } from "../../helpers/AppConstants"
import { ReactComponent as Warning } from "../../assets/svg/General/Toast/Warning/Icon.svg"

interface MessageToastsProps {
  toastMessage: string | React.ReactNode
  toastType: ToastType
  onClick?: () => void
  className?: string
}

function MessageToasts({
  toastMessage,
  toastType,
  className,
  onClick = undefined,
}: MessageToastsProps): JSX.Element {
  return (
    <div
      className={
        `flex w-full transform flex-row items-start justify-start space-x-4 rounded-lg px-4 py-2 text-center opacity-100 transition-all duration-700 ` +
        `${
          toastType === ToastType.ERROR ? "bg-error-backdrop text-error" : ""
        } ` +
        `${
          toastType === ToastType.INFORMATION
            ? "bg-info-backdrop text-info"
            : ""
        } ` +
        `${
          toastType === ToastType.WARNING
            ? "bg-warning-backdrop text-warning"
            : ""
        } ` +
        `${
          toastType === ToastType.SUCCESS_TOAST
            ? "bg-success-backdrop text-success"
            : ""
        } ` +
        `${className || ""} `
      }
    >
      <div
        className="flex items-center justify-center rounded-full"
        onClick={onClick}
      >
        <span>
          {toastType === ToastType.ERROR && <Error />}
          {toastType === ToastType.INFORMATION && <Info />}
          {toastType === ToastType.WARNING && <Warning />}
          {toastType === ToastType.SUCCESS_TOAST && <Success />}
        </span>
      </div>
      <div className="pointer-events-none flex items-center justify-center whitespace-normal text-left text-sm font-normal">
        {toastMessage}
      </div>
    </div>
  )
}

export default MessageToasts
