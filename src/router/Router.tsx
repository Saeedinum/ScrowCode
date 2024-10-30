import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom"
import { User } from "@/types/auth"
import { useAppSelector } from "../store/hooks"

import useRetrieveUser from "@/hooks/useRetrieveUser"

import Header from "../components/header/Header"
import Home from "../pages/home/Home"

const UniversityInformation = lazy(() => import("../features/auth/pages/signup/components/UniversityInformation"))
const PersonalInformation = lazy(() => import("../features/auth/pages/signup/components/PersonalInformation"))
const TrackInformation = lazy(() => import("../features/auth/pages/signup/components/TrackInformation"))
const ForgetPassword = lazy(() => import("../features/auth/pages/forget/ForgetPassword"))
const FindPartner = lazy(() => import("../features/findPartner/pages/FindPartner"))
const CreateTeam = lazy(() => import("../features/createTeam/pages/CreateTeam"))
const FindTeam = lazy(() => import("../features/findTeam/pages/FindTeam"))
const SignUp = lazy(() => import("../features/auth/pages/signup/SignUp"))
const Profile = lazy(() => import("../features/profile/pages/Profile"))
const Login = lazy(() => import("@/features/auth/pages/login/Login"))
const Team = lazy(() => import("../features/profile/pages/Team"))
const Error = lazy(() => import("../pages/error/Error"))

import { Toaster } from "@/components/ui/toaster"

const Router = () => {
  const auth: User = useAppSelector(state => state.auth.user)
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
          errorElement: <Error type="error" />,
          children: [
            { index: true, element: <Home /> },
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
              element: <PersonalInformation />
            },
            {
              path: "/signup/university",
              element: <UniversityInformation />
            },
            {
              path: "/signup/track",
              element: <TrackInformation />
            }
          ]
        },
        {
          path: "forgetPassword",
          element: (
            <Suspense>
              <ForgetPassword />
            </Suspense>
          )
        },
        { path: "*", element: <Error type="notFound" /> }
      ])}
    />
  )
}

export default Router
