import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLoginUserMutation} from "../../api/authAPI";

type TLoginData = {
	email: string;
	password: string;
};

const schema = z.object({
	email: z.string().min(1, {message: "Email is required"}).email({message: "Please enter a valid email"}),
	password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
});

const Login = () => {
	const navigate = useNavigate();
	const [loginUser] = useLoginUserMutation();

	const {
		register,
		handleSubmit,
		formState: {isDirty},
	} = useForm<TLoginData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (data: TLoginData) => {
		await loginUser(data).unwrap();
		navigate("/");
	};

	return (
		<>
			<section></section>
			<section className='flex flex-col justify-between items-center'>
				<Link to={""}>logo</Link>
				<p>
					Don't have an account? <Link to={"/signup"}>sign up</Link>
				</p>
				<h1>Welcome Back</h1>
				<p>log in to Be Attached with your team</p>

				<div>Login with Google</div>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
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
						<label htmlFor='remember'>remember me</label>
					</div>

					<Link to={"/forgetPassword"}>Forget Password?</Link>

					<button type='submit'>Login</button>
				</form>
				<p>created by scrow team</p>
				<Link to={"/contact"}>contact us</Link>
			</section>
		</>
	);
};

export default Login;
