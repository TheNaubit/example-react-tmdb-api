import { IRoute } from "types"
import loadable from "@loadable/component"
import { Navigate } from "react-router-dom"

const HomePage = loadable(() => import("@pages/HomePage"), {
    resolveComponent: (components) => components.HomePage,
})

export const routes: Array<IRoute> = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    }
]
