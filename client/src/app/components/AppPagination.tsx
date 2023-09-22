import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
	metaData: MetaData;
	onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
	const { totalCount, totalPages, currentPage, pageSize } = metaData;
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
				page={currentPage}
				onChange={(e, page) => onPageChange(page)}
			/>
		</Box>
	);
}
