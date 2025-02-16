import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Feedback from "../pages/Feedback";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import GenerateQRCode from "../pages/GenerateQRCode";
import ClassPage from "../pages/ClassPage";
import Register from "../pages/Register";
import RedirectAuth from "./RedirectAuth";

const Routes = () => {
	// Removed local token destructuring since RedirectAuth handles it internally

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
			element: <RedirectAuth><Login /></RedirectAuth>
		},
		{
			path: "/login",
			element: <RedirectAuth><Login /></RedirectAuth>
		},
	];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...routesForAuth,
		...routesForNonAuth,
    ]);

	return <RouterProvider router={router} />;
}

export default Routes;