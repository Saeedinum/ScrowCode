import {createBrowserRouter, RouterProvider} from "react-router-dom";

import NotFound from "../pages/NotFound/NotFound";

const Router = () => {
	return (
		<RouterProvider
			router={createBrowserRouter([
				{path: "", element: <h1>Scrow Code</h1>},
				{path: "*", element: <NotFound />},
			])}
		/>
	);
};

export default Router;
