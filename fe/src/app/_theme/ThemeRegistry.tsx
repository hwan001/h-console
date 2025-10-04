"use client"

import * as React from "react"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { ThemeProvider, CssBaseline } from "@mui/material"
import theme from "./theme"

// 서버/클라이언트에서 동일한 cache key를 사용해야 함
const muiCache = createCache({ key: "mui", prepend: true })

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}