import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useAppDispatch } from "@/store/hooks"
import { decrypt } from "@/utils/crypto"
import { login } from "@/features/auth/authSlice"

type User = {
  token: string
  username: string
  email: string
  fullName: string
}

const useRetrieveUser = (): User | void => {
  const dispatch = useAppDispatch()
  const [user, setUser] = useState<undefined | User>()

  useEffect(() => {
    try {
      const encryptedToken = localStorage.getItem("API_KEY")
      const encryptedUsername = localStorage.getItem("SECRET_KEY")
      const encryptedId = localStorage.getItem("DB_PASSWORD")
      const encryptedFullName = localStorage.getItem("AWS_ACCESS_KEY_ID")
      if (!encryptedToken || !encryptedUsername || !encryptedId || !encryptedFullName) {
        throw new Error("Missing encrypted user data")
      }
      const token = decrypt(encryptedToken)
      const username = decrypt(encryptedUsername)
      const email = decrypt(encryptedId)
      const fullName = decrypt(encryptedFullName)
      if (!token || !username || !email || !fullName) {
        throw new Error("Decryption failed or missing user data")
      }
      if (jwtDecode(token)) {
        dispatch(
          login({
            username: username,
            email: email,
            fullName: fullName,
            token: token
          })
        )
        setUser({
          token: token,
          username: username,
          email: email,
          fullName: fullName
        })
      }
    } catch (error) {
      localStorage.clear()
    }
  }, [dispatch])

  if (user) {
    return user
  }
}

export default useRetrieveUser
