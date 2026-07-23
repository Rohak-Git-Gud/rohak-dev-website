"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TagPopoverProps {
	items: string[];
	triggerLabel: string;
	className?: string;
}

export function TagPopover({ items, triggerLabel, className = "" }: TagPopoverProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Badge
					variant="outline"
					className={`text-xs px-2 py-0.5 bg-background/90 text-foreground hover:bg-accent border border-primary/20 cursor-pointer ${className}`}
					onClick={(e) => {
						e.stopPropagation();
						setIsOpen(!isOpen);
					}}
					onMouseEnter={() => setIsOpen(true)}
					onMouseLeave={() => setIsOpen(false)}
				>
					{triggerLabel}
				</Badge>
			</PopoverTrigger>
			<PopoverContent
				className="w-fit max-w-[200px] p-2"
				onClick={(e) => e.stopPropagation()}
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
			>
				<div className="flex flex-wrap gap-1.5">
					{items.map((item) => (
						<Badge key={item} variant="secondary" className="text-xs px-1.5 py-0.5 h-auto">
							{item}
						</Badge>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}
