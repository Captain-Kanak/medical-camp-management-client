import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Authentication/Register";
import SignIn from "../pages/Authentication/SignIn";
import AvailableCamp from "../pages/AvailableCamp/AvailableCamp";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRouter from "./PrivateRouter";
import Profile from "../pages/Dashboard/Profile";
import AddCamp from "../pages/Dashboard/Organizer/AddCamp";
import ManageCamp from "../pages/Dashboard/Organizer/ManageCamp";
import CampDetails from "../pages/Home/CampDetails";
import ManageRegisteredCamps from "../pages/Dashboard/Organizer/ManageRegisteredCamps";

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
      {
        path: "/camp-details/:campId",
        Component: CampDetails,
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
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "profile",
        Component: Profile,
      },
      // organizer route
      {
        path: "add-camp",
        element: <AddCamp />,
      },
      {
        path: "manage-camp",
        element: <ManageCamp />,
      },
      {
        path: "manage-registered-camps",
        element: <ManageRegisteredCamps />,
      },
    ],
  },
]);
