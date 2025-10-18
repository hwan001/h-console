"use client";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex-1 flex flex-col">
			<Header />
			
			<div className="flex h-screen bg-gray-100">
        <Sidebar />
				<main className="p-6 overflow-y-auto">{children}</main>
			</div>

      <Footer />
		</div>
	);
}
