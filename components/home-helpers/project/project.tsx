"use client";

import * as React from "react";
import { parseDate } from "@/lib/utils";
import { ProjectCard } from "@/components/home-helpers/project/project-card";
import { Project } from "@/types/type-projects";
import { projectsData, flavorText } from "@/data/data-index";

const data = projectsData as Project[];

export function ProjectsSection() {
	// Project Sorting
	const sortedProjects = React.useMemo(() => {
		return [...data].sort((a, b) => {
			// Live projects first
			if (a.isLive !== b.isLive) {
				return a.isLive ? -1 : 1;
			}
			// Sort by date (descending)
			return parseDate(b.createdDate).getTime() - parseDate(a.createdDate).getTime();
		});
	}, []);

	return (
		<section className="container mx-auto px-4 md:px-8 py-3 md:py-6" id="projects">
			<div className="flex flex-col items-center gap-4 mb-12">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
				<p className="text-muted-foreground text-center max-w-[600px]">{flavorText.projects}</p>
			</div>

			{/* Project Cards Grid */}
			<div className="max-w-7xl mx-auto">
				{sortedProjects.length > 0 ? (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{sortedProjects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				) : (
					<p className="text-center text-muted-foreground py-20 italic">{flavorText.noProjects}</p>
				)}
			</div>
		</section>
	);
}
