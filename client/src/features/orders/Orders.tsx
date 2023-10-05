import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../app/models/order";
import agent from "../../app/api/agent";
import LoadingComponent from "../../layout/LoadingComponent";
import { currencyFormat } from "../../app/util/util";
import OrderDetails from "./OrderDetails";

export default function Orders() {
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState<Order[] | null>(null);
	const [selectedOrderId, setSelectedOrderId] = useState(0);

	useEffect(() => {
		setLoading(true);
		agent.Order.list()
			.then((orders) => setOrders(orders))
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <LoadingComponent message="Loading orders..." />;

	if (selectedOrderId > 0)
		return (
			<OrderDetails
				order={orders?.find((o) => o.id === selectedOrderId)}
				setSelectedOrderId={setSelectedOrderId}
			/>
		);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Order Number</TableCell>
						<TableCell align="right">Total</TableCell>
						<TableCell align="right">Order Date</TableCell>
						<TableCell align="right">Order Status</TableCell>
						<TableCell align="right"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{orders?.map((order) => (
						<TableRow
							key={order.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<TableCell component="th" scope="row">
								{order.id}
							</TableCell>
							<TableCell align="right">{currencyFormat(order.total)}</TableCell>
							<TableCell align="right">
								{order.orderData.split("T")[0]}
							</TableCell>
							<TableCell align="right">{order.orderStatus}</TableCell>
							<TableCell align="right">
								<Button onClick={() => setSelectedOrderId(order.id)}>
									VIEW
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
