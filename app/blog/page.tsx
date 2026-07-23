import { Metadata } from "next";
import { getBlogs } from "@/lib/blog-fetch";
import { BlogCard } from "@/components/blog-helpers/blog-card";
import { WipPopupHandler } from "@/components/blog-helpers/wip-popup-handler";
import { flavorText } from "@/data/data-index";

export const metadata: Metadata = {
	title: "Blog",
	description: flavorText.blog,
};

interface PageProps {
	searchParams: Promise<{ wip?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
	const blogs = getBlogs();
	const { wip } = await searchParams;

	return (
		<div className="container mx-auto px-4 md:px-8 py-12 space-y-6">
			<div className="space-y-2">
				<h2 className="text-3xl font-bold flex items-center gap-3 text-primary">Blog</h2>
				<p className="rose dark:prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">{flavorText.blog}</p>
			</div>

			<div className="max-w-8xl mx-auto">
				{blogs.length > 0 ? (
					<div className="grid grid-cols-1 gap-3 items-start">
						{blogs.map((blog) => (
							<BlogCard key={blog.slug} blog={blog} />
						))}
					</div>
				) : (
					<p className="text-center text-muted-foreground py-20 italic">{flavorText.noBlog}</p>
				)}
			</div>
			{wip === "1" && <WipPopupHandler />}
		</div>
	);
}
