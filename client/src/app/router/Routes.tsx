import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalogue from "../../features/catalogue/Catalogue";
import ProductDetails from "../../features/catalogue/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "", element: <HomePage /> },
			{ path: "catalogue", element: <Catalogue /> },
			{ path: "catalogue/:id", element: <ProductDetails /> },
			{ path: "about", element: <AboutPage /> },
			{ path: "contact", element: <ContactPage /> },
			{ path: "server-error", element: <ServerError /> },
			{ path: "basket", element: <BasketPage /> },
			{ path: "checkout", element: <CheckoutPage /> },
			{ path: "not-found", element: <NotFound /> },
			{
				path: "*",
				element: <Navigate replace to="/not-found" />,
			},
		],
	},
]);
