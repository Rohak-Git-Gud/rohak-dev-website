// Overall Color Scheme
import { SkillCategory } from "@/types/type-skills"
import { TimelineCategory } from "@/types/type-timeline"
export type CategoryType = SkillCategory | TimelineCategory;

export interface ColorScheme {
	text: string;
	border: string;
	bg: string;
	badge?: string;
}

// Category color definitions
export const categoryColors: Record<CategoryType, ColorScheme> = {
	// Sky Blue - Work & Languages
	work: {
		text: "text-sky-600 dark:text-sky-300/90",
		border: "border-sky-600 dark:border-sky-300/90",
		bg: "bg-sky-600 dark:bg-sky-300/90",
	},
	languages: {
		text: "text-sky-600 dark:text-sky-300/90",
		border: "border-sky-600 dark:border-sky-300/90",
		bg: "bg-sky-600 dark:bg-sky-300/90",
		badge: "bg-sky-600 dark:bg-sky-300/90 text-white dark:text-black hover:bg-sky-600/80 dark:hover:bg-sky-300",
	},

	// Violet - Education & Frameworks
	education: {
		text: "text-violet-800 dark:text-violet-300/90",
		border: "border-violet-800 dark:border-violet-300/90",
		bg: "bg-violet-800 dark:bg-violet-300/90",
	},
	frameworks: {
		text: "text-violet-800 dark:text-violet-300/90",
		border: "border-violet-800 dark:border-violet-300/90",
		bg: "bg-violet-800 dark:bg-violet-300/90",
		badge: "bg-violet-800 dark:bg-violet-300/90 text-white dark:text-black hover:bg-violet-800/80 dark:hover:bg-violet-300",
	},

	// Orange/Amber - Upskilling & Databases
	upskilling: {
		text: "text-orange-600 dark:text-amber-500/90",
		border: "border-orange-600 dark:border-amber-500/90",
		bg: "bg-orange-600 dark:bg-amber-500/90",
	},
	databases: {
		text: "text-orange-600 dark:text-amber-500/90",
		border: "border-orange-600 dark:border-amber-500/90",
		bg: "bg-orange-600 dark:bg-amber-500/90",
		badge: "bg-orange-600 dark:bg-amber-500/90 text-white dark:text-black hover:bg-orange-600/80 dark:hover:bg-amber-500",
	},

	// Slate/Zinc - Break & Miscellaneous
	break: {
		text: "text-slate-700 dark:text-zinc-300/90",
		border: "border-slate-700 dark:border-zinc-300/90",
		bg: "bg-slate-700 dark:bg-zinc-300/90",
	},
	misc: {
		text: "text-slate-700 dark:text-zinc-300/90",
		border: "border-slate-700 dark:border-zinc-300/90",
		bg: "bg-slate-700 dark:bg-zinc-300/90",
		badge: "bg-slate-700 dark:bg-zinc-300/90 text-white dark:text-black hover:bg-slate-700/80 dark:hover:bg-zinc-300",
	},

	// Yellow - Performance & SRE
	sre: {
		text: "text-yellow-600 dark:text-yellow-400/90",
		border: "border-yellow-600 dark:border-yellow-400/90",
		bg: "bg-yellow-600 dark:bg-yellow-400/90",
		badge: "bg-yellow-600 dark:bg-yellow-400/90 text-white dark:text-black hover:bg-yellow-600/80 dark:hover:bg-yellow-400",
	},

	// Rose - DevSecOps
	devsecops: {
		text: "text-rose-800 dark:text-rose-200/90",
		border: "border-rose-800 dark:border-rose-200/90",
		bg: "bg-rose-800 dark:bg-rose-200/90",
		badge: "bg-rose-800 dark:bg-rose-200/90 text-white dark:text-black hover:bg-rose-800/80 dark:hover:bg-rose-200",
	},
};

/**
 * Get border colors as array (for PhotoSwipe)
 * Excludes primary color (used for current photo)
 */
export const photoBorderColors = [
	categoryColors.languages.border,
	categoryColors.frameworks.border,
	categoryColors.databases.border,
	categoryColors.devsecops.border,
	categoryColors.sre.border,
];
