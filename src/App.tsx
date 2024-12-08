import React from "react";
import "./App.css";
import Home from "@/page/Home/Home";
import Login from "@/page/Auth/Login";
import SignUp from "@/page/Auth/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoDetail from "./page/Todo/TodoDetail";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
      path: "/todos",
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "asdf/:todoId",
          element: <TodoDetail />,
        },
      ],
    },
    {
      path: "/auth/signup",
      element: <SignUp />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
