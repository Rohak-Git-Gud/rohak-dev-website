import { Metadata } from "next";
import Link from "next/link";
import { Braces } from "lucide-react";

export const metadata: Metadata = {
	title: "404 - Not Found",
	description: "The page you are looking for does not exist.",
};

export default function NotFound() {
	return (
		<div className="flex h-[calc(100vh-16rem)] flex-col items-center justify-center space-y-6 px-4 text-center">
			<div className="relative">
				<Braces className="h-24 w-24 text-primary opacity-80" strokeWidth={1.5} />
				<div className="absolute -bottom-4 left-1/2 h-2 w-16 -translate-x-1/2 rounded-[100%] bg-primary/20 blur-sm"></div>
			</div>

			<div className="space-y-2">
				<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">404 - Page Not Found</h2>
				<p className="max-w-lg text-muted-foreground text-lg">
					I took precautions here too. Either you're lost or a try hard.
				</p>
			</div>

			<Link
				href="/"
				className="mt-4 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
			>
				Go Back. There are no Easter Eggs in Ba Sing Se.
			</Link>
		</div>
	);
}
