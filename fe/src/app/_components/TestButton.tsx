"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface ButtonProps {
	endpoint?: string;
	content?: string;
	modal?: string;
}


export default function TestButton({ endpoint, content, modal }: ButtonProps) {
	const router = useRouter();

	const handleClick = () => {
		if (endpoint) {
			router.push(endpoint);
		}
    if (modal) {} // string 값에 따라 모달 호출
	};

	return (
		<div className="p-6">
			<Button
				variant="contained"
				className="bg-blue-500 hover:bg-blue-600"
				onClick={handleClick}
			>
				{content}
			</Button>
		</div>
	);
}
