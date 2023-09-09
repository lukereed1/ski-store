import Catalogue from "../features/catalogue/Catalogue";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useState } from "react";

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const paletteType = darkMode ? "dark" : "light";

	const theme = createTheme({
		palette: {
			mode: paletteType,
			background: {
				default: paletteType === "light" ? "#EAEAEA" : "#121212",
			},
		},
	});

	const toggleTheme = () => {
		setDarkMode(!darkMode);
	};

	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header darkmode={darkMode} toggleTheme={toggleTheme} />
				<Container>
					<Catalogue />
				</Container>
			</ThemeProvider>
		</>
	);
}

export default App;
