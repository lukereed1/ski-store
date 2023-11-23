import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";
import { useState } from "react";

interface Props {
	metaData: MetaData;
	onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
	const { totalCount, totalPages, currentPage, pageSize } = metaData;
	const [pageNumber, setPageNumber] = useState(currentPage);

	function handlePageChange(page: number) {
		setPageNumber(page);
		onPageChange(page);
	}

	return (
		<Box
			display={"flex"}
			justifyContent={"space-between"}
			alignItems={"center"}
			paddingLeft={5}
			paddingRight={3}>
			<Typography>
				Displaying {(currentPage - 1) * pageSize + 1} -{" "}
				{currentPage * pageSize > totalCount
					? totalCount
					: currentPage * pageSize}{" "}
				of {totalCount} items
			</Typography>

			<Pagination
				count={totalPages}
				page={pageNumber}
				onChange={(_e, page) => handlePageChange(page)}
			/>
		</Box>
	);
}
