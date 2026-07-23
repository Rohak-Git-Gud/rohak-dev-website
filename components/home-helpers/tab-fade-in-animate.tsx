"use client";

import { motion } from "framer-motion";

interface FadeInProps {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.4, delay, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
