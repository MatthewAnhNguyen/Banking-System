import { Box, Paper } from "@mui/material";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#0F172A,#1E3A8A,#0F172A)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: 430,
          p: 5,
          borderRadius: 4,
          bgcolor: "rgba(30,41,59,.9)",
          backdropFilter: "blur(15px)",
        }}
      >
        <LoginForm />
      </Paper>
    </Box>
  );
}