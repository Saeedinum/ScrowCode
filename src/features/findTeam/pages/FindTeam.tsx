import {useAppSelector} from "../../../store/hooks";
import {useFetchTeamsQuery} from "../api/findTeamAPI";

const FindTeam = () => {
	const token = useAppSelector((state) => state.auth.user?.token);
	// console.log(token)

	const {data, error, isLoading} = useFetchTeamsQuery({token});
	const teams = data?.data;
	console.log(teams);

	return (
		<>
			<main>
				<h1>Find team</h1>
				<div>dearch bar</div>
				<p>find you Suitable team or search your friend team !</p>
				<div className='flex'>
					{teams?.map((team) => {
						return (
							<div
								key={team._id}
								className='flex flex-col justify-evenly items-center border-2 border-solid border-red-500 rounded-[12px] p-5 '
							></div>
						);
					})}{" "}
				</div>
			</main>
		</>
	);
};

export default FindTeam;
