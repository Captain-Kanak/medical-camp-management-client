import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Authentication/Register";
import SignIn from "../pages/Authentication/SignIn";
import AvailableCamp from "../pages/AvailableCamp/AvailableCamp";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "available-camp",
        Component: AvailableCamp,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "signin",
        Component: SignIn,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
]);
