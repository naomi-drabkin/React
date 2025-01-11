import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import AppLayout from "./components/Applayout";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <>main error</>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/About",
        element: <About />,
      },
    ],
  },
]);
