import {
	Alert,
	AlertTitle,
	Button,
	ButtonGroup,
	Container,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage() {
	const [validationError, setValidationError] = useState<string[]>([]);

	function getValidationError() {
		agent.TestErrors.getValidationError().catch((error) =>
			setValidationError(error)
		);
	}

	return (
		<Container>
			<Typography gutterBottom variant="h2">
				Testing Errors
			</Typography>
			<ButtonGroup fullWidth>
				<Button
					variant="contained"
					onClick={() =>
						agent.TestErrors.get400Error().catch((error) => console.log(error))
					}>
					400
				</Button>
				<Button
					variant="contained"
					onClick={() =>
						agent.TestErrors.get401Error().catch((error) => console.log(error))
					}>
					401
				</Button>
				<Button
					variant="contained"
					onClick={() =>
						agent.TestErrors.get404Error().catch((error) => console.log(error))
					}>
					404
				</Button>
				<Button
					variant="contained"
					onClick={() =>
						agent.TestErrors.get500Error().catch((error) => console.log(error))
					}>
					500
				</Button>
				<Button variant="contained" onClick={getValidationError}>
					Validation
				</Button>
			</ButtonGroup>
			{validationError.length > 0 && (
				<Alert severity="error">
					<AlertTitle>Validation Errors</AlertTitle>
					<List>
						{validationError.map((error) => (
							<ListItem key={error}>
								<ListItemText>{error}</ListItemText>
							</ListItem>
						))}
					</List>
				</Alert>
			)}
		</Container>
	);
}
