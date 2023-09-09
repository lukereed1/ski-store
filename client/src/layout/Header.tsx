import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
	darkmode: Boolean;
	toggleTheme: () => void;
}

export default function Header({ toggleTheme }: Props) {
	return (
		<AppBar position="static" sx={{ mb: 4 }}>
			<Toolbar>
				<Typography variant="h6">SKI-STORE</Typography>
				<Switch onChange={toggleTheme} />
			</Toolbar>
		</AppBar>
	);
}
