import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/views/Layout";
import Images from "@/views/Images";
import Weibos from "@/views/Weibos";
import PaperList from "../views/PaperList";
import QuestionList from "../views/QuestionList";
import Users from "../views/Users";
import Dashboard from "@/views/Dashboard";
import Exam from "@/views/Exam/Exam";

export const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "question",
        element: <QuestionList />,
      },
      {
        path: "paper",
        element: <PaperList />,
      },
      {
        path: "images",
        element: <Images />,
      },
      {
        path: "weibos",
        element: <Weibos />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "exam/answer/:id",
        element: <Exam />,
      },
    ],
  },
  {
    path: "/test",
    element: <div>Hello world!</div>,
  },
]);



