import { createTheme } from "@mui/material";
import { blue, cyan } from "@mui/material/colors";

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: blue[700],
            dark: blue[800],
            light: blue[500],
            contrastText: '#ffff',
        },
        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#ffff',
        },
        background: {
            default: '#303134',
            paper: '#202124',
        }
    }
});