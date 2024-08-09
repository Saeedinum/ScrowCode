import {useRef} from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import {useVerifycodeMutation} from "../../../api/authAPI";
import {useAppSelector} from "../../../../../store/hooks";

type Inputs = {
	otp: string[];
};

const OtpComponent = () => {
	const [verifycode, {data, error, isLoading, isSuccess, isError}] = useVerifycodeMutation();
	const email = useAppSelector((state) => state.auth.reset?.email);

	const {
		register,
		handleSubmit,
		setValue,
		formState: {errors},
	} = useForm<Inputs>();

	const inputsRef = useRef<HTMLInputElement[]>([]);

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const otpCode = data.otp.join(""); 
		verifycode({ otp: otpCode });
	};

	const handleChange = (element: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const value = element.target.value;
		if (isNaN(Number(value))) return;
		setValue(`otp.${index}`, value);
		if (value !== "" && index < inputsRef.current.length - 1) {
			inputsRef.current[index + 1].focus();
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		if (event.key === "Backspace" && index > 0 && !inputsRef.current[index].value) {
			inputsRef.current[index - 1].focus();
		}
	};

	return (
		<>
			<h1>Check Your Email</h1>
			<p>Enter the code that was sent to {email}</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					{[...Array(6)].map((_, index) => (
						<input
							key={index}
							{...register(`otp.${index}`, { required: true })}
							ref={(el) => (inputsRef.current[index] = el)}
							onChange={(e) => handleChange(e, index)}
							onKeyDown={(e) => handleKeyDown(e, index)}
							type="text"
							maxLength={1}
						/>
					))}
				</div>
				<button type="submit">Next</button>
			</form>
			<p>
				Didn't get the code? <button>Click to resend</button>
			</p>
		</>
	);
};

export default OtpComponent;
