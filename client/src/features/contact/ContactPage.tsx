import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage() {
	const dispatch = useAppDispatch();
	const { data, title } = useAppSelector((state) => state.counter);

	return (
		<>
			<Typography variant="h2">{title}</Typography>
			<Typography variant="h5">Data: {data}</Typography>

			<Box>
				<Button
					onClick={() => dispatch(increment(1))}
					color="primary"
					variant="contained">
					Increment
				</Button>
				<Button
					onClick={() => dispatch(decrement(1))}
					color="error"
					variant="contained">
					Decrement
				</Button>
				<Button
					onClick={() => dispatch(increment(5))}
					color="secondary"
					variant="contained">
					Increment by 5
				</Button>
			</Box>
		</>
	);
}
