import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import App from "./App.jsx";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";

// Create a router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <error />,
    children: [
      {
        index: true,
        element: <SearchBooks />,
      },
      {
        path: "/saved",
        element: <SavedBooks />,
      },
    ],
  },
]);

// Render the application with the RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
