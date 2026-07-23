"use client";

import { Hero } from "@/components/home-helpers/hero";
import { TabbedContent } from "@/components/home-helpers/tab-content";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<Hero />
			<TabbedContent />
		</main>
	);
}
