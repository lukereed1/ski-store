import { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import LoadingComponent from "../../layout/LoadingComponent";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

export default function BasketPage() {
	const [loading, setLoading] = useState(true);
	const [basket, setBasket] = useState<Basket | null>(null);

	useEffect(() => {
		agent.Basket.get()
			.then((basket) => setBasket(basket))
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <LoadingComponent message="Loading Basket..." />;

	if (!basket) return <Typography variant="h3">Basket not found!</Typography>;

	return <Typography variant="h3">{basket.buyerId}</Typography>;
}
