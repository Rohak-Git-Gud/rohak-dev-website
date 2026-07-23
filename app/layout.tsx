import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/shared/navbar-helpers/theme-toggle/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { siteMetadata } from "@/data/data-index";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: siteMetadata.siteUrl ? new URL(siteMetadata.siteUrl) : undefined,
	title: {
		default: siteMetadata.seo.title,
		template: `${siteMetadata.domain} - %s`,
	},
	description: siteMetadata.seo.description,
	keywords: siteMetadata.seo.keywords,
	authors: [{ name: siteMetadata.name }],
	creator: siteMetadata.name,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteMetadata.siteUrl || undefined,
		title: siteMetadata.seo.title,
		description: siteMetadata.seo.description,
		siteName: siteMetadata.name,
	},
	twitter: {
		card: "summary_large_image",
		title: siteMetadata.seo.title,
		description: siteMetadata.seo.description,
		creator: siteMetadata.name,
	},
	icons: {
		icon: [
			{ url: "/logo/icons_light/favicon-16x16.png", sizes: "16x16", media: "(prefers-color-scheme: light)" },
			{ url: "/logo/icons_dark/favicon-16x16.png", sizes: "16x16", media: "(prefers-color-scheme: dark)" },
			{ url: "/logo/icons_light/favicon-32x32.png", sizes: "32x32", media: "(prefers-color-scheme: light)" },
			{ url: "/logo/icons_dark/favicon-32x32.png", sizes: "32x32", media: "(prefers-color-scheme: dark)" },
			{ url: "/logo/icons_light/favicon.ico", media: "(prefers-color-scheme: light)" },
			{ url: "/logo/icons_dark/favicon.ico", media: "(prefers-color-scheme: dark)" },
		],
		apple: [
			{ url: "/logo/icons_light/apple-touch-icon.png", media: "(prefers-color-scheme: light)" },
			{ url: "/logo/icons_dark/apple-touch-icon.png", media: "(prefers-color-scheme: dark)" },
		],
	},
	manifest: "/logo/icons_light/site.webmanifest",
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<div className="flex min-h-screen flex-col">
						<Navbar />

						<main className="flex-1">
							{children}
							{modal}
						</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
