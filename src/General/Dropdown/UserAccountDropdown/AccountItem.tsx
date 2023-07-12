import Currency from "../../../../models/currency";
import DropdownLink from "../../../../components/General/Dropdown/DropdownComponents/DropdownLink";
import Money from "../../../../components/General/Money";
import UserAccount from "../../../../models/userAccount";
import getAvatarColorClass from "../../../../helpers/avatarColors";
import isNullOrUndefined from "../../../../utils/isNullOrUndefined";
import titleCase from "../../../../hooks/titleCase";

interface Props {
	data: UserAccount;
	onSelect: (e: string) => void;
	currency?: Currency | undefined | null;
	isDisabled?: boolean;
	showBalance?: boolean;
	message?: string;
}

function AccountItem({data, onSelect, currency, showBalance = true, message, isDisabled = false}: Props): JSX.Element {
	return (
		<DropdownLink
			onClick={() => {
				onSelect(data.id);
			}}
			key={data.id}
			big
			noHover={isDisabled}
		>
			<div
				className={"flex h-10 w-full items-center justify-start space-x-4 px-4 " + ` ${isDisabled ? "cursor-not-allowed" : ""}`}
				data-type="dropdown"
			>
				<div data-type="dropdown">
					<div className={`flex h-8 w-8 items-center justify-center rounded-full ${getAvatarColorClass(data.id)}`} data-type="dropdown">
						{data.lencoNameMin.slice(0, 1)}
					</div>
				</div>
				<div
					className="flex h-full w-full flex-col items-start justify-center overflow-hidden overflow-ellipsis whitespace-nowrap"
					data-type="dropdown"
				>
					<span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-left text-sm" data-type="dropdown">
						{titleCase(data.lencoNameMin)}
					</span>
					{showBalance && !isNullOrUndefined(data.balance) && (
						<div className="flex flex-row items-center justify-start space-x-2 text-xs" data-type="dropdown">
							<Money amount={data.balance} currency={currency} />
						</div>
					)}
					{message && (
						<div className="flex flex-row items-center justify-start space-x-2 text-xs" data-type="dropdown">
							{message}
						</div>
					)}
				</div>
			</div>
		</DropdownLink>
	);
}

export default AccountItem;
