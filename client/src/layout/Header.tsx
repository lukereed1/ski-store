import { ShoppingCart } from "@mui/icons-material";
import {
	AppBar,
	Badge,
	Box,
	IconButton,
	List,
	ListItem,
	Switch,
	Toolbar,
	Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../app/context/StoreContext";

const midlinks = [
	{ title: "catalogue", path: "/catalogue" },
	{ title: "about", path: "/about" },
	{ title: "contact", path: "/contact" },
];

const rightLinks = [
	{ title: "login", path: "/login" },
	{ title: "register", path: "/register" },
];

const navStyles = {
	color: "inherit",
	typography: "h6",
	textDecoration: "none",
	"&:hover": { color: "secondary.main" },
	"&.active": { color: "text.secondary" },
};

interface Props {
	darkmode: Boolean;
	toggleTheme: () => void;
}

export default function Header({ toggleTheme }: Props) {
	const { basket } = useStoreContext();

	const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<AppBar
			position="static"
			sx={{
				mb: 4,
			}}>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Box display={"flex"} alignItems={"center"}>
					<Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
						SKI-STORE
					</Typography>

					<Switch onChange={toggleTheme} />
				</Box>

				<List sx={{ display: "flex" }}>
					{midlinks.map(({ title, path }) => (
						<ListItem component={NavLink} to={path} key={path} sx={navStyles}>
							{title.toUpperCase()}
						</ListItem>
					))}
				</List>

				<Box display={"flex"}>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						component={Link}
						to="basket">
						<Badge badgeContent={itemCount} color="secondary">
							<ShoppingCart />
						</Badge>
					</IconButton>

					<List sx={{ display: "flex" }}>
						{rightLinks.map(({ title, path }) => (
							<ListItem component={NavLink} to={path} key={path} sx={navStyles}>
								{title.toUpperCase()}
							</ListItem>
						))}
					</List>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
