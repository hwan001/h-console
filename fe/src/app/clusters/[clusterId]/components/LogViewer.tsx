"use client";
import { useRef } from "react";

export default function LogViewer({ logs }: { logs: string[] }) {
	const logEndRef = useRef<HTMLDivElement>(null);

	return (
		<div
			className="
        p-4 sm:p-6 
        bg-black text-green-400 font-mono text-sm 
        h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh]
        w-full max-w-full
        overflow-y-auto rounded-lg shadow-inner resize
      "
		>
			{logs.map((line, i) => (
				<div key={i}>{line}</div>
			))}
			<div ref={logEndRef} />
		</div>
	);
}
