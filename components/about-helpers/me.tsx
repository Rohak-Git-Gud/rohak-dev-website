import { PhotoSwipe } from "@/components/about-helpers/photo-swipe-animate";
import { aboutData } from "@/data/data-index";

export function AboutMe() {
	return (
		<section id="me" className="scroll-mt-24">
			<h2 className="text-3xl font-bold mb-3 flex items-center gap-3 text-primary">About Me</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-12 items-start">
				<div className="prose dark:prose-invert max-w-none text-muted-foreground order-2 md:order-1">
					{aboutData.me.map((paragraph, index) => (
						<p key={index} className="mb-2">
							{paragraph}
						</p>
					))}
				</div>

				<div className="order-1 md:order-2 flex justify-center">
					<PhotoSwipe />
				</div>
			</div>
		</section>
	);
}
