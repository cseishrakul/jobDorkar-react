import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import ActivateAccount from "../components/active-account/ActivateAccount";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Jobs from "../pages/dashboard/Jobs/Jobs";
import Applications from "../pages/dashboard/Applications";
import Category from "../pages/dashboard/Jobs/Category";
import Profile from "../pages/dashboard/profile/Profile";
import Payment from "../pages/dashboard/Payment";
import JobPage from "../pages/JobPage";
import JobDetails from "../pages/JobDetails";
import About from "../pages/About";
import Blog from "../pages/BlogPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/job-apply",
        element: <JobPage />,
      },
      
      {
        path: "/jobs/:id",
        element: <JobDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/jobs/:id",
        element: <JobDetails />,
      },
      
      {
        path: "/activate/:uid/:token",
        element: <ActivateAccount />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "payment/success",
        element: <Payment />,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
