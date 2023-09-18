import {
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../layout/LoadingComponent";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
	addBasketItemAsync,
	removeBasketItemAsync,
	setBasket,
} from "../basket/basketSlice";

export default function ProductDetails() {
	const { basket, status } = useAppSelector((state) => state.basket);
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(0);
	const item = basket?.items.find((i) => i.productId === product?.id);

	useEffect(() => {
		if (item) setQuantity(item.quantity);
		id &&
			agent.Catalogue.details(parseInt(id))
				.then((response) => setProduct(response))
				.catch((error) => console.log(error))
				.finally(() => setLoading(false));
	}, [id, item]);

	function handleInputChange(event: any) {
		if (event.target.value >= 0) setQuantity(parseInt(event.target.value));
	}

	function handleUpdateCart() {
		if (!item || quantity > item.quantity) {
			const updatedQuantity = item ? quantity - item.quantity : quantity;
			dispatch(
				addBasketItemAsync({
					productId: product?.id!,
					quantity: updatedQuantity,
				})
			);
		} else {
			const updatedQuantity = item.quantity - quantity;
			dispatch(
				removeBasketItemAsync({
					productId: product?.id!,
					quantity: updatedQuantity,
				})
			);
		}
	}

	if (loading) return <LoadingComponent message="Product Loading" />;

	if (!product) return <NotFound />;

	return (
		<Grid container spacing={6}>
			<Grid item xs={6}>
				<img
					src={product.pictureUrl}
					alt={product.name}
					style={{ width: "100%" }}
				/>
			</Grid>

			<Grid item xs={6}>
				<Typography variant="h3">{product.name}</Typography>
				<Typography variant="h4" color="secondary">
					{currencyFormat(product.price)}
				</Typography>

				<Divider sx={{ mb: 2 }} />

				<TableContainer>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>{product.name}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Description</TableCell>
								<TableCell>{product.description}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Type</TableCell>
								<TableCell>{product.type}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Brand</TableCell>
								<TableCell>{product.brand}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Quantity</TableCell>
								<TableCell>{product.quantityInStock}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							onChange={handleInputChange}
							label="Quantity in cart"
							value={quantity}
							type="number"
							fullWidth
						/>
					</Grid>

					<Grid item xs={6}>
						<LoadingButton
							loading={status === "Item Removing Pending" + product.id}
							disabled={
								quantity === item?.quantity || (!item && quantity === 0)
							}
							onClick={handleUpdateCart}
							sx={{ height: "55px" }}
							fullWidth
							variant="contained">
							{item ? "Update Quantity" : "Add to cart"}
						</LoadingButton>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
