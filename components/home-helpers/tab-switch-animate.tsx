"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
	id: string;
	label: string;
};

interface AnimatedTabsProps {
	tabs: Tab[];
	activeTab: string;
	onTabChange: (id: string) => void;
	className?: string;
}

export function AnimatedTabs({ tabs, activeTab, onTabChange, className }: AnimatedTabsProps) {
	return (
		<div className={cn("flex space-x-1 rounded-full bg-muted/50 p-1", className)}>
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => onTabChange(tab.id)}
					className={cn(
						"relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2",
						activeTab === tab.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
					)}
					style={{
						WebkitTapHighlightColor: "transparent",
					}}
				>
					{activeTab === tab.id && (
						<motion.span
							layoutId="bubble"
							className="absolute inset-0 z-10 bg-primary"
							style={{ borderRadius: 9999 }}
							transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
						/>
					)}
					<span className="relative z-20">{tab.label}</span>
				</button>
			))}
		</div>
	);
}
