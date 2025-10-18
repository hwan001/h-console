"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
	Box,
	CircularProgress,
	Typography,
	ToggleButtonGroup,
	ToggleButton,
	Alert,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import Layout from "@/app/_components/Layout";

export default function LegalPage() {
	const [content, setContent] = useState<string | null>(null);
	const [doc, setDoc] = useState<"terms" | "privacy">("terms");
	const [error, setError] = useState<string | null>(null);

	const searchParams = useSearchParams();
	const docParam = searchParams.get("doc") as "terms" | "privacy" | null;

	useEffect(() => {
		if (docParam && (docParam === "terms" || docParam === "privacy")) {
			setDoc(docParam);
		}
	}, [docParam]);

	useEffect(() => {
		const loadMarkdown = async () => {
			try {
				setError(null);
				setContent(null);

				const res = await fetch(`/legal/${doc}.md`, {
					method: "GET",
					headers: { "Cache-Control": "no-cache" },
				});

				if (!res.ok) {
					throw new Error(`Failed to load ${doc} document (${res.status})`);
				}

				const text = await res.text();
				setContent(text);
			} catch (err: any) {
				console.error("Error fetching markdown:", err);
				setError("문서를 불러오는 중 오류가 발생했습니다.");
			}
		};

		loadMarkdown();
	}, [doc]);

	return (
		<Layout>
			<main>
				{/* <Box className="max-w-3xl mx-auto p-8"> */}
        <Box className="w-screen p-10">
					<Typography variant="h4" fontWeight="bold" className="mb-6">
						{doc === "terms" ? "Terms of Service" : "Privacy Policy"}
					</Typography>

					<ToggleButtonGroup
						value={doc}
						exclusive
						onChange={(_, val) => val && setDoc(val)}
						className="mb-6"
					>
						<ToggleButton value="terms">Terms</ToggleButton>
						<ToggleButton value="privacy">Privacy</ToggleButton>
					</ToggleButtonGroup>

					{!content && !error && (
						<Box
							display="flex"
							alignItems="center"
							justifyContent="center"
							py={6}
						>
							<CircularProgress />
						</Box>
					)}

					{error && (
						<Alert severity="error" className="mb-4">
							{error}
						</Alert>
					)}

					{content && (
						<div
							className="prose dark:prose-invert max-w-none
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-900
              rounded-xl p-8
              shadow-md transition-all duration-300
              hover:shadow-lg"
						>
							<ReactMarkdown>{content}</ReactMarkdown>
						</div>
					)}
				</Box>
			</main>
		</Layout>
	);
}
