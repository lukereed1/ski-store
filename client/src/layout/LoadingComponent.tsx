import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
	message?: string;
}

export default function LoadingComponent({ message = "Loading..." }: Props) {
	return (
		<Backdrop open={true} invisible={true}>
			<Box
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				height={"100vh"}>
				<CircularProgress size={100} color="primary" />
				<Typography variant="h4" sx={{ justifyContent: "center", mt: "3rem" }}>
					{message}
				</Typography>
			</Box>
		</Backdrop>
	);
}
