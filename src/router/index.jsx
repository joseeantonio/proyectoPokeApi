import Home from "../pages/Home.jsx";
import LayoutPublic from "../layouts/LayoutPublic.jsx";
import {createBrowserRouter} from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPublic />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                index: true,
                element: <Home />,
            },
        ],
    },
])


