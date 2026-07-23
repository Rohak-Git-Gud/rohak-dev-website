import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				// Apply these headers to all routes in the application
				source: "/(.*)",
				headers: [
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
					{
						// Protects against Clickjacking attacks
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						// Prevents the browser from guessing content types
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						// Enforces HTTPS routing and tells browsers to cache this enforcement
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						// Protects external referrer data leakage
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
				],
			},
		];
	},
};

export default nextConfig;
