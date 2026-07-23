export interface Blog {
	slug: string; // Link string
	title: string;
	description: string;
	date: string; // Format: MMM-YYYY
	tags: string[];
	status: "wip" | "readable";
	content: string;
}
