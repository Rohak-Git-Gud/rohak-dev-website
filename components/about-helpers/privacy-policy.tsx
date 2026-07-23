import { aboutData } from "@/data/data-index";

export function PrivacyPolicy() {
	return (
		<section id="privacy-policy" className="scroll-mt-24">
			<h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-primary">Privacy Policy</h2>

			<div className="prose dark:prose-invert max-w-none text-muted-foreground">
				<div className="mb-6">
					{aboutData.privacy.map((paragraph, index) => (
						<p key={index} className="mb-2">
							{paragraph}
						</p>
					))}
				</div>

				<ul className="list-disc pl-6 space-y-1">
					{aboutData.pointers.map((pointer, index) => (
						<li key={index}>{pointer}</li>
					))}
				</ul>
			</div>
		</section>
	);
}
