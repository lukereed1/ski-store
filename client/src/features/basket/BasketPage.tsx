import { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import LoadingComponent from "../../layout/LoadingComponent";
import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

export default function BasketPage() {
	const { basket, setBasket, removeItem } = useStoreContext();
	const [status, setStatus] = useState({
		status: false,
		name: "",
	});

	function handleAddItem(productId: number, quantity = 1, name: string) {
		setStatus({
			status: true,
			name: name,
		});
		agent.Basket.addItem(productId)
			.then((basket) => setBasket(basket))
			.catch((error) => console.log(error))
			.finally(() =>
				setStatus({
					status: false,
					name: "",
				})
			);
	}

	function handleRemoveItem(productId: number, quantity: number, name: string) {
		setStatus({
			status: true,
			name: name,
		});
		agent.Basket.removeItem(productId, quantity)
			.then(() => removeItem(productId, quantity))
			.catch((error) => console.log(error))
			.finally(() =>
				setStatus({
					status: false,
					name: "",
				})
			);
	}

	if (!basket)
		return <Typography variant="h3">Your basket is empty</Typography>;

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						<TableCell>Product</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="center">Quantity</TableCell>
						<TableCell align="right">Subtotal</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{basket.items.map((item) => (
						<TableRow key={item.name}>
							<TableCell component="th" scope="row">
								<Box display={"flex"} alignItems={"center"}>
									<img
										style={{ marginRight: 8, height: 50 }}
										src={item.pictureUrl}
										alt={item.name}
									/>
									{item.name}
								</Box>
							</TableCell>
							<TableCell align="right">
								${(item.price / 100).toFixed(2)}
							</TableCell>

							<TableCell align="center">
								<Box alignItems={"center"}>
									<LoadingButton
										loading={
											status.status === true &&
											status.name === "rem" + item.productId
										}
										onClick={() =>
											handleRemoveItem(
												item.productId,
												1,
												"rem" + item.productId
											)
										}>
										<Remove color="error" />
									</LoadingButton>

									{item.quantity}
									<LoadingButton
										loading={
											status.status === true &&
											status.name === "add" + item.productId
										}
										onClick={() =>
											handleAddItem(item.productId, 1, "add" + item.productId)
										}>
										<Add color="secondary" />
									</LoadingButton>
								</Box>
							</TableCell>

							<TableCell align="right">
								${((item.price / 100) * item.quantity).toFixed(2)}
							</TableCell>
							<TableCell align="right">
								<LoadingButton
									loading={
										status.status === true &&
										status.name === "del" + item.productId
									}
									onClick={() =>
										handleRemoveItem(
											item.productId,
											item.quantity,
											"del" + item.productId
										)
									}>
									<Delete color="error" />
								</LoadingButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
