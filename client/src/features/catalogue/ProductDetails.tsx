import {
	Box,
	Button,
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";
import { ProductionQuantityLimits } from "@mui/icons-material";

export default function ProductDetails() {
	const { id } = useParams<{ id: string }>();
	const { setBasket } = useStoreContext();
	const [product, setProduct] = useState<Product | null>(null);
	const [status, setStatus] = useState({
		status: true,
		name: "product-loading",
	});

	useEffect(() => {
		id &&
			agent.Catalogue.details(parseInt(id))
				.then((response) => setProduct(response))
				.catch((error) => console.log(error))
				.finally(() =>
					setStatus({
						status: false,
						name: "",
					})
				);
	}, [id]);

	function handleAddItem(productId: number) {
		setStatus({ status: true, name: "product-add" });
		agent.Basket.addItem(productId, 1)
			.then((basket) => setBasket(basket))
			.catch((error) => console.log(error))
			.finally(() => setStatus({ status: false, name: "" }));
	}

	if (status.name === "product-loading" && status.status === true) {
		return <LoadingComponent message="Product Loading" />;
	}

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
					{`$${(product.price / 100).toFixed(2)}`}
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
				<Box display={"flex"} justifyContent={"center"} gap={2}>
					<LoadingButton
						loading={status.status === true && status.name === "product-add"}
						fullWidth
						variant="contained"
						onClick={() => handleAddItem(product.id)}>
						ADD TO CART
					</LoadingButton>
					<Button
						fullWidth
						variant="contained"
						component={Link}
						to={"/catalogue"}>
						GO BACK
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
}
