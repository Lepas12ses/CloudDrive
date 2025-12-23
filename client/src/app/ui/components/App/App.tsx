import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "@/shared/lib/store";
import routes from "@/app/lib/routes";
import "./styles/index.scss";
import ToastProvider from "@/shared/ui/components/Toast/ToastProvider";

const router = createBrowserRouter(routes);

function App() {
	return (
		<Provider store={store}>
			<ToastProvider>
				<RouterProvider router={router} />
			</ToastProvider>
		</Provider>
	);
}

export default App;
