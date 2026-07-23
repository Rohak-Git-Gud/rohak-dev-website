"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CustomAlertPopupProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	actionLabel?: string;
}

export function CustomAlertPopup({
	open,
	onOpenChange,
	title,
	description,
	actionLabel = "Got it",
}: CustomAlertPopupProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent onClick={(e) => e.stopPropagation()}>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction>{actionLabel}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
