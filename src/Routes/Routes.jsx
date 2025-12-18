import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Login from "../Pages/LogIn";
import SignUp from "../Pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashBoardLayout";
import Profile from "../Pages/DashBoard/Common/Profile";
import Statistics from "../Pages/DashBoard/Common/Statistics";
import AddMeal from "../Pages/DashBoard/Chef/AddMeal";
import MyInventory from "../Pages/DashBoard/Chef/MyInventory";
import ManageUsers from "../Pages/DashBoard/Admin/ManageUser";
import ManageOrders from "../Pages/DashBoard/Chef/ManageOrder";
import Meals from "../Pages/Meals";
import MealDetails from "../Pages/MealDetails";
import Order from "../Pages/Order";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentSuccessPage from "../Pages/DashBoard/Payment/PaymentSuccessPage";
import MyOrders from "../Pages/DashBoard/Customer/MyOrdersPage";
import MyMeals from "../Pages/DashBoard/Chef/MyMeals";
import UpdateMeal from "../Component/Form/UpdateMeal ";
import MyReviews from "../Pages/DashBoard/Customer/MyReviews";
import FavoriteMeals from "../Pages/DashBoard/Customer/MyFavoriteMeals";
import ManageRequests from "../Pages/DashBoard/Admin/ManageRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meals",
        element: <Meals />,
      },
      {
        path: "/meals/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccessPage />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-meal",
        element: (
          <PrivateRoute>
            <AddMeal />
          </PrivateRoute>
        ),
      },

      {
        path: "my-meals",
        element: (
          <PrivateRoute>
            <MyMeals />
          </PrivateRoute>
        ),
      },
      {
        path: "update-meal/:id",
        element: (
          <PrivateRoute>
            <UpdateMeal />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
         path: "my-favorite",
        element: (
          <PrivateRoute>
            <FavoriteMeals />
          </PrivateRoute>
        ),
      },

      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
      {
        path: "manage-requests",
        element: <ManageRequests/>,
      },
    ],
  },
]);
