import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "../providers/AuthProvider";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Feedback from "../pages/Feedback";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import GenerateQRCode from "../pages/GenerateQRCode";
import ClassPage from "../pages/ClassPage";
import Register from "../pages/Register";

const Routes = () => {
	const { token } = useAuth();

    const routesForPublic = [
        {
            path: "/feedback",
            element: <Feedback />
        },
		{
			path : "/register",
			element : <Register />
		},
		{
			path: "*",
			element: <NotFound />
		}
    ];

	const routesForAuth = [
		{
			path: "/",
			element: <ProtectedRoute />,
			children: [
				{
					path: "/dashboard",
					element: <Dashboard />
				},
				{
					path : "/profile",
					element : <Profile />
				},
				{
					path : "/generate-qr",
					element : <GenerateQRCode />
				},
				{
					path : "/class",
					element : <ClassPage />
				},
			]
		}
	];

	const routesForNonAuth = [
		{
			path: "/",
			element: <Login />
		},
		{
			path: "/login",
			element: <Login />
		},
	];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...routesForAuth,
		...(!token ? routesForNonAuth : []),
    ]);

	return <RouterProvider router={router} />;
}

export default Routes;