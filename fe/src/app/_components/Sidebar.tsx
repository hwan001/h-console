"use client";
import { usePathname, useRouter } from "next/navigation";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import clsx from "clsx";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Clusters", path: "/clusters" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-60 bg-gray-300 h-full flex flex-col">
      {/* <h1 className="text-2xl font-semibold px-4 py-3">h-console</h1> */}
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => router.push(item.path)}
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
  );
}