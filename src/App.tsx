import React from "react";
import "./App.css";
import Home from "@/page/Todos/Home";
import Login from "@/page/Auth/Login";
import SignUp from "@/page/Auth/SignUp";
import TodoDetail from "./page/Todos/TodoDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
      path: "/todos",
      children: [
        { path: "", element: <Home /> },
        { path: ":todoId", element: <TodoDetail /> },
      ],
    },
    { path: "/auth/signup", element: <SignUp /> },
  ]);

  return (
    <div className="App">
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </div>
  );
}

export default App;
