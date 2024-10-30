import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useAppDispatch } from "@/store/hooks"
import { login } from "@/features/auth/authSlice"
import { useGetMyProfileQuery } from "@/features/profile/api/profileAPI"

export type User = {
  token: string
  username: string
  email: string
  fullName: string
  hasTeam: boolean
}

const useRetrieveUser = (): User | void => {
  const dispatch = useAppDispatch()
  const [user, setUser] = useState<User | undefined>()

  const token = localStorage.getItem("token")

  let isValidToken = false
  if (token) {
    try {
      const decodedToken = jwtDecode<{ exp: number }>(token)
      isValidToken = decodedToken && decodedToken.exp * 1000 > Date.now()
    } catch (error) {
      localStorage.clear()
    }
  }

  const { data, isLoading, error } = useGetMyProfileQuery({ token: token! }, { skip: !isValidToken })

  useEffect(() => {
    if (data && !isLoading && !error) {
      const { user: profileUser, team } = data
      dispatch(
        login({
          token,
          username: profileUser.Username,
          email: profileUser.Email,
          fullName: profileUser.fullName,
          hasTeam: !!team
        })
      )

      setUser({
        token: token!,
        username: profileUser.Username,
        email: profileUser.Email,
        fullName: profileUser.fullName,
        hasTeam: !!team
      })
    }
  }, [data, isLoading, error, dispatch, token])

  return user
}

export default useRetrieveUser
