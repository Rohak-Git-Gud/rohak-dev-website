"use client";

import * as React from "react";
import Link from "next/link";
import { siteMetadata } from "@/data/data-index";

interface SocialLinkProps {
	platform: "github" | "linkedin" | "devto" | "email";
	href: string;
	className?: string;
	iconSize?: "sm" | "md" | "lg";
	onClick?: (e: React.MouseEvent) => void;
}

interface SocialLinksProps {
	className?: string;
	iconSize?: "sm" | "md" | "lg";
}

interface InfoButtonProps {
	isActive: boolean;
	onClick: (e: React.MouseEvent) => void;
	ariaLabel?: string;
	className?: string;
}

// Don't question the source of paths.
// I had to trial and error multiple to see what worked for me
// It may be simple-icons, font-awesome or even AI generated paths.
const Social_SVG_Icon_Path = {
	github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
	linkedin:
		"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
	devto: "M7.826 10.083a.784.784 0 0 0-.468-.175h-.701v4.198h.701a.786.786 0 0 0 .468-.175c.155-.117.233-.292.233-.525v-2.798c.001-.233-.078-.408-.233-.525zM19.236 3H4.764C3.791 3 3 3.791 3 4.764v14.472C3 20.209 3.791 21 4.764 21h14.472C20.209 21 21 20.209 21 19.236V4.764C21 3.791 20.209 3 19.236 3zM9.195 13.414c0 .755-.466 1.901-1.942 1.898H5.389V8.665h1.903c1.424 0 1.902 1.144 1.902 1.899v2.85zm4.045-3.562H11.1v1.544h1.309v1.188H11.1v1.544h2.142v1.188h-2.498a.813.813 0 0 1-.833-.792V9.497a.813.813 0 0 1 .792-.833h2.539l-.002 1.188zm4.165 4.632c-.531 1.235-1.481.99-1.906 0l-1.548-5.818h1.309l1.016 4.572 1.015-4.572h1.309l-1.195 5.818z",
	email: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
};

const Social_HTTPS_Links = {
	github: siteMetadata.socials.github,
	linkedin: siteMetadata.socials.linkedin,
	devto: siteMetadata.socials.devto,
	email: "mailto:" + siteMetadata.socials.email,
};

/**
 * A reusable social media link component that renders a platform-specific SVG icon.
 * @description
 * This component constructs a full URL using the `platform` key and the provided `href`.
 * It handles accessible labeling via `<title>` and screen-reader-only text,
 * and opens links in a new tab by default.
 * @component
 * @param {Object} props - The properties for the SocialLink component.
 * @param {"github" | "linkedin" | "devto" | "email"} props.platform - The social media platform key (e.g., 'github', 'twitter').
 * @param {string} [props.href=""] - The username or path to append to the base platform URL.
 * @param {string} [props.className=""] - Additional CSS classes for custom styling.
 * @param {"sm" | "md" | "lg"} [props.iconSize="md"] - The size preset for the SVG icon.
 * @param {React.MouseEventHandler<HTMLAnchorElement>} [props.onClick] - Optional click handler for analytics or tracking.
 * @returns {JSX.Element} An anchor link wrapping a platform-specific SVG icon.
 * @example
 * <SocialLink
 * platform="github"
 * href="username"
 * iconSize="lg"
 * className="p-2"
 * />
 */
export function SocialLink({ platform, href = "", className = "", iconSize = "md", onClick }: SocialLinkProps) {
	const sizeClass = iconSize === "sm" ? "w-4 h-4" : iconSize === "lg" ? "w-6 h-6" : "w-5 h-5";

	return (
		<Link
			href={Social_HTTPS_Links[platform] + href}
			target="_blank"
			rel="noreferrer"
			onClick={onClick}
			className={`text-muted-foreground hover:text-primary/90 transition-colors inline-flex items-center ${className}`}
		>
			<svg
				role="img"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				className={sizeClass}
			>
				{/* Capitalize first letter; I gave up trying to find a less complicated or non bruteforce way */}
				<title>{platform.charAt(0).toUpperCase() + platform.slice(1)}</title>
				<path d={Social_SVG_Icon_Path[platform]} />
			</svg>
			<span className="sr-only capitalize">{platform}</span>
		</Link>
	);
}

export function SocialLinks({ className = "", iconSize = "md" }: SocialLinksProps) {
	return (
		<div className={`flex items-center gap-4 ${className}`}>
			<SocialLink platform="linkedin" href="" iconSize={iconSize} />
			<SocialLink platform="devto" href="" iconSize={iconSize} className="scale-120" />
			<SocialLink platform="github" href="" iconSize={iconSize} className="scale-120" />
			<SocialLink platform="email" href="" iconSize={iconSize} className="scale-120" />
		</div>
	);
}

export function InfoButton({ isActive, onClick, ariaLabel = "Toggle details", className = "" }: InfoButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`shrink-0 p-1.5 rounded-full transition-colors duration-200 border ${
				isActive
					? "bg-accent border-primary"
					: "bg-background/90 border-border group-hover:bg-accent group-hover:border-primary"
			} ${className}`}
			aria-label={ariaLabel}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="w-4 h-4 text-primary/90 hover:text-primary/75"
			>
				<circle cx="12" cy="12" r="10" />
				<line x1="12" y1="16" x2="12" y2="12" />
				<line x1="12" y1="8" x2="12.01" y2="8" />
			</svg>
		</button>
	);
}

export function GithubLink({ href = "", className = "", iconSize = "md", onClick }: Omit<SocialLinkProps, "platform">) {
	return <SocialLink platform="github" href={href} className={className} iconSize={iconSize} onClick={onClick} />;
}
