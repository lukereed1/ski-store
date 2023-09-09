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
		},
	});

	function toggleSwitch() {
		setDarkMode(prevState);
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<Container>
					<Catalogue />
				</Container>
			</ThemeProvider>
		</>
	);
}

export default App;
