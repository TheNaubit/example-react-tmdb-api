import { ChakraProvider } from "@chakra-ui/react"
import { AnimatedRoutes } from "@components/AnimatedRoutes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"

const QUERY_CLIENT = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={QUERY_CLIENT}>
            <ChakraProvider>
                <Router>
                    <AnimatedRoutes />
                </Router>
            </ChakraProvider>
        </QueryClientProvider>
    )
}