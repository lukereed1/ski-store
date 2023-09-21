import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import LoadingComponent from "../../layout/LoadingComponent";
import ProductList from "./ProductList";
import { useEffect } from "react";
import {
	fetchFiltersAsync,
	fetchProductsAsync,
	productSelectors,
	setProductParams,
} from "./catalogueSlice";
import {
	Box,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Grid,
	Pagination,
	Paper,
	Typography,
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";

const sortOptions = [
	{ value: "name", label: "Alphabetical" },
	{ value: "priceDesc", label: "Price - High to low" },
	{ value: "price", label: "Price - Low to high" },
];

export default function Catalogue() {
	const products = useAppSelector(productSelectors.selectAll);
	const { status, productLoaded, filtersLoaded, brands, types, productParams } =
		useAppSelector((state) => state.catalogue);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!productLoaded) dispatch(fetchProductsAsync());
	}, [productLoaded, dispatch]);

	useEffect(() => {
		if (!filtersLoaded) dispatch(fetchFiltersAsync());
	}, [filtersLoaded, dispatch]);

	if (status.includes("Pending"))
		return <LoadingComponent message="Products Loading..." />;

	return (
		<Grid container spacing={4}>
			<Grid item xs={3}>
				<Paper sx={{ mb: 2 }}>
					<ProductSearch />
				</Paper>

				<Paper sx={{ mb: 2, p: 2 }}>
					<RadioButtonGroup
						selectedValue={productParams.orderBy}
						options={sortOptions}
						onChange={(e) =>
							dispatch(setProductParams({ orderBy: e.target.value }))
						}
					/>
				</Paper>

				<Paper sx={{ mb: 2, p: 2 }}>
					<CheckboxButtons
						items={brands}
						checked={productParams.brands}
						onChange={(items: string[]) =>
							dispatch(setProductParams({ brands: items }))
						}
					/>
				</Paper>

				<Paper sx={{ mb: 2, p: 2 }}>
					<CheckboxButtons
						items={types}
						checked={productParams.types}
						onChange={(items: string[]) =>
							dispatch(setProductParams({ types: items }))
						}
					/>
				</Paper>
			</Grid>

			<Grid item xs={9}>
				<ProductList products={products} />
			</Grid>

			<Grid item xs={12}>
				<Box
					display={"flex"}
					justifyContent={"space-between"}
					paddingLeft={5}
					paddingRight={3}>
					<Typography>Displaying 1-6 of 20 items</Typography>

					<Pagination count={10} />
				</Box>
			</Grid>
		</Grid>
	);
}
