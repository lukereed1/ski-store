import { Grid, List } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
	products: Product[];
}

export default function ProductList({ products }: Props) {
	const { productLoaded } = useAppSelector((state) => state.catalogue);

	return (
		<>
			<Grid container spacing={4}>
				{products.map((product) => (
					<Grid item xs={4} key={product.id}>
						{productLoaded ? (
							<ProductCard product={product} />
						) : (
							<ProductCardSkeleton />
						)}
					</Grid>
				))}
			</Grid>
		</>
	);
}
