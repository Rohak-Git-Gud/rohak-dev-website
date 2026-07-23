"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuToggleProps {
	isOpen: boolean;
	onToggle: () => void;
}

export function MenuToggle({ isOpen, onToggle }: MenuToggleProps) {
	return (
		<Button
			variant="outline"
			size="icon"
			onClick={onToggle}
			className="rounded-xl border-2 transition-all hover:scale-105 active:scale-95 md:hidden"
			aria-label={isOpen ? "Close menu" : "Open menu"}
			aria-expanded={isOpen}
		>
			{isOpen ? (
				<X className="h-5 w-5 transition-transform" />
			) : (
				<Menu className="h-5 w-5 transition-transform" />
			)}
			<span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
		</Button>
	);
}
