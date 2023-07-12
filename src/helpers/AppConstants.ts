// Account type
export const STARTER_ACCOUNT_TYPE = 3;
export const PRO_ACCOUNT_TYPE = 2;
export const FULL_ACCOUNT_TYPE = 1;

//Transaction type
export const DEBIT = 1;
export const CREDIT = 2;

//Transaction status
export const SUCCESS = 1;
export const FAILED = 2;
export const PENDING_APPROVAL = 3;
export const DECLINED = 4;
export const CANCELLED = 5;
export const PROCESSING = 6;

//Charge type
export const VAT = 1;
export const NIPSS_CHARGE = 2;
export const NIP_AND_VAT = 3;
export const STAMP_DUTY = 4;
export const SMS_CHARGE = 5;
export const ACCOUNT_MAINTENANCE = 6;
export const API_FEE = 7;

//Notification channel
export const IN_APP = 0;
export const SMS = 1;
export const EMAIL = 2;
export const SLACK = 3;

//Notification type
export const FULL = 1;
export const TRUNCATED = 2;
export const NONE = 3;

//User role
export const BOTH = 1;
export const APPROVER = 2;
export const INITIATOR = 3;
export const VIEWER = 4;
export const NOTIFICATION_ONLY = 5;

//User account restriction type
export const SEND_MONEY_TO_ANY_ACCOUNT = 1;
export const SEND_MONEY_TO_SPECIFIC_ACCOUNTS = 2;
export const CANNOT_SEND_MONEY = 3;

//User account balance instruction type
export const LOW_BALANCE_ALERT = 1;
export const EXCESS_BALANCE_ALERT = 2;
export const SPLIT_INFLOW = 3;

//User account enrolment status
export const NOT_APPLICABLE = 0;
export const ENROLLED = 1;
export const ONGOING = 2;
export const NOT_ENROLLED = 3;

//Corporate Account Type
export const FULL_ACCOUNT = 1;
export const BETA = 2;
export const STARTER = 3;

//Payment Recipient Sort
export const DEFAULT = 1;
export const NAME = 2;
export const BANK = 3;

//Duration
export const MAIN_APP_IDLE = 10; // 10 minutes
export const CREATE_ACCOUNT_IDLE = 60; // 60 minutes
export const KEEP_ALIVE_PING = 5; // 5 minutes
// export const KEEP_ALIVE_PING_RETRY = 5;
export const RESEND_TOKEN = 3; // 3 minutes => for approving a transaction i.e. when to resend otp after sending one

//Stages
export const STAGE_BASE = 0;
export const STAGE_ONE = 1;
export const STAGE_TWO = 2;
export const STAGE_THREE = 3;
export const STAGE_FOUR = 4;
export const STAGE_FIVE = 5;
export const STAGE_SIX = 6;

//Numbers
export const ONE = 1;
export const TWO = 2;
export const THREE = 3;
export const FOUR = 4;
export const FIVE = 5;

//Pagination
export const PAGE_LENGTH = 1000;

//Toast Message
export enum ToastType {
	INFORMATION = "information_toast",
	ERROR = "error_toast",
	WARNING = "warning_toast",
	SUCCESS_TOAST = "success_toast",
}

//Toast Message
export enum ToolTipType {
	INFORMATION = "information_toast",
	ERROR = "error_toast",
	WARNING = "warning_toast",
	SUCCESS_TOAST = "success_toast",
}

//Icon Type
export enum IconType {
	SHARE = "share_icon",
	NEW_PAYMENT = "new_payment_icon",
	COMMENT = "comment_icon",
	UPLOAD = "upload_icon",
	DOWNLOAD = "download_icon",
	TRANSACTION_DETAILS = "transaction_details_icon",
	PREVIEW = "preview_icon",
}

//saved recipients
export const BY_LATEST_PAYMENT = 1;
export const BY_NAME = 2;

//General
export const ERROR = "error";

// action for generating otp
export enum OtpActivityType {
	LOGIN = 1,
	INITIATE_TRANSACTION = 11,
	APPROVE_TRANSACTION = 12,
	PROCESS_TRANSACTION = 14,
	CHANGE_PASSWORD = 23,
	// DECLINE_TRANSACTION = 13,
	// CANCEL_TRANSACTION = 15,
}

//Page titles
export enum PageTitle {
	ACCOUNTS_PAGE = "Accounts | Lenco - Better banking built for Businesses",
	INDIVIDUAL_ACCOUNT_PAGE = "Account Details | Lenco - Better banking built for Businesses",
	APPLICATION_PAGE = "Application | Lenco - Better banking built for Businesses",
	DASHBOARD_PAGE = "Dashboard | Lenco - Better banking built for Businesses",
	PAYMENTS_PAGE = "Payments | Lenco - Better banking built for Businesses",
	PENDING_APPROVAL_PAGE = "Pending Approval | Lenco - Better banking built for Businesses",
	SAVED_RECIPIENTS_PAGE = "Recipients | Lenco - Better banking built for Businesses",
	PEOPLE_PAGE = "People | Lenco - Better banking built for Businesses",
	TEAM_MEMBERS_SETTINGS_PAGE = "Team Members | Lenco - Better banking built for Businesses",
	ACCOUNTS_SETTINGS_PAGE = "Account Settings | Lenco - Better banking built for Businesses",
	SECURITY_PAGE = "Security | Lenco - Better banking built for Businesses",
	TRANSACTIONS_PAGE = "Transactions | Lenco - Better banking built for Businesses",
	CARDS_PAGE = "Cards | Lenco - Better banking built for Businesses",
	DIRECTORS_PAGE = "Director Information | Lenco - Better banking built for Businesses",
	INVOICE_PAGE = "Invoice | Lenco - Better banking built for Businesses",
	INVENTORY_PAGE = "Inventory | Lenco - Better banking built for Businesses",

	// ACCOUNT_CREATED_PAGE = "Account Created | Lenco - Better banking built for Businesses",
	// COMPANY_BASE_PAGE = "Company Base | Lenco - Better banking built for Businesses",
	EMAIL_VERIFIED_PAGE = "Email Verified | Lenco - Better banking built for Businesses",
	// EXTERNAL_APPLICATION_PAGE = "External Application | Lenco - Better banking built for Businesses",
	FORGOT_PASSWORD_PAGE = "Forgot Password | Lenco - Better banking built for Businesses",
	LANDING_PAGE = "Lenco | Lenco - Better banking built for Businesses",
	// INVITE_USER_SIGNUP_PAGE = "Invite User Signup | Lenco - Better banking built for Businesses",
	// INVITE_USER_LOGIN_PAGE = "Invite User Login | Lenco - Better banking built for Businesses",
	LOGIN_PAGE = "Login | Lenco - Better banking built for Businesses",
	// OTHER_COUNTRIES_PAGE = "Other Countries | Lenco - Better banking built for Businesses",
	// RESET_PASSWORD_PAGE = "Reset Password | Lenco - Better banking built for Businesses",
	PAYMENT_RECEIPT_PAGE = "Payment Receipt | Lenco - Better banking built for Businesses",
	SIGNUP_PAGE = "Signup | Lenco - Better banking built for Businesses",
}
