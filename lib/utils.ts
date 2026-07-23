import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Parses a custom date string into a JavaScript Date object.
 * @description
 * This helper converts specific string formats used in blog metadata into valid Date objects.
 * It primarily handles the "MMM-YYYY" format (e.g., "Jan-2024") and the keyword "Present".
 * @param {string} dateStr - The date string to parse.
 * Expected formats: `"MMM-YYYY"`, `"Present"`, or an empty string.
 * @returns {Date} A JavaScript Date object.
 * - Returns the current date if `dateStr` is "Present".
 * - Returns the 1st of the specified month/year for valid "MMM-YYYY" strings.
 * - Returns the Unix Epoch (`1970-01-01`) for empty or malformed strings.
 * @example
 * parseDate("Jan-2024"); // Returns: Wed Jan 01 2024 ...
 * parseDate("Present");  // Returns: [Current Date]
 * parseDate("Invalid");  // Returns: Thu Jan 01 1970 ...
 */
export function parseDate(dateStr: string): Date {
	if (!dateStr) return new Date(0);

	// Handling "Present"
	if (dateStr.toLowerCase() === "present") {
		return new Date();
	}

	const parts = dateStr.split("-");
	if (parts.length === 2) {
		const monthMap: { [key: string]: number } = {
			Jan: 0,
			Feb: 1,
			Mar: 2,
			Apr: 3,
			May: 4,
			Jun: 5,
			Jul: 6,
			Aug: 7,
			Sep: 8,
			Oct: 9,
			Nov: 10,
			Dec: 11,
		};
		const month = monthMap[parts[0]];
		const year = parseInt(parts[1]);

		// Return Date if validations pass
		if (month !== undefined && !isNaN(year)) {
			return new Date(year, month, 1);
		}
	}

	// Bad date formatting validation
	return new Date(0);
}
