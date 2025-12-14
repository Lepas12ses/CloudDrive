import type { RouteObject } from "react-router-dom";

import { RootLayout } from "@/page/RootLayout";
import { SignIn } from "@/page/SignIn";
import { SignUp } from "@/page/SignUp";
import { Profile } from "@/page/Profile";
import { Home } from "@/page/Home";
import { HomeLayout } from "@/page/HomeLayout/index";
import ProtectedRoute from "@/widget/ProtectedRoute/ui/components/ProtectedRoute";
import { ProfileLayout } from "@/page/ProfileLayout";
import { Sessions } from "@/page/Sessions";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "/",
				element: (
					<ProtectedRoute>
						<HomeLayout />
					</ProtectedRoute>
				),
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: "profile/",

						element: <ProfileLayout />,
						children: [
							{
								index: true,
								element: <Profile />,
							},
							{
								path: "sessions/",
								element: <Sessions />,
							},
						],
					},
				],
			},
			{ path: "sign-in/", element: <SignIn /> },
			{ path: "sign-up/", element: <SignUp /> },
		],
	},
];

export default routes;
