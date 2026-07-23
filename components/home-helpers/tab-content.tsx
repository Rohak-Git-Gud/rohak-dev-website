"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatedTabs } from "@/components/home-helpers/tab-switch-animate";
import { FadeIn } from "@/components/home-helpers/tab-fade-in-animate";
import { SkillsSection } from "@/components/home-helpers/skills";

// I still remember the things I learnt during my performance engineering days.
// Lazy Loading Timeline and Projects
// Still might need some fine-tuning

const Timeline = dynamic(() => import("@/components/home-helpers/timeline/timeline").then((mod) => mod.Timeline), {
	loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>,
});

const Projects = dynamic(() => import("@/components/home-helpers/project/project").then((mod) => mod.ProjectsSection), {
	loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>,
});

export function TabbedContent() {
	const [activeTab, setActiveTab] = useState("skills");

	const tabs = [
		{ id: "skills", label: "Skills" },
		{ id: "timeline", label: "Timeline" },
		{ id: "projects", label: "Projects" },
	];

	return (
		<div className="container mx-auto px-4 py-8 w-full max-w-7xl">
			<div className="flex flex-col items-center w-full">
				<div className="mb-12">
					<AnimatedTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
				</div>

				<div className="w-full min-h-[400px]">
					{activeTab === "skills" && (
						<FadeIn key="skills">
							<SkillsSection />
						</FadeIn>
					)}

					{activeTab === "timeline" && (
						<FadeIn key="timeline">
							<Timeline />
						</FadeIn>
					)}

					{activeTab === "projects" && (
						<FadeIn key="projects">
							<Projects />
						</FadeIn>
					)}
				</div>
			</div>
		</div>
	);
}
