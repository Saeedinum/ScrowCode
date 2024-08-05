import ReactDOM from "react-dom/client";

import Router from "./router/Router";

import {store} from "./store/store";
import {Provider} from "react-redux";

// import "../src/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<Router />
	</Provider>,
);
