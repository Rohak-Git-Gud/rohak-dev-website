"use client";
import * as React from "react";
import { parseDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TimelineCard } from "@/components/home-helpers/timeline/timeline-card";
import { TimelineItem, TimelineCategory } from "@/types/type-timeline";
import { timelineData, flavorText } from "@/data/data-index";
import { categoryColors } from "@/lib/master-color-scheme";

const data = timelineData as TimelineItem[];

const categories: TimelineCategory[] = ["work", "education", "upskilling", "break"];

export function Timeline() {
	const [selectedCategories, setSelectedCategories] = React.useState<TimelineCategory[]>([]);

	const toggleCategory = (category: TimelineCategory) => {
		setSelectedCategories((prev) =>
			prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
		);
	};

	const filteredData = data
		.filter((item) => selectedCategories.length === 0 || selectedCategories.includes(item.category))
		.sort((a, b) => parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime());

	return (
		<section className="container mx-auto px-4 md:px-8 py-3 md:py-6" id="timeline">
			<div className="flex flex-col items-center gap-4 mb-12">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Timeline</h2>

				<p className="text-muted-foreground text-center max-w-[600px]">{flavorText.timeline}</p>
			</div>

			{/* Filter */}
			<div className="flex flex-wrap justify-center gap-2 mb-16">
				<Button
					variant={selectedCategories.length === 0 ? "default" : "outline"}
					onClick={() => setSelectedCategories([])}
					className="rounded-full"
				>
					All
				</Button>

				{/* Timeline Category Buttons for filtering */}
				{categories.map((cat) => (
					<Button
						key={cat}
						variant={selectedCategories.includes(cat) ? "default" : "outline"}
						onClick={() => toggleCategory(cat)}
						className="capitalize rounded-full"
					>
						{cat}
					</Button>
				))}
			</div>

			<div className="relative max-w-7xl mx-auto">
				{filteredData.length > 0 ? (
					<>
						{/* Vertical Line */}
						<div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/32 md:left-1/2 md:-ml-1px" />

						{/* Top Circle */}
						<div className="absolute left-8 -top-2 h-4 w-4 rounded-full border-4 border-primary bg-background -translate-x-1/2 md:left-1/2" />

						<div className="space-y-12 py-8">
							{filteredData.map((item, index) => {
								const isEven = index % 2 === 0;
								const colors = categoryColors[item.category];
								return <TimelineCard key={item.id} item={item} isEven={isEven} colors={colors} />;
							})}
						</div>

						{/* Bottom Circle */}
						<div className="absolute left-8 bottom-0 h-4 w-4 rounded-full border-4 border-primary bg-background -translate-x-1/2 md:left-1/2" />
					</>
				) : (
					<p className="text-center text-muted-foreground py-20 italic">{flavorText.noTimeline}</p>
				)}
			</div>
		</section>
	);
}
