import {CSSProperties, useEffect, useState} from "react";

import AccountItem from "./AccountItem";
import {ReactComponent as EmptyXX} from "../../../../assets/svg/EmptyXX.svg";
import {IRootState} from "../../../../redux/rootReducer";
import LabelDropdownHead from "../../../../components/General/Dropdown/LabelDropdownComponent/LabelDropdownHead";
import {FixedSizeList as List} from "react-window";
import Money from "../../../../components/General/Money";
// import {FixedSizeList as List} from "react-window";
import UserAccount from "../../../../models/userAccount";
import isNullOrUndefined from "../../../../utils/isNullOrUndefined";
import titleCase from "../../../../hooks/titleCase";
import {useSelector} from "react-redux";

interface UserAccountDropdownProps {
	value: string | null;
	size?: "sm" | "md" | "lg" | undefined;
	options: UserAccount[] | null;
	isDisabled?: boolean;
	placeholder: string;
	showBalance?: boolean;
	approverCanSelect?: boolean;
	initiatorCanSelect?: boolean;
	showBalanceHelperText?: boolean;

	onSelect: (e: string) => void;
}
function UserAccountDropdown(props: UserAccountDropdownProps): JSX.Element {
	const {
		size = "lg",
		value,
		options,
		onSelect,
		isDisabled = false,
		showBalance = false,
		placeholder,
		approverCanSelect = false,
		initiatorCanSelect = false,
		showBalanceHelperText = true,
	} = props;
	const [filteredAccounts, setFilteredAccounts] = useState<UserAccount[]>([]);
	// const [account, setAccount] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");
	// const [balance, setBalance] = useState<number | null>(null);
	const userAccountMeta = useSelector((state: IRootState) => state.init.main?.companyDetails.userAccountsMeta);
	// const userAccounts = useSelector<IRootState, UserAccount[]>((state) => state.init.main?.companyDetails.accounts || []);
	const selectedAccount = useSelector<IRootState, UserAccount | undefined>((state) =>
		state.init.main?.companyDetails.accounts.find((a) => a.id === value)
	);

	/*
	const findAccount = (id: string | undefined): UserAccount | undefined => {
		if (isNullOrUndefined(id)) {
			return undefined;
		}
		return userAccounts.find((userAccount) => userAccount.id === id);
	};
*/
	/*
	useEffect(() => {
		if (!options) return;
		setData(options);
	}, [options]);
*/

	/*
	useEffect(() => {
		if (!isNullOrUndefined(value)) {
			setAccount(findAccount(value)?.lencoNameMin || "");
		}
	}, [value]);
	 */

	/*
	useEffect(() => {
		if (!account || !options || !showBalance) return;
		if (account === "Main") {
			setBalance(options.find((el) => el.isMain)?.balance as number);
			return;
		}
		setBalance(options.find((el) => el.subAccountShortName === account)?.balance as number);
		return;
	}, [account, options]);
	*/

	useEffect(() => {
		const accounts = options ? [...options] : [];
		if (approverCanSelect) {
			accounts.sort((account1, account2): number => {
				if (userAccountMeta?.find((el) => el.userAccountId === account1.id)?.isInitiatorAndApprover && account1.isMain) {
					return -1;
				}
				if (userAccountMeta?.find((el) => el.userAccountId === account2.id)?.isInitiatorAndApprover && account2.isMain) {
					return 1;
				}
				return 0;
			});
		} else {
			accounts.sort((account1, account2): number => {
				if (account1.isMain) {
					return -1;
				}
				if (account2.isMain) {
					return 1;
				}
				return account1.lencoName.localeCompare(account2.lencoName);
			});
		}

		const query = searchTerm.trim().toLowerCase();

		if (!query.length) {
			setFilteredAccounts(accounts);
		} else {
			setFilteredAccounts(
				accounts.filter((item: UserAccount) => {
					return (
						item.accountName.toLowerCase().includes(query) ||
						item.accountNumber.toLowerCase().includes(query) ||
						item.lencoNameMin.toLowerCase().includes(query)
					);
				})
			);
		}
	}, [options, searchTerm, approverCanSelect]);

	/*const handleChangeSearchTerm = (e: string) => {
		setSearchTerm(e);
	};*/

	return (
		<>
			<div className={`relative flex w-full flex-col items-center justify-start space-y-2 ` + ` ${isDisabled ? "pointer-events-none" : ""} `}>
				<LabelDropdownHead
					placeholder={placeholder}
					inputValue={titleCase(selectedAccount?.lencoNameMin || "")}
					searchTerm={searchTerm}
					handleChangeSearchTerm={setSearchTerm}
					searchPlaceholder="Search for account"
					noArrow={isDisabled}
					isDisabled={isDisabled}
					isSearchable={!!(options && options.length > 4)}
					size={size}
					clickAndClose
				>
					{!approverCanSelect && initiatorCanSelect && filteredAccounts && (
						<List
							className="List"
							height={filteredAccounts.length * 56 > 168 ? 168 : filteredAccounts.length * 56}
							itemCount={filteredAccounts && filteredAccounts.length}
							itemSize={56}
							width={"100%"}
						>
							{({index, style}: {index: number; style: CSSProperties | undefined}) => {
								const canInitiate = userAccountMeta?.find((el) => el.userAccountId === filteredAccounts[index].id)?.isInitiator;
								return (
									<div className="flex h-14 w-full flex-col" style={style} key={index}>
										<AccountItem
											currency={filteredAccounts[index].bankAccountCurrency}
											data={filteredAccounts[index]}
											key={index}
											onSelect={onSelect}
											showBalance={!canInitiate ? false : showBalance}
											isDisabled={!canInitiate}
											message={!canInitiate ? "User role - You do not have access to initiate payment" : undefined}
										/>
									</div>
								);
							}}
						</List>
					)}
					{approverCanSelect && !initiatorCanSelect && filteredAccounts && (
						<List
							className="List"
							height={filteredAccounts.length * 56 > 168 ? 168 : filteredAccounts.length * 56}
							itemCount={filteredAccounts && filteredAccounts.length}
							itemSize={56}
							width={"100%"}
						>
							{({index, style}: {index: number; style: CSSProperties | undefined}) => {
								const canApprove = userAccountMeta?.find((el) => el.userAccountId === filteredAccounts[index].id)?.isApprover;
								return (
									<div className="flex h-14 w-full flex-col" style={style} key={index}>
										<AccountItem
											currency={filteredAccounts[index].bankAccountCurrency}
											data={filteredAccounts[index]}
											key={index}
											onSelect={onSelect}
											showBalance={!canApprove ? false : showBalance}
											isDisabled={!canApprove}
											message={!canApprove ? "User role - You do not have access to approve payment" : undefined}
										/>
									</div>
								);
							}}
						</List>
					)}
					{!approverCanSelect && !initiatorCanSelect && filteredAccounts && (
						<List
							className="List"
							height={filteredAccounts.length * 40 > 160 ? 160 : filteredAccounts.length * 40}
							itemCount={filteredAccounts && filteredAccounts.length}
							itemSize={40}
							width={"100%"}
						>
							{({index, style}: {index: number; style: CSSProperties | undefined}) => (
								<>
									{userAccountMeta?.find((el) => el.userAccountId === filteredAccounts[index].id)?.isApprover && (
										<div className="flex w-full flex-col" style={style} key={index}>
											<AccountItem
												currency={filteredAccounts[index].bankAccountCurrency}
												data={filteredAccounts[index]}
												key={index}
												onSelect={onSelect}
												showBalance={showBalance}
											/>
										</div>
									)}
								</>
							)}
						</List>
					)}
					{filteredAccounts && filteredAccounts.length < 1 && (
						<div className="flex h-14 w-full flex-row items-center justify-center space-x-2 text-sm text-black-tertiary">
							<EmptyXX className="h-10 w-10" />
							<span>No User Accounts Found</span>
						</div>
					)}
				</LabelDropdownHead>

				{selectedAccount && showBalance && showBalanceHelperText && !isNullOrUndefined(selectedAccount.balance) && (
					<div className="w-full text-left text-xs text-black-tertiary">
						Available Balance: <Money amount={selectedAccount.balance} currency={selectedAccount.bankAccountCurrency} />
					</div>
				)}
			</div>
		</>
	);
}

export default UserAccountDropdown;
