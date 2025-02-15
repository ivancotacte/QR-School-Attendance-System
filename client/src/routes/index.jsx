import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Feedback from "../pages/Feedback";
import Profile from "../pages/Profile";
import GenerateQRCode from "../pages/GenerateQRCode";
import ClassPage from "../pages/ClassPage";
import Register from "../pages/Register";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "login", element: <Login /> },
			{ path: "dashboard", element: <Dashboard /> },
			{ path: "feedback", element: <Feedback /> },
			{ path: "profile", element: <Profile /> },
			{ path: "generate-qr", element: <GenerateQRCode /> },
			{ path: "class", element: <ClassPage /> },
			{ path: "register", element: <Register /> }
		]
	}
]);

export default router;