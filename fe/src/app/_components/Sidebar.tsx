"use client";
import { usePathname, useRouter } from "next/navigation";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import clsx from "clsx";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
	const router = useRouter();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	const navItems = [
		{ label: "Clusters", path: "/clusters" },
		{ label: "Settings", path: "/settings" },
	];

	return (
		<>
			{/* 모바일 메뉴 버튼 */}
			<button
				className="md:hidden fixed top-4 left-4 z-50 bg-gray-300 p-2 rounded-lg shadow-md"
				onClick={() => setOpen(!open)}
			>
				<Menu className="w-6 h-6 text-gray-700" />
			</button>

			{/* 사이드바 */}
			<aside
				className={clsx(
					"bg-gray-300 h-full flex flex-col fixed md:static top-0 left-0 z-40 transition-transform duration-300 ease-in-out",
					open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
					"w-64 md:w-64 lg:w-72" 
				)}
			>
				<List>
					{navItems.map((item) => (
						<ListItem key={item.path} disablePadding>
							<ListItemButton
								onClick={() => {
									router.push(item.path);
									setOpen(false);
								}}
								className={clsx(
									"rounded-none",
									pathname === item.path && "bg-gray-400"
								)}
							>
								<ListItemText primary={item.label} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</aside>

			{/* 오버레이 (모바일일 때 사이드바 열려 있으면 배경 클릭 시 닫기) */}
			{open && (
				<div
					className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-30"
					onClick={() => setOpen(false)}
				/>
			)}
		</>
	);
}
