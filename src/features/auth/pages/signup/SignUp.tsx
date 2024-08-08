import {Form, Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {TsignupUser} from "../../../../types";
import {zodResolver} from "@hookform/resolvers/zod";

import {signupUserSchema} from "./schema";
import SignUpStudent from "./SignUpStudent";

import {useSignupUserMutation} from "../../api/authAPI";
import {useState} from "react";

const SignUp = () => {
	const [signupUser, {data, error, isLoading, isSuccess, isError}] = useSignupUserMutation();

	const [section, setSection] = useState(1);

	const handleSection = (section: number) => {
		setSection(section);
	};

	const {
		register,
		handleSubmit,
		getValues,
		formState: {errors, isDirty, dirtyFields, isValid},
	} = useForm<TsignupUser>({
		defaultValues: {
			fullName: "fdsafds",
			phone: "+201018824294",
			email: "ffadsf@gmail.com",
			password: "test123Q!",
			confirmPassword: "test123Q!",
		},
		mode: "onBlur",
		resolver: zodResolver(signupUserSchema),
	});

	const onSubmit = async (data: TsignupUser) => {
		const response = await signupUser({
			fullName: data.fullName,
			phone: data.phone,
			Email: data.email,
			password: data.password,
			passwordConfirm: data.confirmPassword,
		}).unwrap();
		if (response?.token) {
			handleSection(2);
		}
	};

	return (
		<>
			<section>
				<div>
					image
					{section}
				</div>
				<div>
					<Link to={"/"}>logo</Link>
					<p>
						Already have account <Link to={"/login"}>login</Link>
					</p>
					<div>
						<Form onSubmit={handleSubmit(onSubmit)}>
							{section == 1 && (
								<div>
									<label htmlFor='fullName'>Full Name</label>
									<input id='fullName' type='text' placeholder='Full Name' {...register("fullName")} />
									<br />
									<label htmlFor='phone'>Phone</label>
									<input id='phone' type='phone' placeholder='Phone Number' {...register("phone")} />
									<br />
									<label htmlFor='email'>Email</label>
									<input id='email' type='email' placeholder='Email' {...register("email")} />
									<br />
									<label htmlFor='password'>Password</label>
									<input id='password' type='password' placeholder='Password' {...register("password")} />
									<br />
									<label htmlFor='confirmPassword'>Password</label>
									<input id='confirmPassword' type='confirmPassword' placeholder='Confirm Password' {...register("confirmPassword")} />
									<button
										type='submit'
										disabled={getValues(["email", "password", "phone", "fullName", "confirmPassword"]).some((value) => value === "")}
									>
										Next Step
									</button>
								</div>
							)}
						</Form>
						{section == 2 && <SignUpStudent />}
					</div>
				</div>
			</section>
		</>
	);
};

export default SignUp;
