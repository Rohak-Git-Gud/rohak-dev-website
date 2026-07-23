import Link from "next/link";
import Image from "next/image";
import { SocialLinks } from "@/components/shared/social-linkers";
import { siteMetadata } from "@/data/data-index";

export function Footer() {
	return (
		<footer className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4 md:px-8">
				<div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 px-4 md:flex-nowrap md:gap-2 md:px-0">
					<Link
						href="/"
						className="flex items-center text-center text-sm leading-loose text-primary md:text-left"
					>
						<div className="relative h-5 w-5 mr-2">
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
						{siteMetadata.domain}
					</Link>

					<div className="text-sm font-medium text-foreground">© {new Date().getFullYear()}</div>

					<span className="text-muted-foreground">|</span>

					<Link
						href="/about#site"
						className="text-sm font-medium underline underline-offset-4 hover:text-primary/90 transition-colors"
					>
						Cloudy site lore with a chance of Grand Theft Code
					</Link>

					<span className="text-muted-foreground">|</span>

					<Link
						href="/about#privacy-policy"
						className="text-sm font-medium underline underline-offset-4 hover:text-primary/90 transition-colors"
					>
						Info you allow me to sell (I don't actually)
					</Link>
				</div>

				<div className="flex items-center gap-4">
					<SocialLinks />
				</div>
			</div>
		</footer>
	);
}
