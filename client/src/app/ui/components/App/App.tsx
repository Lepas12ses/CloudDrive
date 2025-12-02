import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "@/shared/lib/store";
import routes from "@/app/lib/routes";
import "./styles/index.scss";

const router = createBrowserRouter(routes);

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
