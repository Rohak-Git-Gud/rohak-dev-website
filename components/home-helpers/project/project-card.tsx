"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TagPopover } from "@/components/shared/card-tag-overflow";
import { CustomAlertPopup } from "@/components/shared/custom-alert";
import { InfoButton, GithubLink } from "@/components/shared/social-linkers";
import { Project } from "@/types/type-projects";

interface ProjectCardProps {
	project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
	const [isMobileActive, setIsMobileActive] = React.useState(false);
	const [showNotLiveDialog, setShowNotLiveDialog] = React.useState(false);

	const handleCardClick = () => {
		if (project.isLive && project.liveUrl) {
			window.open(project.liveUrl, "_blank", "noopener,noreferrer");
		} else {
			setShowNotLiveDialog(true);
		}
	};

	return (
		<div
			onClick={handleCardClick}
			className={`group relative rounded-xl border-2 border-primary bg-card overflow-hidden transition-all duration-300 hover:shadow-lg md:aspect-video aspect-4/3 ${
				project.isLive ? "cursor-pointer" : "cursor-default"
			}`}
		>
			{/* Header */}
			<div
				className={`absolute top-0 left-0 right-0 z-20 p-2 bg-primary/10 flex items-center justify-between gap-3`}
			>
				{/* Date */}
				<div className="shrink-0 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-primary/20">
					<span className="text-xs font-semibold text-foreground">{project.createdDate}</span>
				</div>

				{/* Title */}
				<h3 className="flex-1 text-base font-bold text-primary/75 text-center">{project.title}</h3>

				{/* Live Badge */}
				{project.isLive ? (
					<div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-primary/20">
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
							<path d="M4.5 16.5c-1.5 1.25-2 5-2 5s3.75-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
							<path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
							<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
							<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
						</svg>
						<span className="text-xs font-semibold text-foreground">Live</span>
					</div>
				) : (
					<div className="shrink-0 w-[72px]"></div>
				)}
			</div>

			{/* Image */}
			<div className="relative w-full h-full overflow-hidden bg-primary/10">
				<Image
					src={project.image || "/images/default/project.jpg"}
					alt={project.title}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className={`object-contain py-12 transition-transform duration-500 ${
						isMobileActive ? "scale-110" : "group-hover:scale-110"
					}`}
				/>

				{/* Description */}
				<div
					className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
						isMobileActive ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
					}`}
				>
					<div className={`absolute inset-0 bg-background/90 backdrop-blur-md`} />
					<div className="relative h-full p-4 pt-14 overflow-y-auto">
						<p className="text-sm text-foreground leading-relaxed">{project.description}</p>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div
				className={`absolute bottom-0 left-0 right-0 z-10 p-2 bg-primary/10 backdrop-blur-sm flex items-center justify-between gap-3`}
			>
				{/* Skill Badges */}
				<div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
					{project.skills.slice(0, 3).map((skill) => (
						<Badge
							key={skill}
							className="text-xs px-2 py-0.5 bg-background/90 text-foreground hover:bg-accent border border-primary/20"
						>
							{skill}
						</Badge>
					))}
					{project.skills.length > 3 && (
						<TagPopover items={project.skills.slice(3)} triggerLabel={`+${project.skills.length - 3}`} />
					)}
				</div>

				{/* Info Button */}
				<InfoButton
					isActive={isMobileActive}
					onClick={(e) => {
						e.stopPropagation();
						setIsMobileActive(!isMobileActive);
					}}
					className="p-2"
				/>

				{/* GitHub Link */}
				<GithubLink
					href={project.githubUrl}
					onClick={(e) => e.stopPropagation()}
					className="p-2 rounded-full bg-background border border-border hover:border-primary"
					iconSize="lg"
				/>
			</div>

			{/* Not Live Alert */}
			<CustomAlertPopup
				open={showNotLiveDialog}
				onOpenChange={setShowNotLiveDialog}
				title="Project Not Live"
				description="This project is not live either because its a local tool/utility or its not worth deployment. You can still view the source code."
				actionLabel="Ok"
			/>
		</div>
	);
}
