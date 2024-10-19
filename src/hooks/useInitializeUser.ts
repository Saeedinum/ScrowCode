import { encrypt } from "@/utils/crypto"

const initializeUser = (token: string, fullName: string, email: string, username: string, hasTeam: boolean): void => {
  localStorage.setItem("SECRET_KEY", encrypt(username))
  localStorage.setItem("DB_PASSWORD", encrypt(email))
  localStorage.setItem("AWS_ACCESS_KEY_ID", encrypt(fullName))
  localStorage.setItem("API_KEY", encrypt(token))
  localStorage.setItem("hasTeam", hasTeam.toString())
}

export default initializeUser
