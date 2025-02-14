import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Feedback from "../pages/Feedback";
import Profile from "../pages/Profile";

const Routes = () => {
    const routesForPublic = [
        {
            path: "/feedback",
            element: <Feedback />
        }
    ];

    const routesForAuth = [
        {
            path: "/",
            children: [
                {
                    path: "/profile",
                    element: <Profile />
                }
            ]
        }
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...routesForAuth
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;