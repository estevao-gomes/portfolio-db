import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ErrorPage,
  BalancoMCP,
  BalancoLastro,
  Usinas,
  Contratos,
  EditUsina,
} from "./routes";
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import "@tremor/react/dist/esm/tremor.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "balancoMCP",
        element: <BalancoMCP />,
      },
      {
        path: "balancoLastro",
        element: <BalancoLastro />,
      },
      {
        path: "usinas",
        element: <Usinas />,
      },
      {
        path: "editUsina/:id",
        element: <EditUsina />,
      },
      {
        path: "contratos",
        element: <Contratos />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
