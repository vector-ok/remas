import {PropsWithChildren} from "react";
import {ReactComponent as HamburgerIcon} from "../../../../assets/svg-new/table/HamburgerIcon.svg";
import Checkbox from "../../Checkbox/Checkbox";
import HamburgerMenu from "./HamburgerField";
import {formatDate} from "../../../../utils/formatDate";

interface IRow<ObjectType> {
	data: ObjectType & {id: number};
	func: () => void;
	active: boolean;
	rowIsCheckable?: boolean;
	isLineDropdown?: boolean;
	isChecked?: boolean;
	onRowCheckChange?: (id: string | number) => void;
}

export default function Row<ObjectType>({
	data,
	func,
	active,
	rowIsCheckable,
	isLineDropdown,
	isChecked,
	onRowCheckChange,
}: PropsWithChildren<IRow<ObjectType>>) {
	console.log(data);
	return (
		<tr
			className={`te relative  cursor-pointer whitespace-nowrap  border-b-0.2 border-grey text-sm hover:bg-blue-senary ${
				active ? "bg-blue-senary" : ""
			}`}
			onClick={func}
			key={data?.id}
			data-type={active ? "transaction-active" : "transaction"}
		>
			{rowIsCheckable ? (
				<td className="w-12 items-center justify-center p-4">
					<Checkbox checked={isChecked} func={() => onRowCheckChange?.(data.id)} size="sm" id={data.id?.toString()} />
				</td>
			) : null}
			<td
				data-type={active ? "transaction-active" : "transaction"}
				className="max-w-2xs overflow-hidden overflow-ellipsis whitespace-nowrap py-4 pl-4 font-normal text-black-secondary xl:max-w-xs xl:pr-10 2xl:pr-16"
			>
				Alpha
			</td>
			<td
				data-type={active ? "transaction-active" : "transaction"}
				className="max-w-2xs overflow-hidden overflow-ellipsis whitespace-nowrap py-4 pl-4 font-normal text-black-secondary xl:max-w-xs xl:pr-10 2xl:pr-16"
			>
				Bravo
			</td>
			<td
				data-type={active ? "transaction-active" : "transaction"}
				className="max-w-2xs overflow-hidden overflow-ellipsis whitespace-nowrap py-4 pl-4 font-normal text-black-secondary xl:max-w-xs xl:pr-10 2xl:pr-16"
			>
				Charlie
			</td>
			<td
				data-type={active ? "transaction-active" : "transaction"}
				className="max-w-2xs overflow-hidden overflow-ellipsis whitespace-nowrap py-4 pl-4 font-normal text-black-secondary xl:max-w-xs xl:pr-10 2xl:pr-16"
			>
				{formatDate(new Date())}
			</td>
			{isLineDropdown ? (
				<td
					data-type={active ? "transaction-active" : "transaction"}
					className="max-w-2xs  overflow-ellipsis whitespace-nowrap py-4 pl-4 font-normal text-black-secondary xl:max-w-xs xl:pr-10 2xl:pr-16"
				>
					{/* <HamburgerIcon className="w-8 text-start" /> */}
					<HamburgerMenu />
				</td>
			) : null}
		</tr>
	);
}
