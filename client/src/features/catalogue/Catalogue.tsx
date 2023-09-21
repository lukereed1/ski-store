import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import LoadingComponent from "../../layout/LoadingComponent";
import ProductList from "./ProductList";
import { useEffect } from "react";
import {
	fetchFiltersAsync,
	fetchProductsAsync,
	productSelectors,
} from "./catalogueSlice";
import {
	Box,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	Pagination,
	Paper,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";

const sortOptions = [
	{ value: "name", label: "Alphabetical" },
	{ value: "price", label: "Price - High to low" },
	{ value: "priceDesc", label: "Price - Low to high" },
];

export default function Catalogue() {
	const products = useAppSelector(productSelectors.selectAll);
	const { status, productLoaded, filtersLoaded, brands, types } =
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
					<TextField label="Search Products" variant="outlined" fullWidth />
				</Paper>

				<Paper sx={{ mb: 2, p: 2 }}>
					<FormControl component="fieldset">
						<FormLabel></FormLabel>
						<RadioGroup>
							{sortOptions.map(({ value, label }) => (
								<FormControlLabel
									value={value}
									control={<Radio />}
									label={label}
								/>
							))}
						</RadioGroup>
					</FormControl>
				</Paper>

				<Paper sx={{ mb: 2, p: 2 }}>
					<FormGroup>
						{brands.map((brand) => (
							<FormControlLabel
								control={<Checkbox defaultChecked />}
								label={brand}
							/>
						))}
					</FormGroup>
				</Paper>

				<Paper>
					<FormGroup sx={{ mb: 2, p: 2 }}>
						{types.map((type) => (
							<FormControlLabel
								control={<Checkbox defaultChecked />}
								label={type}
							/>
						))}
					</FormGroup>
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
