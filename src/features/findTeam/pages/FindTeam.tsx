import { useAppSelector } from "../../../store/hooks"
import { useFetchTeamsQuery } from "../api/findTeamAPI";

const FindTeam = () => {
	const token = useAppSelector((state) => state.auth.user?.token);

	const { data, error, isLoading } = useFetchTeamsQuery(token);
	console.log(data)

	return <div>findTeam</div>;
};

export default FindTeam;
