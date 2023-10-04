import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

interface Props {
	items: BasketItem[];
	isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
	const { status } = useAppSelector((state) => state.basket);
	const dispatch = useAppDispatch();

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
					{items.map((item) => (
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
									{isBasket && (
										<LoadingButton
											loading={
												status === "itemRemovingPending" + item.productId
											}
											onClick={() =>
												dispatch(
													removeBasketItemAsync({
														productId: item.productId,
														quantity: 1,
													})
												)
											}>
											<Remove color="error" />
										</LoadingButton>
									)}
									{item.quantity}
									{isBasket && (
										<LoadingButton
											loading={status === "itemAddPending" + item.productId}
											onClick={() =>
												dispatch(
													addBasketItemAsync({
														productId: item.productId,
														quantity: 1,
													})
												)
											}>
											<Add color="secondary" />
										</LoadingButton>
									)}
								</Box>
							</TableCell>

							<TableCell align="right">
								${((item.price / 100) * item.quantity).toFixed(2)}
							</TableCell>
							<TableCell align="right">
								{isBasket && (
									<LoadingButton
										loading={
											status === "bulkItemRemovingPending" + item.productId
										}
										onClick={() =>
											dispatch(
												removeBasketItemAsync({
													productId: item.productId,
													quantity: item.quantity,
												})
											)
										}>
										<Delete color="error" />
									</LoadingButton>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
