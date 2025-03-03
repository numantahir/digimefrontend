import Login from "../../views/auth/login";
import ResetPassword from "../../views/auth/resetEmail";
import SignUp from "../../views/auth/signup";
import EditProfile from "../../views/edit";
import Home from "../../views/home/home";
import Profile from "../../views/profile";
import SaveProfile from "../../views/saveprofile";
import Setting from "../../views/setting";
import SharedProfile from "../../views/sharedprofile";
import { editprofile, home, login, profileview, resetpassword, saveprofile, settings, signup } from "../pathName";

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
  {
    title: "Edit Profile",
    component: EditProfile,
    path: editprofile,
  },
  {
    title: "Profile View",
    component: Profile,
    path: profileview,
  },
  {
    title: "Profile",
    component: SharedProfile,
    path: "/profile/:username",
  },
  {
    title: "Reset Password",
    component: ResetPassword,
    path: resetpassword,
  },
  {
    title: "Save Profile",
    component: SaveProfile,
    path: saveprofile,
  },
  {
    title: "Settings",
    component: Setting,
    path: settings,
  },
];
