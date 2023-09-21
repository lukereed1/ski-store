import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface Props {
	options: any[];
	selectedValue: string;
	onChange: (event: any) => void;
}

export default function RadioButtonGroup({
	options,
	selectedValue,
	onChange,
}: Props) {
	return (
		<RadioGroup onChange={onChange} value={selectedValue}>
			{options.map(({ value, label }) => (
				<FormControlLabel
					value={value}
					control={<Radio />}
					label={label}
					key={value}
				/>
			))}
		</RadioGroup>
	);
}
