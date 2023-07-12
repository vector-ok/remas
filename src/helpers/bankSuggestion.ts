import Bank from "../models/bank";

export function suggestBanks(banks: Bank[], accountNumber: string): Bank[] {
	if (accountNumber.length !== 10) {
		return [];
	}
	const res: Bank[] = [];
	for (const bank of banks) {
		if (!bank.nubanCode) {
			continue;
		}
		const checkDigit = calculateCheckDigit(bank.nubanCode, accountNumber);
		if (checkDigit !== null && checkDigit === Number(accountNumber[9])) {
			res.push(bank);
		}
	}
	return res;
}

function calculateCheckDigit(nubanCode: string, accountNumber: string): number | null {
	if (nubanCode.length === 3) {
		nubanCode = `000${nubanCode}`;
	} else if (nubanCode.length !== 6) {
		return null;
	}

	if (accountNumber.length !== 10 && accountNumber.length !== 9) {
		return null;
	}

	const [a, b, c, d, e, f] = nubanCode.split("");
	const [g, h, i, j, k, l, m, n, o] = accountNumber.split("");

	// Step 1: Calculate A*3+B*7+C*3+D*3+E*7+F*3+G*3+H*7+I*3+J*3+K*7+L*3+M*3+N*7+O*3
	let res: number;
	res =
		Number(a) * 3 +
		Number(b) * 7 +
		Number(c) * 3 +
		Number(d) * 3 +
		Number(e) * 7 +
		Number(f) * 3 +
		Number(g) * 3 +
		Number(h) * 7 +
		Number(i) * 3 +
		Number(j) * 3 +
		Number(k) * 7 +
		Number(l) * 3 +
		Number(m) * 3 +
		Number(n) * 7 +
		Number(o) * 3;

	// Step 2: Calculate Modulo 10 of your result i.e. the remainder after dividing by 10
	res = res % 10;

	// Step 3: Subtract your result from 10 to get the Check Digit
	res = 10 - res;

	// Step 4: If your result is 10, then use 0 as your check digit
	res = res === 10 ? 0 : res;

	return res;
}
