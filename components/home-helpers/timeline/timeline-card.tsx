"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TagPopover } from "@/components/shared/card-tag-overflow";
import { InfoButton } from "@/components/shared/social-linkers";
import { TimelineItem } from "@/types/type-timeline";
import { ColorScheme } from "@/lib/master-color-scheme";

interface TimelineCardProps {
	item: TimelineItem;
	isEven: boolean;
	colors: ColorScheme;
}

export function TimelineCard({ item, isEven, colors }: TimelineCardProps) {
	const [isMobileActive, setIsMobileActive] = React.useState(false);
	const colorTheme = colors.text + " " + colors.border;

	const toggleActive = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsMobileActive(!isMobileActive);
	};
	return (
		<div className="relative">
			{/* Timeline Category Dot */}
			<div
				className={`absolute top-8 -translate-y-1/2 -translate-x-1/2 rounded-full z-10 left-8 md:left-1/2 h-3 w-3 ${colors.bg}`}
			/>

			{/* Desktop Dot to Card Line */}
			<div
				className={`hidden md:block absolute top-8 left-8 w-8 h-0.5 -translate-y-1/2 z-0 ${colors.bg}`}
				style={{
					width: "4rem",
					left: isEven ? "auto" : "50%",
					right: isEven ? "50%" : "auto",
				}}
			/>

			{/* Mobile Dot to Card Line */}
			<div className={`md:hidden absolute top-8 left-8 w-8 h-0.5 -translate-y-1/2 z-0 ${colors.bg}`} />

			{/* Desktop Date */}
			<div
				className={`hidden md:block absolute top-8 text-sm font-mono text-muted-foreground -translate-y-1/2 ${
					isEven ? "left-[55%] text-left" : "right-[55%] text-right"
				}`}
			>
				{item.startDate} — {item.endDate}
			</div>

			{/* Card */}
			<div
				className={`relative ml-16 md:ml-0 md:w-[48%] ${isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}
			>
				<div
					onClick={toggleActive}
					className={`relative rounded-xl border-2 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg group ${colorTheme} cursor-pointer min-h-[168px] flex flex-col`}
				>
					{/* Main Content */}
					<div className="p-5 pb-5 flex flex-col gap-3 flex-1">
						<div className="flex items-start gap-4">
							<div
								className={`relative h-16 w-16 aspect-square shrink-0 overflow-hidden rounded-md border-2 ${colors.border}`}
							>
								<Image
									src={item.image || "/images/default/timeline.jpg"}
									alt={item.title}
									fill
									sizes="32px"
									className="object-cover"
								/>
							</div>

							<div className="flex-1 min-w-0">
								<h3 className={`text-lg font-bold leading-tight mb-1 ${colors.text}`}>{item.title}</h3>

								<div className="flex flex-col gap-1.5">
									<span className="text-sm font-medium text-foreground">{item.organization}</span>

									<Badge
										variant="secondary"
										className="w-fit text-xs capitalize h-5 text-muted-foreground"
									>
										{item.category}
									</Badge>
								</div>
							</div>
						</div>

						{/* Description */}
						<div
							className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
								isMobileActive ? "grid-rows-[1fr]" : "grid-rows-[0fr] group-hover:grid-rows-[1fr]"
							}`}
						>
							<div className="overflow-hidden">
								<p className="text-sm text-muted-foreground leading-relaxed pt-3 border-t border-dashed border-border/50 mt-1">
									{item.description}
								</p>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="mt-auto w-full p-2 bg-muted/50 backdrop-blur-sm flex items-end sm:items-center justify-between gap-3 border-t border-border z-10 min-h-[3rem]">
						{/* Skills */}
						<div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0 py-[2px]">
							{item.skills?.slice(0, 3).map((skill) => (
								<Badge
									key={skill}
									variant="outline"
									className="max-w-full text-xs px-1.5 py-0 h-5 bg-background/50 hover:bg-accent"
								>
									<span className="truncate block">{skill}</span>
								</Badge>
							))}
							{item.skills && item.skills.length > 3 && (
								<div className="shrink-0">
									<TagPopover
										items={item.skills.slice(3)}
										triggerLabel={`+${item.skills.length - 3}`}
										className="h-5 px-1.5 py-0 bg-background/50"
									/>
								</div>
							)}
						</div>

						{/* Info Button */}
						<div className="shrink-0 sm:mt-0">
							<InfoButton isActive={isMobileActive} onClick={toggleActive} />
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Date */}
			<div className="md:hidden text-xs font-mono text-muted-foreground mt-2 pl-16">
				{item.startDate} — {item.endDate}
			</div>
		</div>
	);
}
