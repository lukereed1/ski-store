import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

export default function Catalogue() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		agent.Catalogue.list().then((products) => setProducts(products));
	}, []);

	return (
		<>
			<ProductList products={products} />
		</>
	);
}
