import {Link} from "react-router-dom";

const Home = () => {
	return (
		<>
			<section>
				<h1>Create Your Graduation Team</h1>
				<p>choose your team members by their track</p>
				<Link to={"/createTeam"}>Create Team</Link>
				<Link to={"/FindTeam"}>Join Team</Link>
			</section>
		</>
	);
};

export default Home;
