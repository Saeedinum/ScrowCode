import {useForm, SubmitHandler} from "react-hook-form";
import {TCreateTeamData} from "../../../types";
import { useState } from "react"

const CreateTeam = () => {
	console.log(" - - Render - - ");
	const user = "moahemd" // get from authslice
	const [teamMembers , setTeamMembers] = useState<string[]>([]);

	const {register, handleSubmit} = useForm<TCreateTeamData>();

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
					<input type='checkbox' id='check1' value='Backend' {...register("requirement")} />
					<label htmlFor='check1'>Backend</label>
				</div>
				<div>
					<input type='checkbox' id='check2' value='Frontend' {...register("requirement")} />
					<label htmlFor='check2'>Frontend</label>
				</div>
				<div>
					<input type='checkbox' id='check3' value='Mobile' {...register("requirement")} />
					<label htmlFor='check3'>Mobile</label>
				</div>
				<div>
					<input type='checkbox' id='check4' value='UI/UX' {...register("requirement")} />
					<label htmlFor='check4'>UI/UX</label>
				</div>
				<div>
					<input type='checkbox' id='check5' value='AI' {...register("requirement")} />
					<label htmlFor='check5'>AI</label>
				</div>
				<div>
					<input type='checkbox' id='check6' value='Other' {...register("requirement")} />
					<label htmlFor='check6'>Other</label>
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
					<div >
						<input type='text' {...register("userName")} value={`${user}`} />
				{teamMembers.map((member, index) => (
						<input key={index} type='text' {...register("userName")} value={`${member ?? ""}`} />
				))}
					</div>
				<button onClick={() => (
					
					setTeamMembers([...teamMembers, ""])
				)}>Add Member</button>
			</div>
			<button type='submit'>Create Team</button>
		</form>
	);
};

export default CreateTeam;
