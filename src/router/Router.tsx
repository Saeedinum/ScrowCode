import {createBrowserRouter, Outlet, redirect, RouterProvider} from "react-router-dom";

import NotFound from "../pages/NotFound/NotFound";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Home from "../features/auth/pages/home/Home";
import Login from "../features/auth/pages/login/Login";
import SignUp from "../features/auth/pages/signup/SignUp";
import CreateTeam from "../features/createTeam/pages/CreateTeam";
import FindTeam from "../features/findTeam/pages/FindTeam";
import FindPartner from "../features/findPartner/pages/FindPartner";

const auth = true; // come from authslice

const Router = () => {
	return (
		<RouterProvider
			router={createBrowserRouter([
				{
					path: "",
					element: (
						<>
							<Header />
							<main>
								<Outlet />
							</main>
							<Footer />
						</>
					),
					children: [
						{index: true, element: <Home />},
						{
							path: "CreateTeam",
							element: <CreateTeam />,
							loader: async () => (auth ? <CreateTeam /> : redirect("/login")),
						},
						{
							path: "FindTeam",
							element: <FindTeam />,
							loader: async () => (auth ? <FindTeam /> : redirect("/login")),
							// will have a children array
						},
						{
							path: "FindPartner",
							element: <FindPartner />,
							loader: async () => (auth ? <FindPartner /> : redirect("/login")),
							// will have a children array
						},
					],
				},
				{path: "login", element: <Login />},
				{path: "signup", element: <SignUp />},
				{path: "*", element: <NotFound />},
			])}
		/>
	);
};

export default Router;
