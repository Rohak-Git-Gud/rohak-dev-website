export type TimelineCategory = "work" | "education" | "upskilling" | "break";

export interface TimelineItem {
	id: number;
	category: TimelineCategory;
	title: string;
	organization: string; // If no Org., consider adding "Self-Employed" or "Freelance" or "Independent"
	startDate: string; // Format: "MMM-YYYY"
	endDate: string; // Format: "MMM-YYYY" or "Present"
	description: string;
	skills?: string[];
	image?: string; // Preferred path: "/images/timeline/<id>.<ext>"
}
