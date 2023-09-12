import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import LoadingComponent from "../../layout/LoadingComponent";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

export default function Catalogue() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		agent.Catalogue.list()
			.then((products) => setProducts(products))
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <LoadingComponent message="Products Loading..." />;

	return (
		<>
			<ProductList products={products} />
		</>
	);
}
