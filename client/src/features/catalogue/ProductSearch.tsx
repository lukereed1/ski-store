import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogueSlice";
import { useState } from "react";

export default function ProductSearch() {
	const { productParams } = useAppSelector((state) => state.catalogue);
	const dispatch = useAppDispatch();
	const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

	const debouncedSearchTerm = debounce((event: any) => {
		dispatch(setProductParams({ searchTerm: event.target.value }));
	}, 1500);

	return (
		<TextField
			label="Search Products"
			variant="outlined"
			fullWidth
			value={searchTerm || ""}
			onChange={(event: any) => {
				setSearchTerm(event.target.value);
				debouncedSearchTerm(event);
			}}
		/>
	);
}
