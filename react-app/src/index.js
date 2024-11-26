import './index.css';

import * as React from "react";
import { createRoot } from "react-dom/client";
import Home from './components/Home'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import AddPost from './components/AddPost';
import CategoryPost from './components/CategoryPost';
import MyPosts from './components/MyPosts';
import LostHome from './components/LostHome';
import FoundHome from './components/FoundHome';
import CategoryLostPost from './components/CategoryLostPost';
import CategoryFoundPost from './components/CategoryFoundPost';
import Google_Login from './components/Google-Login'


const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <div>
    <Home/>
    </div>
    ),
  },
  {
    path: "/google-login",
    element: (
      <Google_Login/>
    ),
  },{
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/add-post",
    element: (
      <AddPost/>
    ),
  },
  {
    path: "/category/:CatId",
    element: (
      <CategoryPost/>
    ),
  },
  {
    path: "/lost/category/:CatId",
    element: (
      <CategoryLostPost/>
    ),
  },
  {
    path: "/found/category/:CatId",
    element: (
      <CategoryFoundPost/>
    ),
  },
  {
    path: "/my-posts",
    element: (
      <MyPosts/>
    ),
  },
  {
    path: "/lost",
    element: (
      <LostHome/>
    ),
  },
  {
    path: "/found",
    element: (
      <FoundHome/>
    ),
  },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
