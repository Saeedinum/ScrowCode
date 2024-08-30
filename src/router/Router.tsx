import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";

import NotFound from "../pages/NotFound/NotFound";

import Header from "../components/Header";
// import Footer from "../components/Footer";

import Home from "../pages/home/Home";
import Login from "../features/auth/pages/login/Login";
import SignUp from "../features/auth/pages/signup/SignUp";
import CreateTeam from "../features/createTeam/pages/CreateTeam";
import FindTeam from "../features/findTeam/pages/FindTeam";
import FindPartner from "../features/findPartner/pages/FindPartner";
import {useAppSelector} from "../store/hooks";
import ForgetPassword from "../features/auth/pages/forget/ForgetPassword";

const Router = () => {
	const auth = useAppSelector((state) => state.auth.user);

	return (
		<RouterProvider
			router={createBrowserRouter([
				{
					path: "",
					element: (
						<>
							<Header />
							<Outlet />
							{/* <Footer /> */}
						</>
					),
					children: [
						{index: true, element: <Home />},
						{
							path: "CreateTeam",
							element:  <CreateTeam /> 
							// element: auth?.token != undefined ? <CreateTeam /> : <Navigate to='/login' />,
						},
						{
							path: "FindTeam",
							element: auth?.token != undefined ? <FindTeam /> : <Navigate to='/login' />,
						},
						{
							path: "FindPartner",
							element: auth?.token != undefined ? <FindPartner /> : <Navigate to='/login' />,
						},
					],
				},
				{path: "login", element: <Login />},
				{path: "signup", element: <SignUp />},
				{path: "forgetPassword", element: <ForgetPassword />},
				{path: "*", element: <NotFound />},
			])}
		/>
	);
};

export default Router;
