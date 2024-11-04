import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Landing from "./pages/Landing.jsx";
import ContactUs from "./components/landing-page-components/ContactUs.jsx";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing/>,
    },
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "/contacts",
      element: <ContactUs />,
    }
  ]);