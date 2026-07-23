import { Badge } from "@/components/ui/badge";
import { GithubLink } from "@/components/shared/social-linkers";
import { aboutData } from "@/data/data-index";

export function AboutSite() {
	return (
		<section id="site" className="scroll-mt-24">
			<h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-primary">About This Site</h2>

			<div className="prose dark:prose-invert max-w-none text-muted-foreground">
				<div className="space-y-2 mb-6">
					<h3 className="font-semibold text-foreground">Tech Stack:</h3>

					<div className="flex flex-wrap gap-2">
						{aboutData.stack.map((paragraph, index) => (
							<Badge key={index} variant="secondary">{paragraph}</Badge>
						))}
					</div>
				</div>

				{aboutData.site.map((paragraph, index) => (
					<p key={index} className="mb-2">
						{paragraph}
					</p>
				))}
				
				<p className="mb-2">
					Since I’ve already done the hard work of building a bulletproof architecture, I’ve turned it into a template for the community. Here is the complete guide to rip me off:{" "}
					<GithubLink href={aboutData.siteSourceRepo} className="" iconSize="md" />
				</p>
			</div>
		</section>
	);
}
