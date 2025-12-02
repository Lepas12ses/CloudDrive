import type { RouteObject } from "react-router-dom";
import { Suspense } from "react";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { RootLayout } from "@/page/RootLayout";
import { SignIn } from "@/page/SignIn";
import { SignUp } from "@/page/SignUp";
import { Profile } from "@/page/Profile";
import { Home } from "@/page/Home";
import { HomeLayout } from "@/page/HomeLayout/index";
import ProtectedRoute from "@/components/ProtectedRoute";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "/",
				element: (
					<ProtectedRoute>
						<Suspense fallback={<LoadingSpinner />}>
							<HomeLayout />
						</Suspense>
					</ProtectedRoute>
				),
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={<LoadingSpinner />}>
								<Home />
							</Suspense>
						),
					},
					{
						path: "profile/",
						element: (
							<Suspense fallback={<LoadingSpinner />}>
								<Profile />
							</Suspense>
						),
					},
				],
			},
			{ path: "sign-in/", element: <SignIn /> },
			{ path: "sign-up/", element: <SignUp /> },
		],
	},
];

export default routes;
