import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { User } from "@/types/auth";
import { useAppSelector } from "../store/hooks";

import NotFound from "../pages/NotFound/NotFound";

import Header from "../components/Header";

import Home from "../pages/home/Home";
import Login from "../features/auth/pages/login/Login";
import SignUp from "../features/auth/pages/signup/SignUp";
import CreateTeam from "../features/createTeam/pages/CreateTeam";
import FindTeam from "../features/findTeam/pages/FindTeam";
import FindPartner from "../features/findPartner/pages/FindPartner";
import ForgetPassword from "../features/auth/pages/forget/ForgetPassword";
import About from "@/pages/about/About";
import useRetrieveUser from "@/hooks/useRetrieveUser";
import Team from "@/features/profile/pages/Team";
import Profile from "@/features/profile/pages/Profile";
import PersonalInformation from "@/features/auth/pages/signup/components/PersonalInformation";
import UniversityInformation from "@/features/auth/pages/signup/components/UniversityInformation";
import TrackInformation from "@/features/auth/pages/signup/components/TrackInformation";

const Router = () => {
  const auth: User = useAppSelector((state) => state.auth.user);
  const signup = useAppSelector((state) => state.auth.signup);
  useRetrieveUser();

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: (
            <>
              <Header />
              <Outlet />
            </>
          ),
          children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            {
              path: "CreateTeam",
              element:
                auth?.token != undefined ? (
                  <CreateTeam />
                ) : (
                  <Navigate to="/login" />
                ),
            },
            {
              path: "FindTeam",
              element:
                auth?.token != undefined ? (
                  <FindTeam />
                ) : (
                  <Navigate to="/login" />
                ),
            },
            {
              path: "FindPartner",
              element:
                auth?.token != undefined ? (
                  <FindPartner />
                ) : (
                  <Navigate to="/login" />
                ),
            },
            {
              path: "myTeam",
              element:
                auth?.token != undefined ? <Team /> : <Navigate to="/login" />,
            },
            {
              path: "myprofile",
              element:
                auth?.token != undefined ? (
                  <Profile />
                ) : (
                  <Navigate to="/login" />
                ),
            },
            {
              path: "profile/:id",
              element: <Profile />,
            },
          ],
        },
        {
          path: "/login",
          element: auth?.token == undefined ? <Login /> : <Navigate to="/" />,
        },
        {
          path: "/signup",
          element: <SignUp />,
          children: [
            { index: true, element: <PersonalInformation /> },
            {
              path: "/signup/university",
              element:
                signup?.PersonalInformation.arabicName === "" ? (
                  <Navigate to={"/signup"} />
                ) : (
                  <UniversityInformation />
                ),
            },
            {
              path: "/signup/track",
              element:
                signup.UniversityInformation.universityEmail === "" ? (
                  <Navigate to={"/signup"} />
                ) : (
                  <TrackInformation />
                ),
            },
          ],
        },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "*", element: <NotFound /> },
      ])}
    />
  );
};

export default Router;
