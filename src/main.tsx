import ReactDOM from "react-dom/client";

import Router from "./router/Router";

import {store} from "./store/store";
import {Provider} from "react-redux";

import {ThemeProvider} from "@/components/theme-provider";

// import "../src/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
			<Router />
		</ThemeProvider>
	</Provider>,
);
