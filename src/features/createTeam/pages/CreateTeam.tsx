import {useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import {TCreateTeamData} from "../../../types";
import {useAppSelector} from "../../../store/hooks";
import tracks from "../../../constants/tracks";

const CreateTeam = () => {
	const user = useAppSelector((state) => state.auth.user);
	const [teamMembers, setTeamMembers] = useState<string[]>([]);

	const {register, handleSubmit, getValues, watch} = useForm<TCreateTeamData>();

	const onSubmit: SubmitHandler<TCreateTeamData> = (data) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type='number'
				max={8}
				min={1}
				{...register("members", {
					required: true,
				})}
			/>
			<div>
				<h2>Requirements</h2>
				<div>
					{tracks.map((track) => (
						<div key={track._id}>
							<input {...register("requirement")} type='checkbox' id={track.slug} value={track.slug} />
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
				<h2>Add memebers</h2>
				{/* add user as default team leader */}
				{/* button to add  */}
				<div>
					<input type='text' value={`${user?.fullName}`} disabled />
					{teamMembers.map((member, index) => (
						<input key={index} type='text' {...register(`userName.${index}`)} />
					))}
				</div>
				<button onClick={() => setTeamMembers([...teamMembers, ""])} disabled={teamMembers.length >= watch("members")}>
					Add Member
				</button>
			</div>
			<button type='submit'>Create Team</button>
		</form>
	);
};

export default CreateTeam;
