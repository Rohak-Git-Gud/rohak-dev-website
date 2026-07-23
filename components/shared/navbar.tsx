"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/shared/navbar-helpers/theme-toggle/theme-toggle-animate";
import { MenuToggle } from "@/components/shared/navbar-helpers/menu-toggle-animate";
import { siteMetadata } from "@/data/data-index";

const NAV_LINKS = [
	{ href: "/blog", label: "Blog" },
	{ href: "/about", label: "About" },
] as const;

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

	// Prevents body scrolling when mobile menu is open
	React.useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [mobileMenuOpen]);

	return (
		<>
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
				<div className="container mx-auto flex h-14 items-center px-4 md:px-8">
					<div className="mr-4 flex">
						<Link href="/" className="mr-6 flex items-center space-x-2">
							<div className="relative h-8 w-8">
								<Image
									src="/logo/icons_light/favicon-32x32.png"
									alt="Logo Light"
									fill
									sizes="32px"
									className="dark:hidden object-contain"
								/>
								<Image
									src="/logo/icons_dark/favicon-32x32.png"
									alt="Logo Dark"
									fill
									sizes="32px"
									className="hidden dark:block object-contain"
								/>
							</div>
							<span className="font-bold text-primary">{siteMetadata.domain}</span>
						</Link>

						<nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
							{/* Loop through all social links */}
							{NAV_LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="transition-colors hover:text-foreground/80 text-foreground/60"
								>
									{link.label}
								</Link>
							))}
						</nav>
					</div>
					<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
						<div className="w-full flex-1 md:w-auto md:flex-none">
							{/* Placeholder for pushing theme toggle and menu toggle to the right */}
						</div>
						<ThemeToggle />
						<MenuToggle isOpen={mobileMenuOpen} onToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
					</div>
				</div>
			</header>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
					mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={() => setMobileMenuOpen(false)}
			/>

			{/* Mobile Menu */}
			<div className={`fixed top-3 right-4 z-60 md:hidden ${mobileMenuOpen ? "" : "hidden"}`}>
				<MenuToggle isOpen={mobileMenuOpen} onToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
			</div>

			<div
				className={`fixed top-14 right-0 bottom-0 z-50 w-64 border-l bg-background transition-transform duration-300 ease-in-out md:hidden ${
					mobileMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<nav className="flex flex-col space-y-1 p-4">
					{/* Loop through all social links for mobile menu */}
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setMobileMenuOpen(false)}
							className="rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
						>
							{link.label}
						</Link>
					))}
				</nav>
			</div>
		</>
	);
}
