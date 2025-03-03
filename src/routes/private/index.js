import Login from "../../views/auth/login";
import SignUp from "../../views/auth/signup";
import Home from "../../views/home/home";
import { home, login, signup } from "../pathName";

export const PublicRoutes = [
  {
    title: "Signup",
    component: SignUp,
    path: signup,
  },
  {
    title: "Login",
    component: Login,
    path: login,
  },
  {
    title: "Home",
    component: Home,
    path: home,
  },
];
