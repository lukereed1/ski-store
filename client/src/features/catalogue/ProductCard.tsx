import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	CardHeader,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

interface Props {
	product: Product;
}

export default function ProductCard({ product }: Props) {
	const [loading, setLoading] = useState(false);

	function handleAddItem(productId: number) {
		setLoading(true);
		agent.Basket.addItem(productId)
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}

	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: "secondary.main" }}>
						{product.name.charAt(0).toUpperCase()}
					</Avatar>
				}
				title={product.name}
				titleTypographyProps={{ sx: { fontWeight: "bold", color: "primary" } }}
			/>

			<CardMedia
				sx={{
					height: 140,
					backgroundSize: "contain",
					bgcolor: "primary.light",
				}}
				image={product.pictureUrl}
				title={product.name}
			/>

			<CardContent>
				<Typography gutterBottom color="secondary" variant="h5">
					${(product.price / 100).toFixed(2)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{product.brand} / {product.type}
				</Typography>
			</CardContent>

			<CardActions>
				<LoadingButton
					loading={loading}
					onClick={() => handleAddItem(product.id)}
					size="small">
					ADD TO CART
				</LoadingButton>
				<Button component={Link} to={`/catalogue/${product.id}`} size="small">
					VIEW
				</Button>
			</CardActions>
		</Card>
	);
}
