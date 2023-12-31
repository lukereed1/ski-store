import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../app/store/configureStore";
import { signInUser } from "./accountSlice";

export default function LoginPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors, isValid },
	} = useForm({
		mode: "onTouched",
	});

	async function submitForm(data: FieldValues) {
		try {
			await dispatch(signInUser(data));
			navigate(location.state?.from || "/catalogue");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Container
			component={Paper}
			maxWidth="xs"
			sx={{
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				padding: 4,
			}}>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit(submitForm)}
				noValidate
				sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					fullWidth
					label="Username"
					autoFocus
					{...register("username", {
						required: "Username is required",
					})}
					error={!!errors.username}
					helperText={errors?.username?.message as string}
				/>
				<TextField
					margin="normal"
					fullWidth
					autoComplete="on"
					label="Password"
					type="password"
					{...register("password", { required: "Password is required" })}
					error={!!errors.password}
					helperText={errors?.password?.message as string}
				/>
				<LoadingButton
					loading={isSubmitting}
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={!isValid}>
					Sign In
				</LoadingButton>
				<Grid container>
					<Grid item>
						<Link to={"/register"}>Don't have an account? Sign Up</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
