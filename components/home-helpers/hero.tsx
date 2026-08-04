import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Terminal, MapPin, Calendar, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/shared/social-linkers";
import { siteMetadata } from "@/data/data-index";

export function Hero() {
	const [isWaving, setIsWaving] = React.useState(false);
	const [isProfileActive, setIsProfileActive] = React.useState(false);

	const triggerWave = () => {
		if (!isWaving) {
			setIsWaving(true);
			setTimeout(() => setIsWaving(false), 2000);
		}
	};

	const toggleProfile = () => {
		setIsProfileActive(!isProfileActive);
	};
	return (
		<section className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between py-8 md:py-12 md:gap-6 gap-12">
			<div className="flex flex-col items-start gap-6 flex-1 max-w-2xl">
				<div className="space-y-4">
					<div className="flex flex-wrap items-center gap-3">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
							Hi{" "}
							<span
								onClick={triggerWave}
								className={`animate-wave cursor-pointer ${isWaving ? "on-tap" : ""}`}
							>
								👋
							</span>
							! I'm <span className="text-primary">{siteMetadata.name}</span>
						</h2>
					</div>

					<div className="flex flex-wrap items-center gap-3">
						<div className="flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-primary text-background">
							<Terminal className="w-4 h-4" />
							<span>{siteMetadata.role}</span>
						</div>
						<div className="flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-primary text-background">
							<Terminal className="w-4 h-4" />
							<span>{siteMetadata.secondary}</span>
						</div>
						<div className="flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-muted text-foreground">
							<Terminal className="w-4 h-4" />
							<span>{siteMetadata.tertiary}</span>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-3">
						<div className="flex items-center gap-2 text-base font-medium text-muted-foreground">
							<MapPin className="w-4 h-4" />
							<span>Based in: {siteMetadata.location}</span>
						</div>
					</div>

					<p className="text-base text-muted-foreground">{siteMetadata.aboutMe}</p>
				</div>

				<div className="flex flex-wrap items-center gap-4 text-muted-foreground mt-2">
					<Link
						href="/resume.pdf"
						target="_blank"
						className="hover:text-primary/90 transition-colors flex items-center gap-1"
					>
						<FileText className="w-5 h-5" />
						<span>Resume</span>
					</Link>

					<SocialLinks />

					<Button asChild size="sm" className="rounded-full">
						<Link href="/about#me">
							More about me if you've got the time <ArrowRight className="w-4 h-4" />
						</Link>
					</Button>
				</div>
			</div>

			<div className="flex-1 w-full flex justify-center">
				<div
					onClick={toggleProfile}
					className={`relative w-56 h-56 md:w-72 md:h-72 aspect-square rounded-2xl overflow-hidden border-4 bg-muted shadow-xl transition-all duration-300 cursor-pointer ${
						isProfileActive
							? "rotate-0 border-primary"
							: "rotate-6 hover:rotate-0 border-muted hover:border-primary"
					}`}
				>
					<Image
						src={siteMetadata.photoPath || "/images/default/hero.jpg"}
						alt={siteMetadata.name}
						fill
						sizes="(max-width: 768px) 240px, 320px"
						className="object-cover"
						priority // Above Fold.. I still remember the things I learnt during my performance engineering days.
					/>
				</div>
			</div>
		</section>
	);
}
