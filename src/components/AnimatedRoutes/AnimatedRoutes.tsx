import { routes } from "@routes"
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

export function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                {
                    routes.map((route) => <Route key={`route-${route.path}`} index={route.path === "/"} path={route.path} element={route.element} />)
                }
            </Routes>
        </AnimatePresence>
    )
}