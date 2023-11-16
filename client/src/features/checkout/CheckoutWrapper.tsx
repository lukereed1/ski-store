import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import LoadingComponent from "../../layout/LoadingComponent";

export default function CheckoutWrapper() {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		agent.Payment.createPaymentIntent()
			.then((basket) => dispatch(setBasket(basket)))
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	});

	const stripePromise = loadStripe(
		"pk_test_51NyNq2CxI3WPeui3j3afaRaL4JuoQrROIc0i1UPXbOVyc1U7uhYXEqfJvsvK03R66j7lo1dlURJuecbytE7wI8e000zJpJ5v9N"
	);

	if (loading) return <LoadingComponent message="Loading Checkout..." />;

	return (
		<Elements stripe={stripePromise}>
			<CheckoutPage />
		</Elements>
	);
}
