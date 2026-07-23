export type Project = {
	id: number;
	title: string;
	description: string;
	skills: string[];
	githubUrl: string; // Format: "/repo-link".
	// Also check Social Linkers and Site Metadata to understand implementation.
	createdDate: string; // Format: "MMM-YYYY"
	isLive: boolean;
	liveUrl?: string; // Optional: only if project is live
	image?: string; // Preferred path: "/images/projects/<id>.<ext>"
};
