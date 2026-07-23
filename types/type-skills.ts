export type SkillCategory = "languages" | "frameworks" | "databases" | "devsecops" | "observability" | "tools";
// You're free to add more categories if needed.
// But check /lib/master-color-scheme.ts and update color scheme accordingly.

export interface SkillItem {
	name: string;
	proficient?: boolean;
	category: SkillCategory;
}

export interface SkillGroup {
	category: SkillCategory;
	title: string;
	skills: SkillItem[];
}
