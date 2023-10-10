import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutWrapper() {
	const stripePromise = loadStripe(
		"pk_test_51NyNq2CxI3WPeui3j3afaRaL4JuoQrROIc0i1UPXbOVyc1U7uhYXEqfJvsvK03R66j7lo1dlURJuecbytE7wI8e000zJpJ5v9N"
	);

	return (
		<Elements stripe={stripePromise}>
			<CheckoutPage />
		</Elements>
	);
}
