import {
	Container,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import agent from "../app/api/agent";
import LoadingComponent from "./LoadingComponent";
import { getCookie } from "../app/util/util";
import { useAppDispatch } from "../app/store/configureStore";
import { setBasket } from "../features/basket/basketSlice";

function App() {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);
	const [darkMode, setDarkMode] = useState(false);
	const paletteType = darkMode ? "dark" : "light";

	useEffect(() => {
		const buyerId = getCookie("buyerId");
		if (buyerId) {
			agent.Basket.get()
				.then((basket) => dispatch(setBasket(basket)))
				.catch((error) => console.log(error))
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [dispatch]);

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

	if (loading) return <LoadingComponent message="Loading Ski Store..." />;

	return (
		<>
			<ThemeProvider theme={theme}>
				<ToastContainer
					position="bottom-right"
					hideProgressBar
					theme="colored"
				/>
				<CssBaseline />
				<Header darkmode={darkMode} toggleTheme={toggleTheme} />
				<Container>
					<Outlet />
				</Container>
			</ThemeProvider>
		</>
	);
}

export default App;
