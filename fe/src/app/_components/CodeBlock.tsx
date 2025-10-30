"use client";
import { Box, IconButton, useTheme } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

export default function CodeBlock({
  code,
  language = "bash",
}: {
  code: string;
  language?: string;
}) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

  const prismTheme =
    theme.palette.mode === "dark" ? themes.dracula : themes.github;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        mb: 2,
        border: `1px solid ${
          theme.palette.mode === "dark" ? "#333" : "#ddd"
        }`,
      }}
    >
      <IconButton
        size="small"
        onClick={handleCopy}
        sx={{
          position: "absolute",
          top: 6,
          right: 6,
          color: copied
            ? theme.palette.success.main
            : theme.palette.text.secondary,
          zIndex: 1,
        }}
      >
        <ContentCopyIcon fontSize="small" />
      </IconButton>

      <Highlight theme={prismTheme} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              margin: 0,
              padding: "2rem",
              overflowX: "auto",
			  lineHeight: 1.6,
			  minHeight: "5rem",
			  maxHeight: "10rem",
              fontSize: "0.8rem",
              fontFamily: "monospace",
              background: prismTheme.plain.backgroundColor,
			  color: prismTheme.plain.color,
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Box>
  );
}