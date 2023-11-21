import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

export default function RegisterPage() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { isSubmitting, errors, isValid },
	} = useForm({
		mode: "onTouched",
	});

	function handleApiErrors(errors: any) {
		if (errors) {
			errors.forEach((error: string) => {
				if (error.includes("Password")) {
					setError("password", { message: error });
				} else if (error.includes("Email")) {
					setError("email", { message: error });
				} else if (error.includes("Username")) {
					setError("username", { message: error });
				}
			});
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
				Register
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit((data) =>
					agent.Account.register(data)
						.then(() => {
							toast.success("Registration Successful - you can now login");
							navigate("/login");
						})
						.catch((error) => handleApiErrors(error))
				)}
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
					label="Email"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
							message: "Not a valid email address",
						},
					})}
					error={!!errors.email}
					helperText={errors?.email?.message as string}
				/>
				<TextField
					margin="normal"
					fullWidth
					autoComplete="on"
					label="Password"
					type="password"
					{...register("password", {
						required: "Password is required",
						pattern: {
							value:
								/(?=^.{6,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
							message: "Password does not meet requirements",
						},
					})}
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
					Register
				</LoadingButton>
				<Grid container>
					<Grid item>
						<Link to={"/login"}>Already have an account? Sign in</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
