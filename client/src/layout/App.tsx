import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalogue from "../features/catalogue/Catalogue";
import { Typography } from "@mui/material";

function App() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetch("http://localhost:5000/api/products")
			.then((response) => response.json())
			.then((data) => setProducts(data));
	}, []);

	function addProduct() {
		setProducts((prevState) => [
			...prevState,
			{
				id: prevState.length + 1,
				name: "product" + prevState.length,
				price: prevState.length * 100 + 100,
				description: "hello",
				pictureUrl: "http://picsum.photos/300",
				quantityInStock: 1,
			},
		]);
	}

	return (
		<>
			<Typography variant="h1">Ski Store</Typography>
			<Catalogue
				products={products}
				addProduct={addProduct}
			/>
		</>
	);
}

export default App;
