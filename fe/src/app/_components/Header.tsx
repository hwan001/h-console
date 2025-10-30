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
import { useRouter } from "next/navigation";
import ConnectionIndicator from "./ConnectionIndicator";
import { useResponsiveStore } from "../_stores/ResponsiveStore";

export default function Header() {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { isMobile } = useResponsiveStore();

	const handleClick = (endpoint: string) => {
		router.push(endpoint);
	};

	return (
		<>
			<AppBar position="static" className="shadow-none">
				<Toolbar className="flex justify-between">
					<div className="flex items-center">
						<Typography
							variant="h6"
							sx={(theme) => ({
								fontWeight: "bold",
								color: theme.palette.text.primary,
								fontFamily: theme.typography.fontFamily,
							})}
						>
							h-console
						</Typography>
					</div>
					<div className="flex items-center space-x-4">
						<ConnectionIndicator />
						{isMobile && (
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								className="mr-2"
								onClick={() => setOpen(true)}
							>
								<MenuIcon />
							</IconButton>
						)}
					</div>
				</Toolbar>
			</AppBar>

			{isMobile && (
				<Drawer
					anchor="right"
					open={open}
					onClose={() => setOpen(false)}
					slotProps={{
						paper: {
							sx: (theme) => ({
								top: "64px",
								width: "220px",
								height: "calc(100% - 64px)",
								color: theme.palette.text.primary,
								backgroundColor: theme.palette.background.paper,
							}),
						},
					}}
				>
					<List>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText
									primary="Clusters"
									onClick={() => {
										handleClick("/clusters");
									}}
								/>
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText
									primary="Settings"
									onClick={() => {
										handleClick("/settings");
									}}
								/>
							</ListItemButton>
						</ListItem>
					</List>
				</Drawer>
			)}
		</>
	);
}
