import * as yup from "yup";

export const validationSchema = [
	yup.object({
		fullName: yup.string().required("Your full name is required"),
		address1: yup.string().required("This is a required field"),
		address2: yup.string().required("This is a required field"),
		city: yup.string().required("This is a required field"),
		state: yup.string().required("This is a required field"),
		zip: yup.string().required("This is a required field"),
		country: yup.string().required("This is a required field"),
	}),
	yup.object(),
	yup.object({ nameOnCard: yup.string().required("Name on card is required") }),
];
