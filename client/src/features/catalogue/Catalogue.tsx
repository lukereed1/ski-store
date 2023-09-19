import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import LoadingComponent from "../../layout/LoadingComponent";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchProductsAsync, productSelectors } from "./catalogueSlice";

export default function Catalogue() {
	const products = useAppSelector(productSelectors.selectAll);
	const { status, productLoaded } = useAppSelector((state) => state.catalogue);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!productLoaded) dispatch(fetchProductsAsync());
	}, [productLoaded]);

	if (status.includes("Pending"))
		return <LoadingComponent message="Products Loading..." />;

	return (
		<>
			<ProductList products={products} />
		</>
	);
}
