import {
	Box,
	Button,
	Grid,
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
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {
	const { basket, status } = useAppSelector((state) => state.basket);
	const dispatch = useAppDispatch();

	function handleAddItem(productId: number, quantity = 1) {
		dispatch(addBasketItemAsync({ productId, quantity }));
	}

	function handleRemoveItem(productId: number, quantity: number) {
		dispatch(removeBasketItemAsync({ productId, quantity }));
	}

	if (!basket)
		return <Typography variant="h3">Your basket is empty</Typography>;

	return (
		<>
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
												status === "Item Removing Pending" + item.productId
											}
											onClick={() => handleRemoveItem(item.productId, 1)}>
											<Remove color="error" />
										</LoadingButton>

										{item.quantity}
										<LoadingButton
											loading={status === "Item Add Pending" + item.productId}
											onClick={() => handleAddItem(item.productId, 1)}>
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
											status === "Item Removing Pending" + item.productId
										}
										onClick={() =>
											handleRemoveItem(item.productId, item.quantity)
										}>
										<Delete color="error" />
									</LoadingButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Grid container>
				<Grid item xs={6} />
				<Grid item xs={6}>
					<BasketSummary />
					<Button variant="contained" fullWidth component={Link} to="/checkout">
						Checkout
					</Button>
				</Grid>
			</Grid>
		</>
	);
}
