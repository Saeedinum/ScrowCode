import { useForm, SubmitHandler } from "react-hook-form";

import {useForgetpassMutation} from "../../../api/authAPI";

type Inputs = {
	email: string;
};

const EmailComponent = () => {
	const [forgetpass, {data, error, isLoading, isSuccess, isError}] = useForgetpassMutation();

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		forgetpass(data);
	};

	return (
		<>
			<h1>Forget Your Password ?</h1>
			<p>A code will be sent to your email to reset password</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='email'> Email Address</label>
				<input id='email' {...register("email")} />
				<button type='submit'> Send code </button>
			</form>
		</>
	);
};

export default EmailComponent;
