import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/store/configureStore";
import { signOutUser } from "../features/account/accountSlice";
import { clearBasket } from "../features/basket/basketSlice";
import { Link } from "react-router-dom";

export default function SignedInMenu() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.account);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button color="inherit" onClick={handleClick} sx={{ typography: "h6" }}>
				{user?.email}
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem component={Link} to="/orders">
					My orders
				</MenuItem>
				<MenuItem
					onClick={() => {
						dispatch(signOutUser());
						dispatch(clearBasket());
					}}>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
}
