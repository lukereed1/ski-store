import { Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<Container component={Paper}>
			<Typography variant="h3" gutterBottom>
				Oops! We can't find what you're looking for
			</Typography>
			<Button fullWidth component={Link} to="/catalogue">
				Back to shop
			</Button>
		</Container>
	);
}
