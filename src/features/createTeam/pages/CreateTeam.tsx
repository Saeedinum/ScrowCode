import {useForm, SubmitHandler, useFieldArray} from "react-hook-form";

import {useCreateTeamMutation} from "../api/createTeamAPI";

import {TCreateTeamData} from "../../../types";
import {useAppSelector} from "../../../store/hooks";
import tracks from "../../../constants/tracks";

const CreateTeam = () => {
	const user = useAppSelector((state) => state.auth.user);

	const [createTeam] = useCreateTeamMutation();

	const {register, handleSubmit, control, watch} = useForm<TCreateTeamData>({
		shouldUnregister: true,
	});

	const {fields, append, remove} = useFieldArray({
		control,
		name: "userName",
	});

	const onSubmit: SubmitHandler<TCreateTeamData> = (data) => {
		if (user?.token) createTeam({...data, token: user?.token});
	};

	console.log(watch());

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type='number'
				max={8}
				min={1}
				defaultValue={1}
				{...register("members", {
					required: true,
				})}
			/>
			<div>
				<h2>Requirements</h2>
				<div>
					{tracks.map((track) => (
						<div key={track._id}>
							<input {...register("requirement")} type='checkbox' id={track.slug} value={track._id} />
							<label htmlFor={track.slug}> {track.name}</label>
						</div>
					))}
				</div>
			</div>
			<div>
				<h2>About </h2>
				<input type='text' {...register("teamName")} />
				<input type='text' {...register("projectIdea")} />
			</div>

			<div>
				<h2>Add members</h2>
				<div>
					<input type='text' value={`${user?.fullName}`} disabled />
					{fields.map((field, index) => (
						<div key={field.id}>
							<input type='text' {...register(`userName.${index}.name`)} />
							<button type='button' onClick={() => remove(index)}>
								Remove
							</button>
						</div>
					))}
				</div>
				<button type='button' onClick={() => append({name: ""})} disabled={fields.length >= watch("members")}>
					Add Member
				</button>
			</div>
			<button type='submit'>Create Team</button>
		</form>
	);
};

export default CreateTeam;
