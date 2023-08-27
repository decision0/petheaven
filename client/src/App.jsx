import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddPet,
  Stats,
  AllPets,
  Profile,
  Admin,
  EditPet,
} from "./components";

import { action as registerAction } from "./components/Register";
import { action as loginAction } from "./components/Login";
import { loader as dashboardLoader } from "./components/DashboardLayout";
import { action as addPetAction } from "./components/AddPet";
import { loader as allPetsLoader } from "./components/AllPets";
import { loader as editPetLoader } from "./components/EditPet";
import { action as editPetAction } from "./components/EditPet";
import { action as deletePetAction } from "./components/DeletePet";
import { loader as adminLoader } from "./components/Admin";
import { action as profileAction } from "./components/Profile";
import { loader as statsLoader } from "./components/Stats";
import ErrorElement from "./components/ErrorElement";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: "dashboard",
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddPet />,
            action: addPetAction(queryClient),
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "all-pets",
            element: <AllPets />,
            loader: allPetsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-pet/:id",
            element: <EditPet />,
            loader: editPetLoader(queryClient),
            action: editPetAction(queryClient),
          },
          { path: "delete-pet/:id", action: deletePetAction(queryClient) },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
