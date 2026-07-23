"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface BlogModalProps {
	children: React.ReactNode;
	title: string;
	description?: string;
}

export function BlogModal({ children, title, description }: BlogModalProps) {
	const router = useRouter();
	const [open, setOpen] = React.useState(true);

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);
		if (!isOpen) {
			router.back();
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="w-[90vw] max-w-4xl! max-h-[75vh] overflow-hidden p-0 border-primary border-2">
				<DialogTitle className="sr-only">{title}</DialogTitle>
				{description && <DialogDescription className="sr-only">{description}</DialogDescription>}
				<div className="p-4 md:p-6 overflow-y-auto max-h-[75vh]">{children}</div>
			</DialogContent>
		</Dialog>
	);
}
