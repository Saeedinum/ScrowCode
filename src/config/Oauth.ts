export const Oauth = {
  client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
  project_id: import.meta.env.VITE_OAUTH_REDIRECT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: import.meta.env.VITE_OAUTH_CLIENT_SECRET,
  redirect_uris: ["http://localhost:5173/"],
  javascript_origins: ["http://localhost:3000", "http://localhost:5173", "http://localhost"]
}
