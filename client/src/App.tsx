import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import HomeLayoutPage from "./pages/HomeLayout";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import RootLayoutPage from "./pages/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/Profile";
import HomePage from "./pages/Home";

import "./styles/index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayoutPage />,
		children: [
			{
				path: "/",
				element: (
					<ProtectedRoute>
						<HomeLayoutPage />
					</ProtectedRoute>
				),
				children: [
					{ index: true, element: <HomePage /> },
					{ path: "profile/", element: <ProfilePage /> },
				],
			},
			{ path: "sign-in/", element: <SignInPage /> },
			{ path: "sign-up/", element: <SignUpPage /> },
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
