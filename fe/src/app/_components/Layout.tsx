"use client";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex-1 flex flex-col">
			<Header />

			<div className="flex h-screen bg-gray-100">
				<Sidebar />
				{/* <main className="flex-1 p-6 overflow-y-auto">{children}</main> */}
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						overflowY: "auto",
						backgroundColor: "background.default",
						color: "text.primary",
						p: 3,
					}}
				>
					{children}
				</Box>
			</div>

			<Footer />
		</div>
	);
}
