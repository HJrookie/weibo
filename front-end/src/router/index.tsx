import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/views/Layout";
import Videos from "@/views/Videos";
import PaperList from "../views/PaperList";
import QuestionList from "../views/QuestionList";
import Actors from "../views/Actors";
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
        path: "videos",
        element: <Videos />,
      },
      {
        path: "actors",
        element: <Actors />,
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



