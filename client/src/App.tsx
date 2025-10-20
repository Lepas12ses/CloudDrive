import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { lazy, Suspense } from "react";

import store from "./store";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import RootLayoutPage from "./pages/RootLayout";
import LoadingSpinner from "./components/LoadingSpinner";
// import HomeLayoutPage from "./pages/HomeLayout";
// import ProtectedRoute from "./components/ProtectedRoute";
// import ProfilePage from "./pages/Profile";
// import HomePage from "./pages/Home";

import "./styles/index.css";

const HomeLayoutPage = lazy(() => import("./pages/HomeLayout"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const HomePage = lazy(() => import("./pages/Home"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayoutPage />,
		children: [
			{
				path: "/",
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<ProtectedRoute>
							<HomeLayoutPage />
						</ProtectedRoute>
					</Suspense>
				),
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={<LoadingSpinner />}>
								<HomePage />
							</Suspense>
						),
					},
					{
						path: "profile/",
						element: (
							<Suspense fallback={<LoadingSpinner />}>
								<ProfilePage />
							</Suspense>
						),
					},
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
