"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CustomAlertPopup } from "@/components/shared/custom-alert";
import { flavorText } from "@/data/data-index";

export function WipPopupHandler() {
	const router = useRouter();
	const [open, setOpen] = React.useState(true);

	const handleClose = (isOpen: boolean) => {
		setOpen(isOpen);
		if (!isOpen) {
			router.replace("/blog");
		}
	};

	return (
		<CustomAlertPopup
			open={open}
			onOpenChange={handleClose}
			title="Blog Incomplete"
			description={flavorText.wipBlog}
		/>
	);
}
