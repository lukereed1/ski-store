import { Box, Button, Grid, Typography } from "@mui/material";
import { Order } from "../../app/models/order";
import BasketTable from "../basket/BasketTable";
import { BasketItem } from "../../app/models/basket";
import BasketSummary from "../basket/BasketSummary";

interface Props {
	order?: Order;
	setSelectedOrderId: (id: number) => void;
}

export default function OrderDetails({ order, setSelectedOrderId }: Props) {
	const subtotal =
		order?.orderItems.reduce(
			(sum, item) => sum + item.quantity * item.price,
			0
		) ?? 0;
	return (
		<>
			<Box
				display={"flex"}
				justifyContent={"space-around"}
				alignItems={"center"}
				marginBottom={2}>
				<Typography variant="h3">
					Order #{order?.id} - {order?.orderStatus}
				</Typography>
				<Button variant="contained" onClick={() => setSelectedOrderId(0)}>
					Return
				</Button>
			</Box>

			<BasketTable items={order?.orderItems as BasketItem[]} isBasket={false} />
			<Grid container>
				<Grid item xs={6} />
				<Grid item xs={6}>
					<BasketSummary subtotal={subtotal} />
				</Grid>
			</Grid>
		</>
	);
}
