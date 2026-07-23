import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parseDate } from "@/lib/utils";
import { Blog } from "@/types/type-blogs";

const blogsDirectory = path.join(process.cwd(), "content/blogs");

/**
 * Retrieves all blog posts from the file system, parses their metadata,
 * and returns them sorted by status and date.
 * @description
 * This function reads `.mdx` files from the blogs directory, extracts
 * front-matter using `gray-matter`, and sorts the resulting list.
 * * **Sorting Logic:**
 * 1. Posts with `status: "readable"` are moved to the top.
 * 2. Secondary sort is descending by date (newest first).
 * @returns {Blog[]} An array of parsed blog objects.
 * @throws {Error} If the blogs directory cannot be read or a file is missing.
 */
export function getBlogs(): Blog[] {
	// Directory not found handling
	if (!fs.existsSync(blogsDirectory)) {
        console.log(`Blog Directory not found`);
        return [];
    }

	const fileNames = fs.readdirSync(blogsDirectory).filter(file => file.endsWith(".mdx"));

	// No Blogs handling
    if (fileNames.length === 0) {
        return [];
    }

	const allBlogsData = fileNames.map((blog) => {
		const slug = blog.replace(/\.mdx$/, "");

		const fullPath = path.join(blogsDirectory, blog);
		const fileContents = fs.readFileSync(fullPath, "utf8");

		const matterResult = matter(fileContents);

		return {
			slug,
			content: matterResult.content,
			...(matterResult.data as Omit<Blog, "slug" | "content">),
		};
	});

	return allBlogsData.sort((a, b) => {
		if (a.status === "readable" && b.status !== "readable") return -1;
		if (a.status !== "readable" && b.status === "readable") return 1;
		return parseDate(b.date).getTime() - parseDate(a.date).getTime();
	});
}

/**
 * Retrieves a single blog post by its slug.
 * @description
 * Attempts to locate and parse an `.mdx` file matching the provided slug.
 * If the file exists, it extracts the front-matter metadata and content.
 * @param {string} slug - The unique identifier (filename without extension) of the blog post.
 * @returns {Blog | undefined} The parsed blog post object, or `undefined` if the file
 * is not found or an error occurs during reading.
 */
export function getBlogPost(slug: string): Blog | undefined {
	try {
		const fullPath = path.join(blogsDirectory, `${slug}.mdx`);
		const fileContents = fs.readFileSync(fullPath, "utf8");

		const matterResult = matter(fileContents);

		return {
			slug,
			content: matterResult.content,
			...(matterResult.data as Omit<Blog, "slug" | "content">),
		};
	} catch (error) {
		return undefined;
	}
}
