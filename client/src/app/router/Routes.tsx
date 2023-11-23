import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../layout/App";
import Catalogue from "../../features/catalogue/Catalogue";
import ProductDetails from "../../features/catalogue/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import LoginPage from "../../features/account/LoginPage";
import RegisterPage from "../../features/account/RegisterPage";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				element: <RequireAuth />,
				children: [
					{ path: "checkout", element: <CheckoutWrapper /> },
					{ path: "orders", element: <Orders /> },
				],
			},
			{
				element: <RequireAuth roles={["Admin"]} />,
				children: [{ path: "inventory", element: <Inventory /> }],
			},
			{ path: "catalogue", element: <Catalogue /> },
			{ path: "catalogue/:id", element: <ProductDetails /> },
			{ path: "about", element: <AboutPage /> },
			{ path: "contact", element: <ContactPage /> },
			{ path: "server-error", element: <ServerError /> },
			{ path: "basket", element: <BasketPage /> },
			{ path: "login", element: <LoginPage /> },
			{ path: "register", element: <RegisterPage /> },
			{ path: "not-found", element: <NotFound /> },
			{
				path: "*",
				element: <Navigate replace to="/not-found" />,
			},
		],
	},
]);
