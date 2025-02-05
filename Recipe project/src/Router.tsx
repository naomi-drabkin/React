import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/Router/Applayout";
import HomeRecipes from "./components/Recipes/HomeRecipes";
import ShowRecipe from "./components/Recipes/ShowRecipe";
import About from "./components/Router/About";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <>main error</>,
    children: [
      {
        path: "/allRecipes",
        element: <HomeRecipes />,
        children: [
          {
            path: "showRecipe/:id",
            element: <ShowRecipe />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
