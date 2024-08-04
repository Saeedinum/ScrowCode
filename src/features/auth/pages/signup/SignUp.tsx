import {useState} from "react";
import {name, username, email, password, phone, githubRegex, linkedinRegex, behanceRegex, universityEmailRegex} from "../../../../constants/regex";
import tracks from "../../../../constants/tracks";
import {Form, Link} from "react-router-dom";
import universities from "../../../../constants/university";
import {useForm} from "react-hook-form";
import {TSignUPData} from "../../../../types";

const SignUp = () => {
	const [section, setSection] = useState(localStorage.getItem("section") || 1);

	const handleSection = (section: number) => {
		localStorage.setItem("section", section.toString());
		setSection(section);
	};

	const {
		register,
		handleSubmit,
		formState: {errors, isDirty, dirtyFields, isValid},
		getValues,
		trigger,
	} = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			phone: "",
			email: "",
			password: "",
			// university: "",
			// collage: "",
			level: "1",
			department: "",
			track: "",
			linkedin: "",
			github: "",
			behance: "",
			bio: "",
			...JSON.parse(localStorage.getItem("data") || ""),
		},
		mode: "onBlur",
	});

	const onSubmit = async (data: TSignUPData) => {
		console.log(data);
	};

	return (
		<>
			<section>
				<Link to={"/login"}>Log in</Link>
			</section>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{section == 1 && (
					<div>
						<label htmlFor='firstName'>First Name</label>
						<input id='firstName' type='text' {...register("firstName")} />
						<br />
						<label htmlFor='lastName'>Last Name</label>
						<input id='lastName' type='text' {...register("lastName")} />
						<br />
						<label htmlFor='username'>Username</label>
						<input id='username' type='username' {...register("username")} />
						<br />
						<label htmlFor='phone'>Phone</label>
						<input id='phone' type='phone' {...register("phone")} />
						<br />
						<label htmlFor='email'>Email</label>
						<input id='email' type='email' {...register("email")} />
						<br />
						<label htmlFor='password'>Password</label>
						<input id='password' type='password' {...register("password")} />
						<br />
						<button onClick={() => handleSection(2)}>Next Step</button>
					</div>
				)}
				{section == 2 && (
					<div>
						<label htmlFor='university'>University</label>
						<select id='university' {...register("university")}>
							{universities.map((university) => (
								<option key={university.id} value={university.id}>
									{university.name}
								</option>
							))}
						</select>
						<br />
						<label htmlFor='collage'>Collage</label>
						<select
							id='collage'
							{...register("collage", {
								disabled: true,
							})}
						>
							<option value='FCI'>FCI</option>
						</select>
						<br />
						<label htmlFor='level'>Level</label>
						<select
							defaultValue='1'
							id='level'
							{...register("level", {
								valueAsNumber: true,
							})}
						>
							<option value='1'>1</option>
							<option value='2'>2</option>
							<option value='3'>3</option>
							<option value='4'>4</option>
						</select>
						<br />
						<label htmlFor='department'>Department</label>
						<select id='department' {...register("department", {})}>
							<option value='General'>General</option>
							<option value='Bio'>Bio</option>
							<option value='soft'>soft</option>
							<option value='cs'>cs</option>
							<option value='is'>is</option>
						</select>
						<br />
						<label htmlFor='univesityEmail'>univesityEmail</label>
						<input type='text' {...register("univesityEmail", {})} />
						<br />
						<button onClick={() => handleSection(1)}>Prev Step</button>
						<button onClick={() => handleSection(3)}>Next Step</button>
					</div>
				)}
				{section == 3 && (
					<div>
						<label htmlFor='track'> Track </label>
						<select id='track' {...register("track", {})}>
							{tracks.map((track) => (
								<option key={track.id} value={track.id}>
									{track.name}
								</option>
							))}
						</select>
						<br />
						<label htmlFor='linkedin'>Linkedin</label>
						<input type='url' {...register("linkedin", {})} />
						<br />
						<label htmlFor='github'>github</label>
						<input id='github' type='url' {...register("github", {})} />
						<br />
						<label htmlFor='behance'>behance</label>
						<input id='behance' type='url' {...register("behance", {})} />
						<br />
						<label htmlFor='bio'>bio</label>
						<input id='bio' type='text' {...register("bio", {})} />
						<br />
						<button onClick={() => handleSection(2)}>Prev Step</button>
						<button type='submit'>Submit</button>
					</div>
				)}
			</Form>
		</>
	);
};

export default SignUp;
