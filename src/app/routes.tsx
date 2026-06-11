import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { SignupPage } from "./pages/SignupPage";
import { AppHome } from "./pages/AppHome";
import { RegisterPet } from "./pages/RegisterPet";
import { PetDetail } from "./pages/PetDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/app",
    Component: AppHome,
  },
  {
    path: "/app/register-pet",
    Component: RegisterPet,
  },
  {
    path: "/app/pet/:petId",
    Component: PetDetail,
  },
]);
