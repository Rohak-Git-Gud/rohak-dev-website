"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SkillCategory, SkillGroup } from "@/types/type-skills";
import { skillsData, flavorText } from "@/data/data-index";
import { categoryColors } from "@/lib/master-color-scheme";

const data = skillsData as SkillGroup[];

export function SkillsSection() {
	const [selectedCategories, setSelectedCategories] = React.useState<SkillCategory[]>([]);
	const [onlyProficient, setOnlyProficient] = React.useState(false);

	const toggleCategory = (category: SkillCategory) => {
		setSelectedCategories((prev) =>
			prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
		);
	};

	const filteredData = data
		.filter((group) => (selectedCategories.length > 0 ? selectedCategories.includes(group.category) : true))
		.map((group) => ({
			...group,
			skills: onlyProficient ? group.skills.filter((skill) => skill.proficient) : group.skills,
		}))
		.filter((group) => group.skills.length > 0);

	return (
		<section id="skills" className="container mx-auto px-4 md:px-8 py-3 md:py-6 flex flex-col items-center">
			<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-center">Skills</h2>
			<p className="text-muted-foreground mb-8 max-w-[800px] text-center">{flavorText.skills}</p>

			{/* Filter */}
			<div className="flex flex-wrap items-center justify-center gap-2 mb-8">
				<Button
					variant={selectedCategories.length === 0 ? "default" : "outline"}
					size="sm"
					onClick={() => setSelectedCategories([])}
					className="rounded-full"
				>
					All
				</Button>

				{/* Skills Category Buttons for filtering */}
				{data.map((group) => {
					const isSelected = selectedCategories.includes(group.category);
					return (
						<Button
							key={group.category}
							variant={isSelected ? "default" : "outline"}
							size="sm"
							onClick={() => toggleCategory(group.category)}
							className="capitalize rounded-full transition-all"
						>
							{group.title}
						</Button>
					);
				})}

				<span className="h-5 w-px bg-border mx-1 hidden sm:inline-block" aria-hidden="true" />

				{/* Confident Skills Button Filter */}
				<Button
					variant={onlyProficient ? "default" : "outline"}
					size="sm"
					onClick={() => setOnlyProficient((prev) => !prev)}
					className="capitalize rounded-full transition-all"
				>
					Filter Confident Skills Only
				</Button>
			</div>

			{/* Legend */}
			<div className="flex items-center justify-center gap-2 mb-12">
				<Badge className="text-sm font-normal py-1 px-3 bg-primary text-primary-foreground hover:bg-primary/90 border-transparent shadow-[0_0_8px_hsl(var(--primary)/0.4)]">
					I'm confident in Skills marked liked this
				</Badge>
			</div>

			<div className="w-full max-w-7xl space-y-4">
				{filteredData.length > 0 ? (
					filteredData.map((group) => (
						/* Skills Groups Cards */
						<Card
							key={group.category}
							className={`bg-card/50 backdrop-blur-sm overflow-hidden border-2 ${
								categoryColors[group.category].border
							}`}
						>
							<CardContent className="px-3 py-0.5 md:p-3">
								<div className="flex flex-col md:flex-row md:items-start gap-4">
									{/* Category Title */}
									<div className="md:w-64 shrink-0 md:pl-3 text-center md:text-left">
										<h3 className="text-lg font-bold capitalize mb-2 md:mb-0">{group.title}</h3>
									</div>

									{/* Skills Badges */}
									<div className="flex flex-wrap gap-3">
										{[...group.skills]
											.sort((a, b) => (b.proficient ? 1 : 0) - (a.proficient ? 1 : 0))
											.map((skill, index) => {
												const skillName = skill.name;
												const isProficient = skill.proficient;
												return (
													<Badge
														key={`${skillName}-${index}`}
														className={`text-sm py-0.5 px-3 cursor-default transition-transform hover:scale-105 ${
															isProficient
																? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary shadow-[0_0_8px_hsl(var(--primary)/0.4)]"
																: categoryColors[group.category].badge
														}`}
													>
														{skillName}
													</Badge>
												);
											})}
									</div>
								</div>
							</CardContent>
						</Card>
					))
				) : (
					<p className="text-center text-muted-foreground py-10 italic">{flavorText.noSkills}</p>
				)}
			</div>
		</section>
	);
}
