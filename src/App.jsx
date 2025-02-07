import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";

const App = () => {
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState("// Write your JavaScript code here...");
  const [output, setOutput] = useState("");

  // Function to execute the code 
  const runCode = () => {
    let logs = [];
    const captureLogs = (...args) => logs.push(args.join(" "));
    // console.log(captureLogs)

    try {
      // Redirect console.log to captureLogs
      const originalConsoleLog = console.log;
      console.log = captureLogs;

      // Execute the user code
      new Function(code)();

      console.log = originalConsoleLog;
    } catch (error) {
      logs.push("Error: " + error.message);
    }

    // Set logs as output
    setOutput(logs.join("\n"));
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh", py: 4, bgcolor: "#121212", color: "white" }}>
      {/* Header */}
      <Paper elevation={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "#1e1e1e", color: "white" }}>
        <Typography variant="h6">Code Editor</Typography>
        <Button variant="contained" color="primary" onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}>
          Toggle {theme === "vs-dark" ? "Light" : "Dark"} Mode
        </Button>
      </Paper>

      {/* Editor */}
      <Box mt={3} sx={{ border: "1px solid #333", borderRadius: "8px", overflow: "hidden", height: "50vh" }}>
        <Editor height="100%" language="javascript" theme={theme} value={code} onChange={(value) => setCode(value || "")} options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true, wordWrap: "on" }} />
      </Box>

      {/* Run Code Button */}
      <Button onClick={runCode} variant="contained" color="success" sx={{ mt: 2 }}>
        Run Code
      </Button>

      {/* Console Output */}
      <Box mt={2} p={2} sx={{ bgcolor: "#1e1e1e", borderRadius: "8px", minHeight: "15vh", whiteSpace: "pre-wrap", overflow: "auto", fontFamily: "monospace", border: "1px solid #333" }}>
        <Typography variant="subtitle1">Console Output:</Typography>
        <Typography sx={{ color: "lightgreen" }}>{output || "No output yet..."}</Typography>
      </Box>
    </Container>
  );
};

export default App;
