import { useEffect } from "react";
import {
	productSelectors,
	fetchProductsAsync,
	fetchFiltersAsync,
} from "../../features/catalogue/catalogueSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";

export default function useProducts() {
	const products = useAppSelector(productSelectors.selectAll);
	const { productLoaded, filtersLoaded, brands, types, metaData } =
		useAppSelector((state) => state.catalogue);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!productLoaded) dispatch(fetchProductsAsync());
	}, [productLoaded, dispatch]);

	useEffect(() => {
		if (!filtersLoaded) dispatch(fetchFiltersAsync());
	}, [filtersLoaded, dispatch]);

	return {
		products,
		productLoaded,
		filtersLoaded,
		brands,
		types,
		metaData,
	};
}
