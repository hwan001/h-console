/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					light: "#60a5fa", // MUI primary.light 대응
					DEFAULT: "#3b82f6", // blue-500
					dark: "#1e3a8a", // blue-900
				},
				secondary: {
					light: "#a78bfa",
					DEFAULT: "#8b5cf6",
					dark: "#6d28d9",
				},
			},
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						color: theme("colors.gray.800"),
						lineHeight: "0.8",
						p: {
							marginTop: "0.5em",
							marginBottom: "0.5em",
							lineHeight: "1.3",
						},
						li: {
							marginTop: "0.25em",
							marginBottom: "0.25em",
							lineHeight: "1.2",
						},
						h1: {
							fontWeight: "700",
							lineHeight: "1.0",
							marginBottom: "0.6em",
						},
						h2: {
							fontWeight: "600",
							lineHeight: "1.1",
							marginTop: "1em",
							marginBottom: "0.5em",
						},
						h3: {
							fontWeight: "500",
							lineHeight: "1.2",
						},
						a: {
							color: theme("colors.blue.600"),
							"&:hover": {
								color: theme("colors.blue.800"),
							},
						},
						code: {
							backgroundColor: theme("colors.gray.100"),
							padding: "0.15rem 0.25rem",
							borderRadius: "4px",
							fontWeight: "500",
						},
						blockquote: {
							borderLeftColor: theme("colors.gray.300"),
							color: theme("colors.gray.600"),
							fontStyle: "italic",
						},
					},
				},
				invert: {
					css: {
						color: theme("colors.gray.200"),
						a: { color: theme("colors.blue.400") },
						code: {
							backgroundColor: theme("colors.gray.800"),
						},
						blockquote: {
							borderLeftColor: theme("colors.gray.700"),
							color: theme("colors.gray.400"),
						},
					},
				},
			}),
		},
	},
	plugins: [require("@tailwindcss/typography")],
	darkMode: "class",
};
