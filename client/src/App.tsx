import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayoutPage from "./pages/HomeLayout";
import AuthLayoutPage from "./pages/AuthLayout";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import { Provider } from "react-redux";
import store from "./store";
import RootLayoutPage from "./pages/RootLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayoutPage />,
		children: [
			{ index: true, element: <HomeLayoutPage /> },
			{
				path: "/auth",
				element: <AuthLayoutPage />,
				children: [
					{ path: "sign-in/", element: <SignInPage /> },
					{ path: "sign-up/", element: <SignUpPage /> },
				],
			},
		],
	},
]);

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
