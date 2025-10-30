"use client";
import { usePathname, useRouter } from "next/navigation";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import clsx from "clsx";
import { useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { useResponsiveStore } from "../_stores/ResponsiveStore";

export default function Sidebar() {
	const theme = useTheme();
	const router = useRouter();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [width, setWidth] = useState(260);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const { isMobile } = useResponsiveStore();
	if (isMobile) return null;
	
	const navItems = [
		{ label: "Clusters", path: "/clusters" },
		{ label: "Settings", path: "/settings" },
	];

	const handleMouseDown = (e: React.MouseEvent) => {
		const startX = e.clientX;
		const startWidth = sidebarRef.current?.offsetWidth || width;

		const handleMouseMove = (moveEvent: MouseEvent) => {
			const newWidth = Math.min(
				Math.max(startWidth + (moveEvent.clientX - startX), 180),
				500
			);
			setWidth(newWidth);
		};

		const handleMouseUp = () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	return (
		<>
			<aside
				ref={sidebarRef}
				style={{
					width,
					backgroundColor: theme.palette.background.paper,
					color: theme.palette.text.primary,
				}}
				className={clsx(
					"bg-gray-300 h-full flex flex-col fixed md:static top-0 left-0 z-40 transition-transform duration-300 ease-in-out",
					open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
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
								sx={(theme) => ({
									borderRadius: 0,
									"&.Mui-selected": {
										backgroundColor: theme.palette.action.selected,
									},
									"&:hover": {
										backgroundColor: theme.palette.action.hover,
									},
								})}
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

				<div
					onMouseDown={handleMouseDown}
					className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-gray-400/20"
				/>
			</aside>

			{open && (
				<div
					className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-30"
					onClick={() => setOpen(false)}
				/>
			)}
		</>
	);
}
