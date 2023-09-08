import { useEffect, useState } from "react";

function App() {
	const [products, setProducts] = useState([
		{ name: "product1", price: 100 },
		{ name: "product2", price: 200 },
	]);

	useEffect(() => {
		fetch("http://localhost:5000/api/products")
			.then((response) => response.json())
			.then((data) => setProducts(data));
	}, []);

	function addProduct() {
		setProducts((prevState) => [
			...prevState,
			{ name: "product3", price: 150 },
		]);
	}

	return (
		<div>
			<h1>Ski Store</h1>
			<ul>
				{products.map((item, index) => (
					<li key={index}>
						{item.name} - {item.price}
					</li>
				))}
			</ul>
			<button onClick={addProduct}>Click me</button>
		</div>
	);
}

export default App;
