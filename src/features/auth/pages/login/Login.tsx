import {Link, Form} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useLoginQuery} from "../../api/authAPI";
import {useState} from "react";
import {skipToken} from "@reduxjs/toolkit/query";

const Login = () => {
	const [loginData, setLoginData] = useState();
	const {data: loginrequest, error, isLoading} = useLoginQuery(loginData ?? skipToken);

	const {
		register,
		handleSubmit,
		formState: {isDirty},
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data) => {
    setLoginData(data);
    console.log(loginrequest)
	};

	return (
		<section className='flex flex-col justify-between items-center'>
			<Link to={""}>logo</Link>
			<Link to={"/signup"}>sign up</Link>

			<Form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
				<label htmlFor='email'>Email</label>
				<input
					id='email'
					type='text'
					{...register("email", {
						required: "required",
					})}
				/>
				<br />
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					{...register("password", {
						required: "required",
					})}
				/>
				<br />
				<div>
					<input type='checkbox' name='remember' id='remember' />
					<label htmlFor='remember'> remeber me </label>
				</div>

				<Link to={"/forgetPassword"}>forgetPassword</Link>

				<button type='submit' disabled={!isDirty || isLoading}>
					Login
				</button>
			</Form>
		</section>
	);
};
export default Login;
