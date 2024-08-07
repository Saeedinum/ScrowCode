import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signupStudentSchema} from "./schema";

import tracks from "../../../../constants/tracks";
import universities from "../../../../constants/university";
import {TsignupStudent} from "../../../../types";
import {useAppSelector} from "../../../../store/hooks";
import {useSignupStudentMutation} from "../../api/authAPI";

const SignUpStudent = () => {
	const [section, setSection] = useState(2);
	const user = useAppSelector((state) => state.auth.user);

	const [signupStudent, {data, error, isLoading, isSuccess, isError}] = useSignupStudentMutation();

	const {
		register,
		handleSubmit,
		getValues,
		formState: {errors, isDirty, dirtyFields, isValid},
	} = useForm<TsignupStudent>({
		mode: "onBlur",
		resolver: zodResolver(signupStudentSchema),
	});

	const onSubmit = async (data: TsignupStudent) => {
		console.log(data);
		if (user) {
			signupStudent({
				token: user?.token,
				...data,
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
					<select id='collage' {...register("collage", {})}>
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
					<input type='text' {...register("universityEmail", {})} />

					<button
						onClick={() => {
							setSection(3);
						}}
					>
						Next Step
					</button>
				</div>
			)}
			{section == 3 && (
				<div>
					<label htmlFor='track'> Track </label>
					<div>
						{tracks.map((track) => (
							<div key={track._id}>
								<input {...register("track")} type='radio' id={track.slug} value={track.slug} />
								<label htmlFor={track.slug}> {track.name}</label>
							</div>
						))}
					</div>
					<br />
					<label htmlFor='linkedin'>Linkedin</label>
					<input type='url' {...register("linkedin")} />
					<br />
					<label htmlFor='github'>github</label>
					<input id='github' type='url' {...register("github")} />
					<br />
					<label htmlFor='behance'>behance</label>
					<input id='behance' type='url' {...register("behance")} />
					<br />
					<button onClick={() => setSection(2)}>Prev Step</button>
					<button type='submit'>Submit</button>
				</div>
			)}
		</form>
	);
};

export default SignUpStudent;
