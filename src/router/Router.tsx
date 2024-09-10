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

const Router = () => {
  const auth: User = useAppSelector((state) => state.auth.user);

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "",
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
              element: <CreateTeam />,
              // element: auth?.token != undefined ? <CreateTeam /> : <Navigate to='/login' />,
            },
            {
              path: "FindTeam",
              element: <FindTeam />,
              // element: auth?.token != undefined ? <FindTeam /> : <Navigate to='/login' />,
            },
            {
              path: "FindPartner",
              element: <FindPartner />,
              // element: auth?.token != undefined ? <FindPartner /> : <Navigate to='/login' />,
            },
          ],
        },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "*", element: <NotFound /> },
      ])}
    />
  );
};

export default Router;
