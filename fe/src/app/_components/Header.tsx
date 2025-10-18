"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import {
	colors,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation"
import ConnectionIndicator from "./ConnectionIndicator";

export default function Header() {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleClick = (endpoint: string) => {
		router.push(endpoint);
	};

	return (
		<>
			<AppBar position="static" className="shadow-none">
				<Toolbar className="flex justify-between">
					<div className="flex items-center">
						<Typography variant="h6" className="text-gray-800 font-bold">
							h-console
						</Typography>
					</div>
					<div className="flex items-center space-x-4">
						{/* Add more header actions or user menu here */}
						<ConnectionIndicator />
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							className="mr-2 text-gray-700"
							onClick={() => setOpen(true)}
						>
							<MenuIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>

			<Drawer
				anchor="right"
				open={open}
				onClose={() => setOpen(false)}
				slotProps={{
					paper: {
						sx: {
							top: "64px",
							width: "220px",
							height: "calc(100% - 64px)",
							color: "#fff",
							background: "#7f7f7f",
						},
					},
				}}
			>
				<List>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText
								primary="Clusters"
								onClick={() => {handleClick("/clusters")}}
							/>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText primary="Settings" onClick={() => {handleClick("/settings")}} />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
		</>
	);
}
