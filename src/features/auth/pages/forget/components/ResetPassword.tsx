import { useForm, SubmitHandler } from "react-hook-form";

import {useResetpasswordMutation} from "../../../api/authAPI";
import { useAppSelector } from "../../../../../store/hooks"

type Inputs = {
	password: string;
	confirmPassword: string;
};

const ResetPassword = () => {
	const [resetpassword, {data, error, isLoading, isSuccess, isError}] = useResetpasswordMutation();
	const email = useAppSelector((state) => state.auth.reset?.email);

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<Inputs>();
	
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		resetpassword({
			email: email,
			password: data.password,
		});
	};

	return (
		<>
			<h1>Create new Pasword</h1>
			<p>your new password must be unique from those previously used.</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='password'> New Password</label>
				<input id='password' {...register("password")} />
				<label htmlFor='confirmPassword'> Confirm Password</label>
				<input id='confirmPassword' {...register("confirmPassword")} />
				<button type='submit'> Reset </button>
			</form>
		</>
	);
};

export default ResetPassword;
