import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom"
import { User } from "@/types/auth"
import { useAppSelector } from "../store/hooks"

import useRetrieveUser from "@/hooks/useRetrieveUser"

import Home from "../pages/home/Home"
import Header from "../components/header/Header"

const NotFound = lazy(() => import("../pages/NotFound/NotFound"))
const Login = lazy(() => import("@/features/auth/pages/login/Login"))
const SignUp = lazy(() => import("../features/auth/pages/signup/SignUp"))
const CreateTeam = lazy(() => import("../features/createTeam/pages/CreateTeam"))
const FindTeam = lazy(() => import("../features/findTeam/pages/FindTeam"))
const FindPartner = lazy(() => import("../features/findPartner/pages/FindPartner"))
const ForgetPassword = lazy(() => import("../features/auth/pages/forget/ForgetPassword"))
const About = lazy(() => import("@/pages/about/About"))
const Team = lazy(() => import("../features/profile/pages/Team"))
const Profile = lazy(() => import("../features/profile/pages/Profile"))
const PersonalInformation = lazy(() => import("../features/auth/pages/signup/components/PersonalInformation"))
const UniversityInformation = lazy(() => import("../features/auth/pages/signup/components/UniversityInformation"))
const TrackInformation = lazy(() => import("../features/auth/pages/signup/components/TrackInformation"))

import { Toaster } from "@/components/ui/toaster"

const Router = () => {
  const auth: User = useAppSelector(state => state.auth.user)
  const signup = useAppSelector(state => state.auth.signup)
  useRetrieveUser()

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: (
            <>
              <Header />
              <Suspense>
                <Outlet />
              </Suspense>
              <Toaster />
            </>
          ),
          children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            {
              path: "CreateTeam",
              element: auth?.token != undefined ? auth.hasTeam ? <Navigate to="/" /> : <CreateTeam /> : <Navigate to="/login" />
            },
            {
              path: "FindTeam",
              element: auth?.token != undefined ? <FindTeam /> : <Navigate to="/login" />
            },
            {
              path: "FindPartner",
              element: auth?.token != undefined ? <FindPartner /> : <Navigate to="/login" />
            },
            {
              path: "myTeam",
              element: auth?.token != undefined ? auth.hasTeam ? <Team /> : <Navigate to="/" /> : <Navigate to="/login" />
            },
            {
              path: "myprofile",
              element: auth?.token != undefined ? <Profile /> : <Navigate to="/login" />
            },
            {
              path: "profile/:id",
              element: <Profile />
            }
          ]
        },
        {
          path: "/login",
          element:
            auth?.token == undefined ? (
              <Suspense>
                <Login />
              </Suspense>
            ) : (
              <Navigate to="/" />
            )
        },
        {
          path: "/signup",
          element: (
            <Suspense>
              <SignUp />
            </Suspense>
          ),
          children: [
            {
              index: true,
              element: signup.PersonalInformation.email !== "" ? <Navigate to={"/signup/university"} /> : <PersonalInformation />
            },
            {
              path: "/signup/university",
              element: signup.PersonalInformation.email === "" ? <Navigate to={"/signup"} /> : <UniversityInformation />
            },
            {
              path: "/signup/track",
              element: signup.UniversityInformation.universityEmail === "" ? <Navigate to={"/signup"} /> : <TrackInformation />
            }
          ]
        },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "*", element: <NotFound /> }
      ])}
    />
  )
}

export default Router
