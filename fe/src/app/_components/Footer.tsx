"use client";

import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      className="
        w-full py-6 mt-10 border-t border-gray-200
        bg-white text-gray-600
        flex flex-col items-center justify-center
        dark:bg-gray-900 dark:text-gray-400
      "
    >
      <Typography variant="body2" align="center" className="mb-1">
        © {new Date().getFullYear()} hwan001. All rights reserved.
      </Typography>

      <Box className="flex gap-4 text-sm">
        <Link
          href="/legal?doc=privacy"
          color="inherit"
          underline="hover"
          className="hover:text-blue-500"
        >
          Privacy
        </Link>
        <Link
          href="/legal?doc=terms"
          color="inherit"
          underline="hover"
          className="hover:text-blue-500"
        >
          Terms
        </Link>
        <Link
          href="https://github.com/hwan001/h-console"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          underline="hover"
          className="hover:text-blue-500"
        >
          GitHub
        </Link>
      </Box>
    </Box>
  );
}