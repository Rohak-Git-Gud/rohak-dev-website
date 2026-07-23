import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from 'remark-gfm'
import { Badge } from "@/components/ui/badge";
import { TagPopover } from "@/components/shared/card-tag-overflow";
import { getBlogPost } from "@/lib/blog-fetch";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const blog = getBlogPost(slug);
	if (!blog) {
		return { title: "Post Not Found" };
	}
	return {
		title: blog.title,
		description: blog.description,
		openGraph: {
			title: blog.title,
			description: blog.description,
			type: "article",
		},
	};
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;
	const blog = getBlogPost(slug);

	if (!blog) {
		notFound();
	}

	if (blog.status !== "readable") {
		redirect("/blog?wip=1");
	}

	return (
		<article className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
			{/* Header */}
			<div className="space-y-4 mb-6">
				{/* Title */}
				<h1 className="text-3xl md:text-4xl font-bold text-primary">{blog.title}</h1>

				<div className="flex flex-wrap items-center gap-2 pt-2">
					{/* Tags */}
					{blog.tags.slice(0, 3).map((tag) => (
						<Badge
							key={tag}
							className="text-sm px-2 py-0.5 bg-background/90 text-foreground hover:bg-accent border border-primary/20"
						>
							{tag}
						</Badge>
					))}
					{blog.tags.length > 3 && (
						<TagPopover items={blog.tags.slice(3)} triggerLabel={`+${blog.tags.length - 3}`} />
					)}

					{/* Date */}
					<span className="ml-auto text-sm font-semibold text-muted-foreground">{blog.date}</span>
				</div>
			</div>

			{/* Main Content */}
			<div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-primary prose-a:text-primary hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-blockquote:border-primary">
				<MDXRemote source={blog.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
			</div>
		</article>
	);
}
