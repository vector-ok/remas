import {isStorageAvailable} from "../utils/windowStorage";

const colorClasses = ["bg-success-backdrop text-success", "bg-warning-backdrop text-warning", "bg-info-backdrop text-info"];

let currentIndex = 0;

const storageKey = "lacsk"; // lenco-avatar-colorClasses-storage-key

function getNextIndex(): number {
	if (currentIndex >= colorClasses.length) {
		currentIndex %= colorClasses.length;
	}
	const nextIndex = currentIndex;
	currentIndex += 1;
	return nextIndex;
}

function getColorForIndex(index: number): string {
	return colorClasses.length > index ? colorClasses[index] : colorClasses[index % colorClasses.length];
}

function getSavedData(): {[key: string]: number} {
	if (!isStorageAvailable) {
		return {};
	}
	const dataString = window.localStorage.getItem(storageKey);
	try {
		return dataString === null ? {} : (JSON.parse(dataString) as {[key: string]: number});
	} catch (err) {
		return {};
	}
}

function saveData(data: {[key: string]: number}): void {
	if (isStorageAvailable) {
		window.localStorage.setItem(storageKey, JSON.stringify(data));
	}
}

function saveColorForKey(key: string, colorIndex: number): void {
	const data = getSavedData();
	data[key] = colorIndex;
	saveData(data);
}

function getColorForKey(key: string): string {
	let index;
	const data = getSavedData();
	if (key in data) {
		index = data[key];
	} else {
		index = getNextIndex();
		saveColorForKey(key, index);
	}
	return getColorForIndex(index);
}

export default function getAvatarColorClass(key: string): string {
	return getColorForKey(key);
}
