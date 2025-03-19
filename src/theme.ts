// src/theme.ts
import { createTheme, Theme } from "@mui/material";

// Import the light scheme from the JSON theme
const lightScheme = {
  primary: "#47672F",
  onPrimary: "#FFFFFF",
  primaryContainer: "#C8EEA8",
  onPrimaryContainer: "#304F1A",
  secondary: "#56624B",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#DAE7C9",
  onSecondaryContainer: "#3F4A35",
  tertiary: "#386665",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#BBECEA",
  onTertiaryContainer: "#1E4E4D",
  background: "#F9FAEF",
  onBackground: "#191D16",
  surface: "#F9FAEF",
  onSurface: "#191D16",
  surfaceVariant: "#E0E4D6",
  onSurfaceVariant: "#44483E",
  outline: "#74796D",
  error: "#BA1A1A",
  onError: "#FFFFFF",
};

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: lightScheme.primary,
      contrastText: lightScheme.onPrimary,
      light: lightScheme.primaryContainer,
      dark: lightScheme.onPrimaryContainer,
    },
    secondary: {
      main: lightScheme.secondary,
      contrastText: lightScheme.onSecondary,
      light: lightScheme.secondaryContainer,
      dark: lightScheme.onSecondaryContainer,
    },
    error: {
      main: lightScheme.error,
      contrastText: lightScheme.onError,
    },
    background: {
      default: lightScheme.background,
      paper: lightScheme.surface,
    },
    text: {
      primary: lightScheme.onSurface,
      secondary: lightScheme.onSurfaceVariant,
    },
    divider: lightScheme.outline,
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: lightScheme.surface,
          color: lightScheme.onSurface,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: lightScheme.outline,
            },
          },
        },
      },
    },
  },
});