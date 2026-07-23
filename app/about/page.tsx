import { Metadata } from "next";
import { AboutMe } from "@/components/about-helpers/me";
import { AboutSite } from "@/components/about-helpers/site";
import { PrivacyPolicy } from "@/components/about-helpers/privacy-policy";
import { flavorText } from "@/data/data-index";

export const metadata: Metadata = {
	title: "About",
	description: flavorText.about,
};

export default function AboutPage() {
	return (
		<div className="container mx-auto px-4 md:px-8 py-12 space-y-6">
			<AboutMe />
			<AboutSite />
			<PrivacyPolicy />
		</div>
	);
}
