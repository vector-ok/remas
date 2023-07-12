import React from "react";

interface SkeletonElementProps {
	avatar?: boolean;
	text?: boolean;
	title?: boolean;
	thumbnail?: boolean;
	box?: boolean;
	row?: number;
	rowIsCheckable?: boolean;
	isLineDropdown?: boolean;
}

export default function TableSkeleton({avatar, text, title, thumbnail, box, rowIsCheckable, isLineDropdown, row = 1}: SkeletonElementProps) {
	return (
		<tr className="h-14">
			<>
				{rowIsCheckable ? (
					<td className=" pl-4 pr-6">
						<div
							className={
								`animate-skeleton rounded bg-gray-100 ` +
								`${avatar ? "h-full w-full rounded-full" : ""} ` +
								`${text ? "h-3.5 w-full rounded" : ""} ` +
								`${title ? "h-5 w-1/3 rounded" : ""} ` +
								`${thumbnail ? "h-24 w-24 rounded" : ""} ` +
								`${box ? "h-full w-full rounded " : ""} `
							}
						/>
					</td>
				) : null}
				{new Array(row).fill(null).map((item, idx) => (
					<td key={idx} className="pl-4 pr-6">
						<div
							className={
								`animate-skeleton rounded bg-gray-100 ` +
								`${avatar ? "h-full rounded-full" : ""} ` +
								`${text ? "h-3.5 rounded" : ""} ` +
								`${title ? "h-5 rounded" : ""} ` +
								`${thumbnail ? "h-24 rounded" : ""} ` +
								`${box ? "h-full rounded " : ""} `
							}
						/>
					</td>
				))}
				{isLineDropdown ? (
					<td className=" pl-4 pr-6">
						<div
							className={
								`animate-skeleton rounded bg-gray-100 ` +
								`${avatar ? "h-full w-full rounded-full" : ""} ` +
								`${text ? "h-3.5 w-full rounded" : ""} ` +
								`${title ? "h-5 w-1/3 rounded" : ""} ` +
								`${thumbnail ? "h-24 w-24 rounded" : ""} ` +
								`${box ? "h-full w-full rounded " : ""} `
							}
						/>
					</td>
				) : null}
			</>
		</tr>
	);
}
