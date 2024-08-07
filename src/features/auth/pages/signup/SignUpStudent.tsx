import tracks from "../../../../constants/tracks";
import universities from "../../../../constants/university";
import {useForm} from "react-hook-form";
import {TsignupStudent} from "../../../../types";
import {zodResolver} from "@hookform/resolvers/zod";

import {signupStudentSchema} from "./schema";
import { useAppSelector } from "../../../../store/hooks";
import { useSignupStudentMutation } from "../../api/authAPI";

const SignUpStudent = ({section, handleSection}) => {
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
    if (user) {
       signupStudent({
        token: user?.token,
        university: data.university,
        collage: data.collage,
        level: data.level,
        department: data.department,
        universityEmail: data.universityEmail,
        track: data.track,
        linkedin: data.linkedin,
        github: data.github,
        behance: data.behance,
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
					<input type='text' {...register("universityEmail", {})} />
					<br />
					<button onClick={() => handleSection(1)}>Prev Step</button>
					<button
						onClick={() => {
							handleSection(3);
						}}
					>
						Next Step
					</button>
				</div>
			)}
			{section == 3 && (
				<div>
					<label htmlFor='track'> Track </label>
					<select id='track' {...register("track", {})}>
						{tracks.map((track) => (
							<option key={track._id} value={track._id}>
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
					<button onClick={() => handleSection(2)}>Prev Step</button>
					<button type='submit'>Submit</button>
				</div>
			)}
		</form>
	);
};

export default SignUpStudent;
