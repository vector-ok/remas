import {PropsWithChildren, ReactElement} from "react";

import Checkbox from "../Checkbox/Checkbox";
import {ReactComponent as EmptyX} from "../../../assets/svg-new/table/emptyX.svg";
import Pagination from "../Pagination/Pagination";
import Row from "./components/Row";
import TableSkeleton from "./components/Skeleton";

export interface IHead {
	text: string;
	width?: string;
	hidable?: boolean;
	position?: string;
}

interface ITable<IRow> {
	TopComponent?: ReactElement;
	appendComponentOnEmpty?: ReactElement;
	rowIsCheckable?: boolean;
	headerTitles: IHead[];
	rows: (IRow & {id: number | string})[];
	selectedRows: (IRow & {id: number | string})[];
	isLoading: boolean;
	isLineDropdown?: boolean;
	onAllRowCheckedFunc?: () => void;
	onSingleRowCheckedFunc?: (id: string | number) => void;
}

export default function Table<IRow>({
	TopComponent,
	rowIsCheckable,
	headerTitles,
	rows,
	selectedRows,
	isLoading,
	children,
	appendComponentOnEmpty,
	isLineDropdown,
	onAllRowCheckedFunc,
	onSingleRowCheckedFunc,
}: PropsWithChildren<ITable<IRow>>) {
	return (
		<div className="h-full space-y-5">
			<>{TopComponent || null}</>
			<div>
				<table className="w-full min-w-md border-separate border-spacing-0">
					<thead className="z-30 w-full rounded-custom bg-white-light text-left text-xs">
						<tr className="w-full">
							{rowIsCheckable ? (
								<th className="w-12 items-center justify-center p-4">
									<Checkbox checked={selectedRows.length === rows.length} func={onAllRowCheckedFunc} size="sm" id="1" />
								</th>
							) : null}
							{headerTitles?.map((title, key) => (
								<th key={key} className={`whitespace-nowrap p-4 text-left text-sm font-normal ${title.width} ${title.position}`}>
									{title.text}
								</th>
							))}
							{isLineDropdown ? <th className={`z-10 whitespace-nowrap p-4 text-left text-sm font-normal`}></th> : null}
						</tr>
					</thead>
					<tbody>
						{rows.length < 1 && isLoading && (
							<>
								<TableSkeleton rowIsCheckable={rowIsCheckable} isLineDropdown={isLineDropdown} text row={headerTitles.length} />
								<TableSkeleton rowIsCheckable={rowIsCheckable} isLineDropdown={isLineDropdown} text row={headerTitles.length} />
							</>
						)}
						{rows.length ? (
							<>
								{children ||
									rows?.map((row, idx) => (
										<Row
											key={idx}
											rowIsCheckable={rowIsCheckable}
											isLineDropdown={isLineDropdown}
											isChecked={selectedRows.length === rows.length || !!selectedRows?.find((_el) => _el?.id === row?.id)}
											onRowCheckChange={onSingleRowCheckedFunc}
											active={false}
											data={row as any}
											func={() => {}}
										/>
									))}
							</>
						) : null}
					</tbody>
				</table>
				{rows.length < 1 && !isLoading && (
					<div className="flex h-50vh flex-col items-center justify-center space-y-2 text-center text-xs text-black-quat">
						<EmptyX className="h-16 w-16" />
						<span>
							Looks like your inventory is currently empty. Let's start by adding
							<br /> your products to get your business up and running.
						</span>
						{appendComponentOnEmpty || null}
					</div>
				)}
			</div>
			<Pagination offset={0} total={rows.length} groupSize={50} onSelect={(_page, _offset) => {}} isLoading={isLoading} />
		</div>
	);
}
