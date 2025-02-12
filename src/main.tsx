import ReactDOM from "react-dom/client"

import Router from "./router/Router"

import { store } from "./store/store"
import { Provider } from "react-redux"

import { ThemeProvider } from "@/components/theme-provider"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { Oauth } from "./config/Oauth"

import "../src/styles/index.css"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

if (process.env.NODE_ENV === "production") {
  console.log = function () {}
  console.warn = function () {}
  console.error = function () {}
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Analytics />
    <SpeedInsights />
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <GoogleOAuthProvider clientId={Oauth.client_id}>
          <Router />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  </>
)
