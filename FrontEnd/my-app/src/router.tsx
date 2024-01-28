import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {LoginPage} from "./pages/Login";
import Loading from "./pages/Loading";
import { SignupPage } from "./pages/Signup";
import {Tasks} from "./pages/Tasks";


export const routes = createBrowserRouter([

    {
        path: "",
        element: <Loading />,
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    },
    {
        path: "/tasks",
        element: <Tasks/>
    },
    {
        path: "*",
        element: <div>Error</div>
    }

])

export const AppRoute = () => {
    return <RouterProvider router={routes} />
}