import { createBrowserRouter, Navigate } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminProducts } from "./pages/admin/AdminProducts";
import { AdminProductForm } from "./pages/admin/AdminProductForm";
import { AdminSettings } from "./pages/admin/AdminSettings";
import { AdminOrders } from "./pages/admin/AdminOrders";
import { AdminBlog } from "./pages/admin/AdminBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/shop",
    Component: HomePage,
  },
  {
    path: "/over-ons",
    Component: HomePage,
  },
  {
    path: "/contact",
    Component: HomePage,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", Component: AdminDashboard },
      { path: "products", Component: AdminProducts },
      { path: "products/new", Component: AdminProductForm },
      { path: "products/:id", Component: AdminProductForm },
      { path: "orders", Component: AdminOrders },
      { path: "blog", Component: AdminBlog },
      { path: "settings", Component: AdminSettings },
    ],
  },
]);
