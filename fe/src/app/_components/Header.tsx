"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";

export default function Header() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<AppBar position="static" className="shadow-none">
				<Toolbar className="flex justify-between">
					<div className="flex items-center">
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
						<Typography variant="h6" className="text-gray-800 font-bold">
							h-console
						</Typography>
					</div>
					<div className="flex items-center space-x-4">
						{/* Add more header actions or user menu here */}
					</div>
				</Toolbar>
			</AppBar>

			<Drawer
				anchor="left"
				open={open}
				onClose={() => setOpen(false)}
				slotProps={{
					paper: {
						sx: {
							top: "64px",
							height: "calc(100% - 64px)",
						},
					},
				}}
			>
				<List>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText primary="Clusters" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText primary="Logs" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText primary="Settings" />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
		</>
	);
}
