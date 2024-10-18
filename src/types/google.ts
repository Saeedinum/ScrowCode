export type Tprofile = {
  email: string
  family_name: string
  given_name: string
  id: string
  name: string
  picture: string
  verified_email: boolean
}

export type Tuser = {
  access_token: string
  authuser: string
  expires_in: number
  prompt: string
  scope: string
  token_type: "Bearer"
}
