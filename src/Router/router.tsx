import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Authentication from "../Pages/Auth";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Layout from "../Layout/Layout";
import Otp from "../Pages/Otp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up/otp",
    element: <Otp />,
  },
]);
const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
