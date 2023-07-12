export type GenericObject = Record<string, unknown>;
// export type GenericObject = { [key: string]: unknown};
// export type GenericObject = any;

export type ClassConstructor<T> = new (...args: unknown[]) => T;

export interface CompanyInterface {
	// bankAccount: {
	// accountName: string;
	// accountNumber: string;
	// };
	id: string;
	name: string;
	accountCreated: boolean;
}

export type PaymentRecipient = {
	customerAccountId: string | undefined;
	bankAccountId: string;
	bankCode: string;
	accountNumber: string;
};

export type DropdownItemValueType = number | string | null | boolean;

export interface DropdownItem<T extends DropdownItemValueType> {
	text: string;
	value: T;
	subtext?: string;
	leftIcon?: React.ReactElement;
	rightIcon?: React.ReactElement;

	// onClick?: (_value: T) => void;
}

// export type DropdownOptionItem<T extends DropdownItemValueType> = DropdownItem<T> | {text: string; isLabel: true};
