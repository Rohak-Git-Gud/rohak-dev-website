"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TagPopover } from "@/components/shared/card-tag-overflow";
import { CustomAlertPopup } from "@/components/shared/custom-alert";
import { InfoButton } from "@/components/shared/social-linkers";
import { flavorText } from "@/data/data-index";
import { Blog } from "@/types/type-blogs";

interface BlogCardProps {
	blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
	const [isExpanded, setIsExpanded] = React.useState(false);
	const [showWipDialog, setShowWipDialog] = React.useState(false);

	const handleCardClick = (e: React.MouseEvent) => {
		if (blog.status !== "readable") {
			e.preventDefault();
			setShowWipDialog(true);
		}
	};

	// Description expansion
	const toggleExpand = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="group relative rounded-xl border-2 border-primary bg-card overflow-hidden transition-all duration-300 hover:shadow-lg">
			<Link href={`/blog/${blog.slug}`} onClick={handleCardClick} className="block no-underline cursor-pointer">
				<div className="p-2 bg-primary/10 flex items-center justify-between gap-3">
					{/* Date */}
					<div className="shrink-0 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-primary/20">
						<span className="text-xs font-semibold text-foreground">{blog.date}</span>
					</div>

					{/* Title */}
					<h3 className="flex-1 text-base font-bold text-primary/75 text-left truncate">{blog.title}</h3>

					{/* Status */}
					<div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-primary/20">
						{blog.status === "readable" ? (
							<button
								type="button"
								aria-label="Readable"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									window.open(`/blog/${blog.slug}`, "_blank", "noopener,noreferrer");
								}}
								className="flex items-center gap-1.5 hover:text-primary transition-colors"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-3.5 h-3.5 text-primary/75"
								>
									<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
									<path d="M14 2v4a2 2 0 0 0 2 2h4" />
									<path d="M10 9H8" />
									<path d="M16 13H8" />
									<path d="M16 17H8" />
								</svg>
								<span className="text-xs font-semibold text-foreground">Readable</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-3.5 h-3.5"
								>
									<path d="M15 3h6v6" />
									<path d="M10 14 21 3" />
									<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
								</svg>
							</button>
						) : (
							<>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-3.5 h-3.5 text-primary/75"
								>
									<path d="M12 20h9" />
									<path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
								</svg>
								<span className="text-xs font-semibold text-foreground/75">WIP</span>
							</>
						)}
					</div>
				</div>

				{/* Description */}
				<div
					className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
						isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr] group-hover:grid-rows-[1fr]"
					}`}
				>
					<div className="overflow-hidden">
						<p className="text-sm text-muted-foreground leading-relaxed p-4 border-b border-dashed border-border/50">
							{blog.description}
						</p>
					</div>
				</div>
			</Link>

			{/* Footer */}
			<div className="p-2 bg-primary/10 backdrop-blur-sm flex items-center justify-between gap-3">
				{/* Tags */}
				<div className="flex flex-wrap gap-1.5 flex-1 min-w-0 overflow-hidden h-6">
					{blog.tags.slice(0, 3).map((tag) => (
						<Badge
							key={tag}
							className="text-xs px-2 py-0.5 bg-background/90 text-foreground hover:bg-accent border border-primary/20"
						>
							{tag}
						</Badge>
					))}
					{blog.tags.length > 3 && (
						<TagPopover items={blog.tags.slice(3)} triggerLabel={`+${blog.tags.length - 3}`} />
					)}
				</div>

				{/* Info Button */}
				<InfoButton isActive={isExpanded} onClick={toggleExpand} ariaLabel="Toggle description" />
			</div>

			{/* WIP Alert Dialog */}
			<CustomAlertPopup
				open={showWipDialog}
				onOpenChange={setShowWipDialog}
				title="Blog Incomplete"
				description={flavorText.wipBlog}
			/>
		</div>
	);
}
