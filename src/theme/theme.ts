import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#2563EB",
    },

    secondary: {
      main: "#14B8A6",
    },

    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },

    success: {
      main: "#22C55E",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#EF4444",
    },

    text: {
      primary: "#F8FAFC",
      secondary: "#CBD5E1",
    },
  },

  shape: {
    borderRadius: 14,
  },

  typography: {
    fontFamily: "Poppins, Roboto, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

export default theme;